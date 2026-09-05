# lampa-docker

# Lampa + TorrServer в Docker

Полная установка с нуля. Оба сервиса живут в контейнерах, доступ по ЛАН, SWAG подключается опционально.

Адреса по умолчанию (замени `192.168.0.169` на IP своего сервера):

| Сервис | Адрес | Порт контейнера |
|---|---|---|
| Лампа (веб) | `http://192.168.0.169:8080` | 80 |
| TorrServer (веб + API) | `http://192.168.0.169:8090` | 8090 |
| Порт пиров TorrServer | `32000/tcp`, `32000/udp` | 32000 |

---

## 0. Три способа пользоваться Лампой

Выбираешь любой или все сразу — они не конфликтуют, но настройки у каждого свои.

| Способ | Что это | Настройки хранятся |
|---|---|---|
| **Веб в Docker** | контейнер из этого README, открывается в браузере | localStorage браузера |
| **Portable для ПК** | [релиз v1.4.1](https://github.com/yumata/lampa/releases/tag/v1.4.1) | внутри приложения |
| **APK для ТВ/Android** | [релизы LAMPA](https://github.com/lampa-app/LAMPA/releases) | внутри приложения |

В portable и APK адрес при старте оставляешь **дефолтный** — они тянут свою сборку сами. TorrServer им нужен один и тот же, тот, что ты поднимешь ниже.

Настройки не синхронизируются между способами. Плагины и адрес TorrServer придётся вбить на каждом устройстве отдельно.

---

## 1. Требования

- Debian/Ubuntu с Docker и Docker Compose v2
- Git
- ~500 МБ на диске под образы, плюс место под кэш торрентов, если включишь дисковый кэш

Проверка:

```bash
docker --version && docker compose version && git --version
```

---

## 2. Структура каталогов

```
/opt/media/
├── docker-compose.yml
├── lampa/                 # клон yumata/lampa, отсюда собирается образ
│   └── .dockerignore
└── ts/                    # создастся автоматически при первом старте
    ├── config/            # config.db — настройки и список торрентов
    ├── log/
    └── torrents/
```

Создаём:

```bash
sudo mkdir -p /opt/media
sudo chown -R $USER:$USER /opt/media
cd /opt/media
```

---

## 3. Исходники Лампы

```bash
cd /opt/media
git clone --depth 1 --branch v1.4.1 https://github.com/yumata/lampa.git lampa
```

Без `--branch v1.4.1` получишь свежий `main` — тоже рабочий вариант, но версия перестанет быть предсказуемой.

**Обязательно** добавь `.dockerignore`, иначе `.git` уедет в образ и будет доступен по HTTP:

```bash
cat > /opt/media/lampa/.dockerignore <<'EOF'
.git
.github
.gitignore
EOF
```

Dockerfile в репозитории простой: `httpd:alpine`, копирование статики в `htdocs` и подстановка `{domain}` в `msx/start.json`. Аргумент `domain` обязателен, без него сборка падает с ошибкой.

---

## 4. docker-compose.yml

```bash
cat > /opt/media/docker-compose.yml <<'EOF'
services:
  lampa:
    build:
      context: ./lampa
      args:
        domain: 192.168.0.169:8080
        prefix: "http://"
    image: lampa:v1.4.1
    container_name: lampa
    restart: unless-stopped
    ports:
      - "8080:80"

  torrserver:
    image: ghcr.io/yourok/torrserver:MatriX.143
    container_name: torrserver
    restart: unless-stopped
    environment:
      TS_PORT: 8090
      TS_CONF_PATH: /opt/ts/config
      TS_LOG_PATH: /opt/ts/log
      TS_TORR_DIR: /opt/ts/torrents
      TS_DONTKILL: 1
      TS_HTTPAUTH: 0
    volumes:
      - ./ts:/opt/ts
    ports:
      - "8090:8090"
      - "32000:32000/tcp"
      - "32000:32000/udp"
EOF
```

Что означают переменные TorrServer (энтрипоинт образа превращает их во флаги бинаря):

| Переменная | Флаг | Комментарий |
|---|---|---|
| `TS_PORT` | `--port` | веб-морда и API |
| `TS_CONF_PATH` | `--path` | тут лежит `config.db` |
| `TS_LOG_PATH` | `--logpath` | |
| `TS_TORR_DIR` | `--torrentsdir` | папка слежения за `.torrent` |
| `TS_DONTKILL` | `--dontkill` | не глушить сервер по сигналам |
| `TS_HTTPAUTH` | `--httpauth` | `0` — без авторизации, для ЛАН нормально |

`GODEBUG=madvdontneed=1` (в старом гайде экспортировался вручную) уже прошит в образ, дублировать не надо.

Тег `MatriX.143` собирается из GitHub-релиза. Если такого тега в registry не окажется — ставь `:latest`, он собирается из master.

---

## 5. Первый запуск

```bash
cd /opt/media
docker compose up -d --build
```

Сборка Лампы занимает секунды, TorrServer тянется готовым образом.

Проверка:

```bash
docker compose ps                      # оба контейнера в состоянии running
docker compose logs torrserver         # строка "Running with: --path /opt/ts/config ..."
curl -s http://localhost:8090/echo     # вернёт MatriX.143
curl -sI http://localhost:8080 | head -1   # HTTP/1.1 200 OK
ls ts/config/                          # появился config.db
```

Открой в браузере `http://192.168.0.169:8080` — должна открыться Лампа.

---

## 6. Файрвол

Если на сервере ufw:

```bash
sudo ufw allow from 192.168.0.0/24 to any port 8080 proto tcp
sudo ufw allow from 192.168.0.0/24 to any port 8090 proto tcp
sudo ufw allow 32000
```

Порты 8080 и 8090 открываем только для локальной подсети. Порт пиров 32000 — для всех, иначе смысла в нём нет.

---

## 7. Порт входящих подключений

В bridge-сети TorrServer по умолчанию слушает случайный порт, и проброшенный `32000` останется пустым. Нужно один раз задать порт вручную:

1. Открой `http://192.168.0.169:8090`
2. Настройки → раздел BitTorrent
3. Порт входящих подключений (`PeersListenPort`) → `32000`
4. Сохрани, контейнер перезапускать не нужно

Без этого шага раздачи качаются только исходящими коннектами: на популярных фильмах разницы не заметишь, на редких — заметишь сразу.

---

## 8. Настройка Лампы

Открываешь Лампу (веб, portable или APK — в каждой отдельно) → Настройки.

### 8.1. Парсер

Включить, ссылка:

```
jac.red
```

### 8.2. TorrServer

Включить, адрес:

```
http://192.168.0.169:8090
```

**Без слэша на конце.** Со слэшем не работает.

### 8.3. Расширения

Добавляешь по одной:

```
http://cub.rip/plugin/lgbt
```
обход РФ-цензуры

```
https://raw.githubusercontent.com/prettyleaf/lampa-docker/refs/heads/main/kinopoisk.js
```
рейтинг Кинопоиска и IMDb на карточке фильма, стилизация под КП

```
https://skaztv.online/store.js
```
непубличный список плагинов

Второй лучше сохранить себе: однажды отвалится и плагин перестанет грузиться. Раз у тебя теперь свой веб-сервер, положи файл рядом с Лампой:

```bash
mkdir -p /opt/media/lampa/plugins
# сюда кладёшь сохранённый .js
cd /opt/media && docker compose up -d --build lampa
```

и подключай как `http://192.168.0.169:8080/plugins/имя.js`. Gist для этого больше не нужен.

### 8.4. Пиратские плагины

После добавления `store.js` в настройках появится раздел **«Пиратские плагины»**.

- **Разное → «Интерфейс мод»** — ставим обязательно. Их там два, нужен тот, **у которого описание длиннее**.
- **«Кинопоиск»** — по желанию, даёт папку «буду смотреть» из профиля КП.

### 8.5. Внешний плеер

В настройках выбираешь внешний плеер — нужен такой, что умеет торрент-потоки и Dolby Vision / HDR.

На ТВ:
- Vimu Media Player
- MX Player с модом
- Night Player

---

## 9. Опционально: HTTPS через SWAG

Нужно, только если хочешь заходить снаружи или через NetBird. Для чисто ЛАН-сценария не требуется.

**Важно:** если Лампу отдавать по HTTPS, TorrServer тоже обязан быть по HTTPS. Иначе браузер зарежет запросы к нему как mixed content, и торренты просто не появятся. Переводи оба разом или ни один.

### 9.1. Подключить контейнеры к сети SWAG

Узнать имя сети:

```bash
docker inspect swag -f '{{range $k,$v := .NetworkSettings.Networks}}{{$k}} {{end}}'
```

Дописать в `docker-compose.yml` каждому сервису `networks: [swag]` и в конец файла:

```yaml
networks:
  swag:
    external: true
    name: ИМЯ_СЕТИ_SWAG
```

Проброс `8080:80` и `8090:8090` можно оставить — ЛАН-доступ по HTTP продолжит работать параллельно.

### 9.2. proxy-conf для Лампы

`/config/nginx/proxy-confs/lampa.subdomain.conf`:

```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name lampa.*;
    include /config/nginx/ssl.conf;
    client_max_body_size 0;

    location / {
        include /config/nginx/proxy.conf;
        include /config/nginx/resolver.conf;
        set $upstream_app lampa;
        set $upstream_port 80;
        set $upstream_proto http;
        proxy_pass $upstream_proto://$upstream_app:$upstream_port;
    }
}
```

### 9.3. proxy-conf для TorrServer

`/config/nginx/proxy-confs/ts.subdomain.conf`:

```nginx
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name ts.*;
    include /config/nginx/ssl.conf;
    client_max_body_size 0;

    allow 192.168.0.0/24;
    allow 100.64.0.0/10;      # NetBird — поправь под свою подсеть
    deny all;

    location / {
        include /config/nginx/proxy.conf;
        include /config/nginx/resolver.conf;
        set $upstream_app torrserver;
        set $upstream_port 8090;
        set $upstream_proto http;
        proxy_pass $upstream_proto://$upstream_app:$upstream_port;

        proxy_buffering off;
        proxy_request_buffering off;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
    }
}
```

`proxy_buffering off` обязателен: без него nginx буферизует поток и перемотка в плеере превращается в лотерею. `client_max_body_size 0` — чтобы заливались `.torrent` любого размера.

ACL не убирай. У TorrServer открытый API без авторизации: любой, кто найдёт хост, добавит торрент и будет качать через твой сервер и твой трафик.

### 9.4. Сертификаты и адреса

Оба поддомена должны попадать под сертификат. При wildcard через DNS-валидацию ничего делать не нужно; при списке в `SUBDOMAINS` добавь `lampa,ts` и перезапусти SWAG.

Если перешёл на HTTPS, в настройках Лампы поменяй адрес TorrServer на `https://ts.example.com` (без слэша) и пересобери контейнер Лампы с новым `domain`/`prefix`:

```yaml
        domain: lampa.example.com
        prefix: "https://"
```

---

## 10. Обслуживание

### Обновление TorrServer

```bash
cd /opt/media
# меняешь тег в docker-compose.yml, затем
docker compose pull torrserver
docker compose up -d torrserver
```

Откат — тем же способом на старый тег. `config.db` в томе, ничего не теряется.

### Обновление Лампы

```bash
cd /opt/media/lampa
git fetch --tags
git checkout v1.4.2          # нужный тег
cd /opt/media
docker compose up -d --build lampa
```

Лампа — PWA с service worker. После обновления в браузере может остаться старая версия: жми Ctrl+Shift+R или чисти кэш сайта.

### Бэкап

```bash
cp /opt/media/ts/config/config.db ~/config.db.$(date +%F).bak
```

В `config.db` лежат все настройки TorrServer и список торрентов. Настройки самой Лампы там не хранятся — они в localStorage браузера, бэкапу не поддаются.

### Логи

```bash
docker compose logs -f torrserver
docker compose logs -f lampa
tail -f /opt/media/ts/log/*
```

### Полный снос

```bash
cd /opt/media
docker compose down
sudo rm -rf /opt/media
```

---

## 11. Траблшутинг

| Симптом | Причина |
|---|---|
| Лампа открывается, TorrServer «не подключён» | слэш на конце адреса; проверь `curl http://192.168.0.169:8090/echo` |
| Лампа по HTTPS, торренты не грузятся | mixed content: TorrServer по HTTP. Оба должны быть по HTTPS |
| Раздача висит на 0 пиров | не задан `PeersListenPort` = 32000 (см. п. 7) или порт не проброшен |
| Настройки TorrServer слетают после перезапуска | пропал том `./ts:/opt/ts` |
| Перемотка в плеере тормозит через SWAG | нет `proxy_buffering off` |
| Настройки Лампы обнулились | сменился origin (IP → домен, другой порт). localStorage привязан к адресу |
| SWAG не видит контейнер | контейнеры не в одной сети с SWAG, или в `proxy_pass` указан не тот `upstream_app` |
| Сборка Лампы падает `ERROR: domain is not set` | не передан build-arg `domain` |

---

## Приложение: соответствие старому systemd-гайду

| Было | Стало |
|---|---|
| `wget` бинаря + `chmod o+x` | тег образа `ghcr.io/yourok/torrserver:MatriX.143` |
| `WorkingDirectory=/opt/torrserver` | том `./ts:/opt/ts` |
| `ExecStart ... --p 8090` | `TS_PORT: 8090` |
| `Restart=on-failure` / `RestartSec=58` | `restart: unless-stopped` |
| `export GODEBUG=madvdontneed=1` | зашито в образ |
| `systemctl daemon-reload && start && enable` | `docker compose up -d` |
| обновление = `wget` поверх + рестарт | смена тега + `docker compose up -d` |
| Лампа на хостинге или локальным веб-сервером | контейнер `httpd:alpine` на порту 8080 |

Опечатки исходного гайда, на всякий случай: `rm rf` без дефиса ничего не удаляет, а `chmod o+x` даёт бит только «остальным» — работало лишь потому, что юнит запускался от root.
