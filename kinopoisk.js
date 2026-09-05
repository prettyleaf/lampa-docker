(function bootMyKinopoisk(global) {
  if (global.my_kinopoisk_plugin) return;
  if (!global.Lampa || !(global.jQuery || global.$)) {
    setTimeout(function () {
      bootMyKinopoisk(global);
    }, 250);
    return;
  }

  global.my_kinopoisk_plugin = true;

  var Lampa = global.Lampa;
  var $ = global.jQuery || global.$;
  var HOME_QUERY = "query SelectionList($id: String!, $offset: Int!, $limit: Int!, $withUserData: Boolean!, $isAuthorized: Boolean!, $withContinueWatchingEmbedded: Boolean!, $withBrandShowcasesEntryPoints: Boolean!, $includeNotificationsSelection: Boolean = false, $includeLumenSelection: Boolean = false, $filter: ShowcaseFilterInput) {\n  showcase(id: $id, filter: $filter) {\n    id\n    ...ShowcaseMeta\n    content(offset: $offset, limit: $limit) {\n      ...ShowcasePagingListData\n      items {\n        ... on PromoSelection {\n          ...PromoSelection\n          __typename\n        }\n        ... on Selection {\n          ...AbstractSelection\n          __typename\n        }\n        ... on OttTopSelection {\n          ...AbstractSelection\n          __typename\n        }\n        ... on OttTopFilmsSelection {\n          ...AbstractSelection\n          __typename\n        }\n        ... on AnnounceSelection {\n          ...AbstractSelection\n          __typename\n        }\n        ... on ContinueWatchingEmbeddedSelection @include(if: $withContinueWatchingEmbedded) {\n          ...ContinueWatchingEmbeddedSelection\n          __typename\n        }\n        ... on MultiSelection {\n          ...MultiSelection\n          __typename\n        }\n        ... on EditorialFeatureSelection {\n          ...EditorialFeatureSelection\n          __typename\n        }\n        ... on ChannelProgramsSelection {\n          ...ChannelProgramsSelection\n          __typename\n        }\n        ... on OriginalsSelection {\n          ...OriginalsSelection\n          __typename\n        }\n        ... on SportCompetitionsSelection {\n          ...SportCompetitionsSelection\n          __typename\n        }\n        ... on SportSelection {\n          ...SportSelection\n          __typename\n        }\n        ... on CatchupsSelection {\n          ...CatchupsSelection\n          __typename\n        }\n        ... on GamesSelection {\n          ...GamesSelection\n          __typename\n        }\n        ... on WatchLaterSelection {\n          ...AbstractSelection\n          __typename\n        }\n        ... on PremiereVideosSelection {\n          ...PremiereVideosSelection\n          __typename\n        }\n        ... on SocialSelection {\n          ...SocialSelection\n          __typename\n        }\n        ... on StyledShowcasesSelection @include(if: $withBrandShowcasesEntryPoints) {\n          ...StyledShowcasesSelection\n          __typename\n        }\n        ... on NotificationsSelection @include(if: $includeNotificationsSelection) {\n          ...NotificationsSelection\n          __typename\n        }\n        ... on LumenSelection @include(if: $includeLumenSelection) {\n          ...LumenSelection\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  clientInfo {\n    time {\n      currentDate\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment ContentBrandUserData on ContentBrand {\n  userData {\n    isLiked\n    __typename\n  }\n  __typename\n}\n\nfragment Image on Image {\n  avatarsUrl\n  fallbackUrl\n  __typename\n}\n\nfragment ThemedColor on ThemedColor {\n  light\n  dark\n  __typename\n}\n\nfragment ContentBrandColors on ContentBrandColors {\n  top10 {\n    ...ThemedColor\n    __typename\n  }\n  top10Gradient {\n    start {\n      ...ThemedColor\n      __typename\n    }\n    end {\n      ...ThemedColor\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ShowcaseContentBrand on ContentBrand {\n  id\n  ... @include(if: $withUserData) {\n    ...ContentBrandUserData\n    __typename\n  }\n  gallery {\n    logos {\n      centeredMain {\n        ...Image\n        __typename\n      }\n      square {\n        ...Image\n        __typename\n      }\n      dynamic {\n        ...Image\n        __typename\n      }\n      gradient {\n        ...Image\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  colors {\n    ...ContentBrandColors\n    __typename\n  }\n  __typename\n}\n\nfragment AbstractSelectionData on AbstractSelection {\n  id\n  showTitle\n  title\n  comment\n  __typename\n}\n\nfragment SelectionPagingListData on SessionPagingList_SelectionItem {\n  offset\n  limit\n  hasMore\n  sessionId\n  __typename\n}\n\nfragment LicenseCover on LicenseCover {\n  formFactor\n  image {\n    avatarsUrl\n    __typename\n  }\n  theme\n  __typename\n}\n\nfragment Title on Title {\n  localized\n  original\n  __typename\n}\n\nfragment AbstractSelectionMovieData on Movie {\n  id\n  contentId\n  title {\n    ...Title\n    __typename\n  }\n  __typename\n}\n\nfragment PromoTrailer on Movie {\n  ott {\n    promoTrailer: trailers(limit: 1, onlyPromo: true) {\n      items {\n        publicId\n        contentGroupUuid\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MainTrailer on Movie {\n  contentId\n  ott {\n    mainTrailers: trailers(limit: 2) {\n      items {\n        publicId\n        contentGroupUuid\n        main\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PromoSelectionMovie on Movie {\n  ...AbstractSelectionMovieData\n  ...PromoTrailer\n  ...MainTrailer\n  shortDescription\n  gallery {\n    covers {\n      horizontal {\n        avatarsUrl\n        fallbackUrl\n        __typename\n      }\n      __typename\n    }\n    logos {\n      horizontal {\n        avatarsUrl\n        fallbackUrl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  restriction {\n    age\n    __typename\n  }\n  __typename\n}\n\nfragment SkippableFragment on SkippableFragment {\n  type\n  startTime\n  endTime\n  final\n  __typename\n}\n\nfragment PromoSelectionMovieWithSkippableFragments on Movie {\n  ...PromoSelectionMovie\n  ott {\n    ... on Ott_AbstractVideo {\n      skippableFragments {\n        ...SkippableFragment\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment EpisodeBase on Episode {\n  id\n  episodeContentId: contentId\n  number\n  __typename\n}\n\nfragment MoneyAmount on MoneyAmount {\n  amount\n  currency {\n    currencyCode\n    symbol\n    __typename\n  }\n  __typename\n}\n\nfragment ViewOption on ViewOption {\n  type\n  watchabilityStatus\n  purchasabilityStatus\n  downloadabilityStatus\n  buttonText\n  descriptionText\n  texts {\n    disclaimer\n    __typename\n  }\n  originalButtonText\n  optionMonetizationModels\n  promotionActionType\n  mainPromotionAbsoluteAmount {\n    ...MoneyAmount\n    __typename\n  }\n  mastercardPromotionAbsoluteAmount {\n    ...MoneyAmount\n    __typename\n  }\n  transactionalPrice {\n    ...MoneyAmount\n    __typename\n  }\n  transactionalMinimumPrice {\n    ...MoneyAmount\n    __typename\n  }\n  priceWithTotalDiscount {\n    ...MoneyAmount\n    __typename\n  }\n  availabilityAnnounce {\n    availabilityDate\n    type\n    groupPeriodType\n    announcePromise\n    __typename\n  }\n  promotionIcons {\n    avatarsUrl\n    origSize {\n      width\n      height\n      __typename\n    }\n    __typename\n  }\n  purchaseOptionCustomProperties\n  contentPackageToBuy {\n    billingFeatureName\n    __typename\n  }\n  subscriptionBadge {\n    image {\n      avatarsUrl\n      __typename\n    }\n    __typename\n  }\n  watchPeriod {\n    timeToExpire\n    watchPeriodStatus\n    __typename\n  }\n  __typename\n}\n\nfragment SeasonBase on Season {\n  id\n  contentId\n  number\n  __typename\n}\n\nfragment OttEpisodeTiming on Episode {\n  ott {\n    timing {\n      current\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment NextEpisode on Episode {\n  ...EpisodeBase\n  title {\n    ...Title\n    __typename\n  }\n  cover {\n    avatarsUrl\n    fallbackUrl\n    __typename\n  }\n  viewOption {\n    ...ViewOption\n    __typename\n  }\n  ott {\n    duration\n    viewOption {\n      availabilityEndDate\n      availabilityStatus\n      __typename\n    }\n    __typename\n  }\n  season {\n    ...SeasonBase\n    __typename\n  }\n  ...OttEpisodeTiming\n  __typename\n}\n\nfragment OttNextEpisode on Movie {\n  id\n  contentId\n  ott {\n    ... on Ott_AbstractSeries {\n      nextEpisode(fallbackToFirstEpisode: true) {\n        contentId\n        fallback\n        episode {\n          offsetInSeason(filter: {source: ONLINE_WITH_ANNOUNCEMENTS})\n          ...NextEpisode\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment VideoMovieSelectionItem on VideoMovieSelectionItem {\n  coverLogoRecommendedTheme\n  videoCoverLogos: coverLogos {\n    ...LicenseCover\n    __typename\n  }\n  movie {\n    ...PromoSelectionMovieWithSkippableFragments\n    ...OttNextEpisode @include(if: $withUserData)\n    __typename\n  }\n  __typename\n}\n\nfragment PromoSelectionItem on PromoSelectionItem {\n  coverLogoRecommendedTheme\n  coverLogos {\n    ...LicenseCover\n    __typename\n  }\n  movie {\n    ...PromoSelectionMovieWithSkippableFragments\n    ...OttNextEpisode @include(if: $withUserData)\n    __typename\n  }\n  __typename\n}\n\nfragment PromoAnnounceSelectionItem on PromoAnnounceSelectionItem {\n  coverLogoRecommendedTheme\n  coverLogos {\n    ...LicenseCover\n    __typename\n  }\n  movie {\n    ...PromoSelectionMovieWithSkippableFragments\n    __typename\n  }\n  __typename\n}\n\nfragment SportImage on Image {\n  avatarsUrl\n  fallbackUrl\n  __typename\n}\n\nfragment SportType on SportType {\n  id\n  name\n  __typename\n}\n\nfragment SportTeamCompact on SportTeam {\n  id\n  logo {\n    ...SportImage\n    __typename\n  }\n  name\n  fullName\n  sportType {\n    ...SportType\n    __typename\n  }\n  __typename\n}\n\nfragment AbstractSportEventBase on AbstractSportEvent {\n  comment\n  description\n  endTime\n  expirationTime\n  id\n  shortDescription\n  sportEventId\n  startTime\n  title\n  deepDiveAvailable\n  ... on SportTeamsEvent {\n    firstTeam {\n      ...SportTeamCompact\n      __typename\n    }\n    secondTeam {\n      ...SportTeamCompact\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SportCompetitionCompact on Competition {\n  id\n  name\n  shortName\n  sportType {\n    ...SportType\n    __typename\n  }\n  gallery {\n    backgrounds {\n      accentRight {\n        ...SportImage\n        __typename\n      }\n      accentRightSquare {\n        ...SportImage\n        __typename\n      }\n      __typename\n    }\n    covers {\n      clean {\n        ...SportImage\n        __typename\n      }\n      main {\n        ...SportImage\n        __typename\n      }\n      __typename\n    }\n    logos {\n      main {\n        ...SportImage\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SportViewOption on ViewOption {\n  purchasabilityStatus\n  watchabilityStatus\n  contentPackageToBuy {\n    billingFeatureName\n    __typename\n  }\n  contentPackageToUnfreeze {\n    billingFeatureName\n    __typename\n  }\n  subscriptionBadge {\n    image {\n      avatarsUrl\n      __typename\n    }\n    __typename\n  }\n  purchaseOptionCustomProperties\n  __typename\n}\n\nfragment SportViewOptionTrialCutInfo on ViewOption {\n  trialCutInfo {\n    texts {\n      title\n      subTitle\n      buttonText\n      __typename\n    }\n    token\n    type\n    __typename\n  }\n  __typename\n}\n\nfragment AbstractSportEventLiveMeta on AbstractSportEventLiveMeta {\n  stage\n  __typename\n}\n\nfragment SportTeamScore on SportTeamScore {\n  result\n  team {\n    ...SportTeamCompact\n    __typename\n  }\n  __typename\n}\n\nfragment SportTeamsEventLiveMeta on SportTeamsEventLiveMeta {\n  ...AbstractSportEventLiveMeta\n  firstTeamScore {\n    ...SportTeamScore\n    __typename\n  }\n  secondTeamScore {\n    ...SportTeamScore\n    __typename\n  }\n  __typename\n}\n\nfragment SportTeamsEventVotes on SportTeamsEventVotes {\n  firstTeamVotes\n  secondTeamVotes\n  drawVotes\n  userVote\n  __typename\n}\n\nfragment AbstractSportEventCompact on AbstractSportEvent {\n  ...AbstractSportEventBase\n  competition {\n    ...SportCompetitionCompact\n    __typename\n  }\n  gallery {\n    covers {\n      accentRight {\n        ...SportImage\n        __typename\n      }\n      accentRightSquare {\n        ...SportImage\n        __typename\n      }\n      __typename\n    }\n    posters {\n      accentRightHorizontal {\n        ...SportImage\n        __typename\n      }\n      accentRightWithLogo {\n        ...SportImage\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  viewOption {\n    ...SportViewOption\n    ...SportViewOptionTrialCutInfo\n    __typename\n  }\n  liveMeta {\n    ... on SportEventLiveMeta {\n      ...AbstractSportEventLiveMeta\n      __typename\n    }\n    ... on SportTeamsEventLiveMeta {\n      ...SportTeamsEventLiveMeta\n      __typename\n    }\n    __typename\n  }\n  ... on SportTeamsEvent {\n    votes {\n      ...SportTeamsEventVotes\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SportEvent on AbstractSportEvent {\n  ...AbstractSportEventCompact\n  __typename\n}\n\nfragment SportEventSelectionItem on SportEventSelectionItem {\n  sportEvent {\n    ...SportEvent\n    __typename\n  }\n  __typename\n}\n\nfragment UserProfileInterfaceItem on UserProfileInterface {\n  id {\n    kpId\n    ottId\n    puid\n    __typename\n  }\n  subscriptionInfo {\n    hasSubscription\n    __typename\n  }\n  social {\n    publicStatus\n    url\n    avatar {\n      defaultValue {\n        value {\n          avatarsUrl\n          fallbackUrl\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    name {\n      defaultValue {\n        source\n        value\n        __typename\n      }\n      __typename\n    }\n    alias {\n      defaultValue {\n        source\n        value\n        __typename\n      }\n      __typename\n    }\n    badges {\n      verified {\n        id\n        title\n        description\n        icons {\n          image {\n            avatarsUrl\n            __typename\n          }\n          format\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment UserProfileInterface on PagingList_UserProfileInterface {\n  offset\n  total\n  limit\n  items {\n    ...UserProfileInterfaceItem\n    __typename\n  }\n  __typename\n}\n\nfragment SportEventWithViewers on AbstractSportEvent {\n  id\n  watchingSportSocialArgument {\n    usersTotalCount\n    socialSubscriptionsWatching(limit: $limit, offset: $offset) @include(if: $isAuthorized) {\n      ...UserProfileInterface\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SportPromoBlockEvent on AbstractSportEvent {\n  ...SportEvent\n  ...SportEventWithViewers\n  __typename\n}\n\nfragment PromoSportEventSelectionItem on SportEventSelectionItem {\n  ...SportEventSelectionItem\n  sportEvent {\n    ...SportPromoBlockEvent\n    __typename\n  }\n  __typename\n}\n\nfragment PromoTvChannelProgramSelectionItem on PromoTvChannelProgramSelectionItem {\n  currentTime\n  promoTvChannel {\n    ageRestriction\n    contentId\n    logo {\n      avatarsUrl\n      __typename\n    }\n    title\n    finishTime\n    __typename\n  }\n  promoTvPrograms {\n    ageRestriction\n    endTime\n    startTime\n    id\n    image {\n      avatarsUrl\n      __typename\n    }\n    title\n    typeName\n    episodeTitle\n    coverLogoRecommendedTheme\n    coverLogos {\n      ...LicenseCover\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MovieRatingListItem on MovieInList {\n  movieListSlug\n  position\n  __typename\n}\n\nfragment MovieRatingLists on Movie {\n  ratingLists {\n    top10 {\n      ...MovieRatingListItem\n      __typename\n    }\n    top250 {\n      ...MovieRatingListItem\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment RatingValue on RatingValue {\n  value\n  isActive\n  count\n  __typename\n}\n\nfragment CatchupReferenceContent on Movie {\n  contentId\n  ...MovieRatingLists\n  rating {\n    kinopoisk {\n      ...RatingValue\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SelectionItemViewOption on ViewOption {\n  buttonText\n  originalButtonText\n  type\n  purchasabilityStatus\n  watchabilityStatus\n  promotionActionType\n  contentPackageToBuy {\n    billingFeatureName\n    __typename\n  }\n  subscriptionBadge {\n    image {\n      avatarsUrl\n      __typename\n    }\n    __typename\n  }\n  availabilityAnnounce {\n    type\n    announcePromise\n    availabilityDate\n    __typename\n  }\n  __typename\n}\n\nfragment Catchup on Catchup {\n  contentId\n  catchupTitle: title\n  duration\n  gallery {\n    covers {\n      horizontal {\n        avatarsUrl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  tvChannel {\n    contentId\n    logo {\n      avatarsUrl\n      __typename\n    }\n    title\n    __typename\n  }\n  referenceContent {\n    ...CatchupReferenceContent\n    __typename\n  }\n  viewOption {\n    ...SelectionItemViewOption\n    watchabilityExpirationTime\n    __typename\n  }\n  __typename\n}\n\nfragment CatchupSelectionItem on CatchupSelectionItem {\n  catchup {\n    ...Catchup\n    __typename\n  }\n  __typename\n}\n\nfragment ReleaseAnnounceIncompleteDate on ReleaseAnnounce {\n  releaseDate {\n    accuracy\n    date\n    __typename\n  }\n  __typename\n}\n\nfragment TicketOptionReleaseAnnounceValues on TicketOption {\n  releaseAnnounce {\n    available\n    ...ReleaseAnnounceIncompleteDate\n    __typename\n  }\n  __typename\n}\n\nfragment TicketOptionReleaseAnnounce on Movie {\n  ticketOption {\n    ...TicketOptionReleaseAnnounceValues\n    __typename\n  }\n  __typename\n}\n\nfragment CinemaAnnounceSelectionItem on CinemaAnnounceSelectionItem {\n  movie {\n    ...PromoSelectionMovie\n    ...TicketOptionReleaseAnnounce\n    __typename\n  }\n  __typename\n}\n\nfragment CinemaMovieSelectionItem on CinemaMovieSelectionItem {\n  movie {\n    ...PromoSelectionMovie\n    ott {\n      promoTrailer: trailers(limit: 1, onlyPromo: true) {\n        items {\n          contentGroupUuid\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    ...TicketOptionReleaseAnnounce\n    __typename\n  }\n  __typename\n}\n\nfragment SportHighlightCompact on SportHighlight {\n  id\n  comment\n  duration\n  gallery {\n    posters {\n      horizontal {\n        ...SportImage\n        __typename\n      }\n      vertical {\n        ...SportImage\n        __typename\n      }\n      squareWithoutLogo {\n        ...SportImage\n        __typename\n      }\n      horizontalWithoutLogo {\n        ...SportImage\n        __typename\n      }\n      __typename\n    }\n    logos {\n      horizontal {\n        ...SportImage\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  title\n  description\n  viewOption {\n    ...SportViewOption\n    __typename\n  }\n  __typename\n}\n\nfragment SportHighlightSelectionItem on SportHighlightSelectionItem {\n  highlight {\n    ...SportHighlightCompact\n    __typename\n  }\n  __typename\n}\n\nfragment MovieHorizontalPoster on MoviePosters {\n  horizontalWithRightholderLogo {\n    ...Image\n    __typename\n  }\n  horizontal {\n    ...Image\n    __typename\n  }\n  __typename\n}\n\nfragment MovieVerticalPoster on MoviePosters {\n  vertical(override: OTT_WHEN_EXISTS) {\n    ...Image\n    __typename\n  }\n  verticalWithRightholderLogo {\n    ...Image\n    __typename\n  }\n  __typename\n}\n\nfragment SelectionMovieViewOptionProps on ViewOption {\n  buttonText\n  originalButtonText\n  type\n  purchasabilityStatus\n  watchabilityStatus\n  promotionActionType\n  contentPackageToBuy {\n    billingFeatureName\n    __typename\n  }\n  subscriptionBadge {\n    image {\n      avatarsUrl\n      __typename\n    }\n    __typename\n  }\n  availabilityAnnounce {\n    type\n    announcePromise\n    availabilityDate\n    __typename\n  }\n  __typename\n}\n\nfragment SelectionMovieViewOption on Movie {\n  viewOption {\n    ...SelectionMovieViewOptionProps\n    __typename\n  }\n  __typename\n}\n\nfragment SelectionMovie on Movie {\n  ...AbstractSelectionMovieData\n  gallery {\n    covers {\n      horizontal {\n        avatarsUrl\n        __typename\n      }\n      __typename\n    }\n    posters {\n      ...MovieHorizontalPoster\n      ...MovieVerticalPoster\n      __typename\n    }\n    logos {\n      horizontal {\n        avatarsUrl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  genres {\n    id\n    name\n    __typename\n  }\n  rating {\n    kinopoisk {\n      ...RatingValue\n      __typename\n    }\n    __typename\n  }\n  restriction {\n    age\n    __typename\n  }\n  ...SelectionMovieViewOption\n  ...MovieRatingLists\n  userData @include(if: $withUserData) {\n    isPlannedToWatch\n    __typename\n  }\n  ... on Film {\n    productionYear(override: OTT_WHEN_EXISTS)\n    __typename\n  }\n  ... on TvSeries {\n    releaseYears {\n      start\n      end\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment Promo on Movie {\n  contentId\n  ...PromoTrailer\n  __typename\n}\n\nfragment AbstractMovieSelectionItem on AbstractMovieSelectionItem {\n  movie {\n    ...SelectionMovie\n    ...MainTrailer\n    ...Promo\n    __typename\n  }\n  __typename\n}\n\nfragment AbstractAnnounceMovieSelectionItem on AbstractMovieSelectionItem {\n  movie {\n    ...SelectionMovie\n    ...MainTrailer\n    ...Promo\n    gallery {\n      posters {\n        horizontalIntroWithRightholderLogo {\n          avatarsUrl\n          fallbackUrl\n          __typename\n        }\n        horizontalIntro {\n          avatarsUrl\n          fallbackUrl\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SeasonAnnounceSelectionItem on SeasonAnnounceSelectionItem {\n  ...AbstractAnnounceMovieSelectionItem\n  season {\n    viewOption {\n      buttonText\n      originalButtonText\n      type\n      purchasabilityStatus\n      watchabilityStatus\n      promotionActionType\n      contentPackageToBuy {\n        billingFeatureName\n        __typename\n      }\n      availabilityAnnounce {\n        type\n        announcePromise\n        availabilityDate\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ContinueWatchingMovieOtt on Ott_AbstractVideo {\n  skippableFragments {\n    ...SkippableFragment\n    __typename\n  }\n  preview {\n    ... on OttPreview_AbstractVideo {\n      duration\n      timing {\n        current\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ImageSize on ImageSize {\n  width\n  height\n  __typename\n}\n\nfragment MovieHorizontalLogo on MovieLogos {\n  horizontal {\n    avatarsUrl\n    origSize {\n      ...ImageSize\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment WatchPeriod on WatchPeriod {\n  timeToExpire\n  watchPeriodStatus\n  __typename\n}\n\nfragment ContinueWatchingViewOption on ViewOption {\n  type\n  optionMonetizationModels\n  purchasabilityStatus\n  promotionActionType\n  buttonText\n  originalButtonText\n  watchPeriod {\n    ...WatchPeriod\n    __typename\n  }\n  contentPackageToBuy {\n    billingFeatureName\n    __typename\n  }\n  subscriptionBadge {\n    image {\n      avatarsUrl\n      __typename\n    }\n    __typename\n  }\n  transactionalPrice {\n    ...MoneyAmount\n    __typename\n  }\n  priceWithTotalDiscount {\n    ...MoneyAmount\n    __typename\n  }\n  transactionalMinimumPrice {\n    ...MoneyAmount\n    __typename\n  }\n  __typename\n}\n\nfragment ContinueWatchingMovie on Movie {\n  kpId: id\n  contentId\n  shortDescription\n  countries {\n    name\n    id\n    __typename\n  }\n  genres {\n    id\n    name\n    __typename\n  }\n  restriction {\n    age\n    __typename\n  }\n  titleObject: title {\n    ...Title\n    __typename\n  }\n  gallery {\n    covers {\n      horizontal {\n        avatarsUrl\n        __typename\n      }\n      __typename\n    }\n    logos {\n      ...MovieHorizontalLogo\n      __typename\n    }\n    posters {\n      ...MovieVerticalPoster\n      __typename\n    }\n    __typename\n  }\n  viewOption {\n    ...ContinueWatchingViewOption\n    __typename\n  }\n  __typename\n}\n\nfragment ContinueWatchingSelectionFilmEntity on Film {\n  ott {\n    ...ContinueWatchingMovieOtt\n    __typename\n  }\n  ...ContinueWatchingMovie\n  productionYear(override: OTT_WHEN_EXISTS)\n  __typename\n}\n\nfragment ContinueWatchingSelectionVideoEntity on Video {\n  ott {\n    ...ContinueWatchingMovieOtt\n    __typename\n  }\n  ...ContinueWatchingMovie\n  productionYear(override: OTT_WHEN_EXISTS)\n  __typename\n}\n\nfragment ContinueWatchingEpisodeOtt on OttEpisode {\n  duration\n  timing {\n    current\n    __typename\n  }\n  viewOption {\n    availabilityEndDate\n    availabilityStatus\n    __typename\n  }\n  skippableFragments {\n    ...SkippableFragment\n    __typename\n  }\n  __typename\n}\n\nfragment EpisodeMonetizationViewOption on ViewOption {\n  watchabilityStatus\n  purchasabilityStatus\n  optionMonetizationModels\n  availabilityAnnounce {\n    availabilityDate\n    type\n    groupPeriodType\n    announcePromise\n    __typename\n  }\n  transactionalPrice {\n    ...MoneyAmount\n    __typename\n  }\n  transactionalMinimumPrice {\n    ...MoneyAmount\n    __typename\n  }\n  priceWithTotalDiscount {\n    ...MoneyAmount\n    __typename\n  }\n  __typename\n}\n\nfragment ContinueWatchingEpisode on Episode {\n  contentId\n  number\n  season {\n    contentId\n    number\n    __typename\n  }\n  titleObject: title {\n    ...Title\n    __typename\n  }\n  cover {\n    avatarsUrl\n    __typename\n  }\n  viewOption {\n    ...EpisodeMonetizationViewOption\n    __typename\n  }\n  __typename\n}\n\nfragment ContinueWatchingSelectionEpisodeEntity on Episode {\n  tvSeries {\n    ...ContinueWatchingMovie\n    productionYear\n    __typename\n  }\n  ottEpisode: ott {\n    ...ContinueWatchingEpisodeOtt\n    __typename\n  }\n  ...ContinueWatchingEpisode\n  __typename\n}\n\nfragment ContinueWatchingSelectionItem on ContinueWatchingSelectionItem {\n  entity {\n    ... on Film {\n      ...ContinueWatchingSelectionFilmEntity\n      __typename\n    }\n    ... on Video {\n      ...ContinueWatchingSelectionVideoEntity\n      __typename\n    }\n    ... on Episode {\n      ...ContinueWatchingSelectionEpisodeEntity\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment TvChannel on TvChannel {\n  ageRestriction\n  contentId\n  logo {\n    avatarsUrl\n    __typename\n  }\n  title\n  __typename\n}\n\nfragment ChannelMainLogo on TvChannel {\n  gallery {\n    logos {\n      main {\n        avatarsUrl\n        fallbackUrl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ChannelCovers on TvChannel {\n  gallery {\n    covers {\n      horizontal {\n        avatarsUrl\n        __typename\n      }\n      preview {\n        avatarsUrl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ViewOptionTrialCutInfo on ViewOption {\n  trialCutInfo {\n    texts {\n      title\n      subTitle\n      buttonText\n      __typename\n    }\n    token\n    type\n    __typename\n  }\n  __typename\n}\n\nfragment TvChannelProgramSelectionItem on TvChannelProgramSelectionItem {\n  currentTime\n  tvChannel {\n    ...TvChannel\n    ...ChannelMainLogo\n    ...ChannelCovers\n    viewOption {\n      ...SelectionItemViewOption\n      ...ViewOptionTrialCutInfo\n      __typename\n    }\n    __typename\n  }\n  tvPrograms {\n    ageRestriction\n    endTime\n    startTime\n    id\n    image {\n      avatarsUrl\n      __typename\n    }\n    title\n    typeName\n    episodeTitle\n    __typename\n  }\n  __typename\n}\n\nfragment MultiSelectionItemEntity on AbstractSelection {\n  selectionId: id\n  title\n  __typename\n}\n\nfragment MultiShowcaseItemEntity on AbstractShowcase {\n  showcaseId: id\n  title\n  __typename\n}\n\nfragment MultiSelectionItem on LinkSelectionItem {\n  cover {\n    avatarsUrl\n    __typename\n  }\n  entity {\n    ...MultiSelectionItemEntity\n    ...MultiShowcaseItemEntity\n    __typename\n  }\n  __typename\n}\n\nfragment EditorialFeatureSelectionItem on EditorialFeatureSelectionItem {\n  itemType\n  entityId\n  entityType\n  entityName\n  description\n  image {\n    avatarsUrl\n    __typename\n  }\n  imageSizeType\n  __typename\n}\n\nfragment OriginalAnnounceMovieSelectionItem on OriginalAnnounceMovieSelectionItem {\n  ...AbstractAnnounceMovieSelectionItem\n  backgroundCover {\n    avatarsUrl\n    __typename\n  }\n  finishCover {\n    avatarsUrl\n    __typename\n  }\n  startCover {\n    avatarsUrl\n    __typename\n  }\n  __typename\n}\n\nfragment OriginalMovieSelectionItem on OriginalMovieSelectionItem {\n  ...AbstractMovieSelectionItem\n  backgroundCover {\n    avatarsUrl\n    __typename\n  }\n  finishCover {\n    avatarsUrl\n    __typename\n  }\n  startCover {\n    avatarsUrl\n    __typename\n  }\n  __typename\n}\n\nfragment SportCompetitionSelectionItem on SportCompetitionSelectionItem {\n  competition {\n    ...SportCompetitionCompact\n    __typename\n  }\n  __typename\n}\n\nfragment Game on Game {\n  id\n  contentId\n  shortDescription\n  title {\n    ...Title\n    __typename\n  }\n  difficulty\n  duration\n  playersCount\n  ageRestriction\n  gallery {\n    covers {\n      horizontal {\n        ...Image\n        __typename\n      }\n      __typename\n    }\n    backgrounds {\n      forIcon {\n        ...Image\n        __typename\n      }\n      __typename\n    }\n    logos {\n      icon {\n        ...Image\n        __typename\n      }\n      logo {\n        ...Image\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GameSelectionItem on GameSelectionItem {\n  game {\n    ...Game\n    __typename\n  }\n  __typename\n}\n\nfragment PremiereVideoSelectionItem on PremiereVideoSelectionItem {\n  movie {\n    ...SelectionMovie\n    gallery {\n      covers {\n        horizontal {\n          avatarsUrl\n          __typename\n        }\n        vertical {\n          avatarsUrl\n          __typename\n        }\n        __typename\n      }\n      logos {\n        horizontal {\n          avatarsUrl\n          __typename\n        }\n        rightholderForCover {\n          ...LicenseCover\n          __typename\n        }\n        rightholderForCoverRecommendedTheme\n        __typename\n      }\n      __typename\n    }\n    ...TicketOptionReleaseAnnounce\n    __typename\n  }\n  clipContentId: videoContentId\n  __typename\n}\n\nfragment SocialUserProfileId on UserProfileInterface {\n  id {\n    kpId\n    ottId\n    puid\n    __typename\n  }\n  __typename\n}\n\nfragment SocialUserBadges on UserSocialInfo {\n  badges {\n    verified {\n      id\n      title\n      description\n      icons {\n        image {\n          avatarsUrl\n          __typename\n        }\n        format\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SocialUserForSelection on UserProfileInterface {\n  ...SocialUserProfileId\n  social {\n    url\n    avatar {\n      defaultValue {\n        value {\n          avatarsUrl\n          fallbackUrl\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    name {\n      defaultValue {\n        source\n        value\n        __typename\n      }\n      __typename\n    }\n    alias {\n      defaultValue {\n        source\n        value\n        __typename\n      }\n      __typename\n    }\n    isSubscribedTo @include(if: $withUserData)\n    ...SocialUserBadges\n    __typename\n  }\n  __typename\n}\n\nfragment PlannedToWatchSocialUserArgument on PlannedToWatchSocialUserArgument {\n  user {\n    ...SocialUserForSelection\n    __typename\n  }\n  __typename\n}\n\nfragment WatchedSocialUserArgument on WatchedSocialUserArgument {\n  user {\n    ...SocialUserForSelection\n    __typename\n  }\n  __typename\n}\n\nfragment VotedSocialUserArgument on VotedSocialUserArgument {\n  user {\n    ...SocialUserForSelection\n    __typename\n  }\n  value\n  __typename\n}\n\nfragment WatchingSocialUserArgument on WatchingSocialUserArgument {\n  user {\n    ...SocialUserForSelection\n    __typename\n  }\n  __typename\n}\n\nfragment SocialArgument on SocialArgument {\n  ... on PlannedToWatchSocialUserArgument {\n    ...PlannedToWatchSocialUserArgument\n    __typename\n  }\n  ... on WatchedSocialUserArgument {\n    ...WatchedSocialUserArgument\n    __typename\n  }\n  ... on VotedSocialUserArgument {\n    ...VotedSocialUserArgument\n    __typename\n  }\n  ... on WatchingSocialUserArgument {\n    ...WatchingSocialUserArgument\n    __typename\n  }\n  __typename\n}\n\nfragment SocialSelectionItem on SocialSelectionItem {\n  movie {\n    ...SelectionMovie\n    __typename\n  }\n  argument {\n    ...SocialArgument\n    __typename\n  }\n  __typename\n}\n\nfragment StyledShowcaseLogos on StyledShowcaseLogos {\n  main {\n    ...Image\n    __typename\n  }\n  square {\n    ...Image\n    __typename\n  }\n  dynamic {\n    ...Image\n    __typename\n  }\n  gradient {\n    ...Image\n    __typename\n  }\n  __typename\n}\n\nfragment StyledShowcaseGallery on StyledShowcaseGallery {\n  logos {\n    ... on StyledShowcaseLogos {\n      ...StyledShowcaseLogos\n      __typename\n    }\n    __typename\n  }\n  backgrounds {\n    ... on StyledShowcaseBackgrounds {\n      main {\n        ...Image\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment StyledSelectionItem on StyledShowcaseReference {\n  id\n  title\n  gallery {\n    ... on StyledShowcaseGallery {\n      ...StyledShowcaseGallery\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment StyledShowcasesSelectionItem on StyledShowcaseSelectionItem {\n  showcaseReference {\n    ...StyledSelectionItem\n    __typename\n  }\n  __typename\n}\n\nfragment NotificationSelectionItem on NotificationSelectionItem {\n  __typename\n  notification {\n    notificationPayloadId\n    payload\n    templateId\n    feedbackToken\n    __typename\n  }\n}\n\nfragment MovieRating on Movie {\n  rating {\n    kinopoisk {\n      ...RatingValue\n      __typename\n    }\n    plannedToWatch {\n      ...RatingValue\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment LumenMovieData on Movie {\n  __typename\n  id\n  contentId\n  shortDescription\n  title {\n    ...Title\n    __typename\n  }\n  gallery {\n    logos {\n      horizontal {\n        ...Image\n        __typename\n      }\n      rightholderForCover(filter: {formFactor: M}) {\n        ...LicenseCover\n        __typename\n      }\n      rightholderForCoverRecommendedTheme\n      __typename\n    }\n    covers {\n      horizontal {\n        ...Image\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  viewOption {\n    ...SelectionMovieViewOptionProps\n    __typename\n  }\n  ...OttNextEpisode @include(if: $withUserData)\n  ...MovieRating\n  userData @include(if: $withUserData) {\n    isPlannedToWatch\n    __typename\n  }\n}\n\nfragment ShowcaseMeta on AbstractShowcase {\n  title\n  ... on Showcase {\n    gallery {\n      logo {\n        avatarsUrl\n        __typename\n      }\n      background {\n        avatarsUrl\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  ... on StyledShowcase {\n    owner {\n      ... on ContentBrand {\n        ...ShowcaseContentBrand\n        __typename\n      }\n      __typename\n    }\n    gallery {\n      logos {\n        dynamic {\n          ...Image\n          __typename\n        }\n        __typename\n      }\n      backgrounds {\n        main {\n          ...Image\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ShowcasePagingListData on SessionPagingList_ShowcaseItem {\n  offset\n  limit\n  hasMore\n  sessionId\n  __typename\n}\n\nfragment PromoSelection on PromoSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ... on VideoMovieSelectionItem {\n        ...VideoMovieSelectionItem\n        __typename\n      }\n      ... on PromoSelectionItem {\n        ...PromoSelectionItem\n        __typename\n      }\n      ... on PromoAnnounceSelectionItem {\n        ...PromoAnnounceSelectionItem\n        __typename\n      }\n      ... on SportEventSelectionItem {\n        ...PromoSportEventSelectionItem\n        __typename\n      }\n      ... on PromoTvChannelProgramSelectionItem {\n        ...PromoTvChannelProgramSelectionItem\n        __typename\n      }\n      ... on CatchupSelectionItem {\n        ...CatchupSelectionItem\n        __typename\n      }\n      ... on CinemaAnnounceSelectionItem {\n        ...CinemaAnnounceSelectionItem\n        __typename\n      }\n      ... on CinemaMovieSelectionItem {\n        ...CinemaMovieSelectionItem\n        __typename\n      }\n      ... on SportHighlightSelectionItem {\n        ...SportHighlightSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment AbstractSelection on AbstractSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ... on MovieSelectionItem {\n        ...AbstractMovieSelectionItem\n        __typename\n      }\n      ... on SeasonAnnounceSelectionItem {\n        ...SeasonAnnounceSelectionItem\n        __typename\n      }\n      ... on AnnounceSelectionItem {\n        ...AbstractAnnounceMovieSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ContinueWatchingEmbeddedSelection on ContinueWatchingEmbeddedSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ... on ContinueWatchingSelectionItem {\n        ...ContinueWatchingSelectionItem\n        __typename\n      }\n      ... on TvChannelProgramSelectionItem {\n        ...TvChannelProgramSelectionItem\n        __typename\n      }\n      ... on SportEventSelectionItem {\n        ...SportEventSelectionItem\n        __typename\n      }\n      ... on SportHighlightSelectionItem {\n        ...SportHighlightSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MultiSelection on MultiSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ...MultiSelectionItem\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment EditorialFeatureSelection on EditorialFeatureSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ...EditorialFeatureSelectionItem\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment ChannelProgramsSelection on ChannelProgramsSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ...TvChannelProgramSelectionItem\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment OriginalsSelection on OriginalsSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ...OriginalAnnounceMovieSelectionItem\n      ...OriginalMovieSelectionItem\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SportCompetitionsSelection on SportCompetitionsSelection {\n  ...AbstractSelectionData\n  content(limit: 10, offset: 0) {\n    ...SelectionPagingListData\n    items {\n      ... on SportCompetitionSelectionItem {\n        ...SportCompetitionSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SportSelection on SportSelection {\n  ...AbstractSelectionData\n  content(limit: 10, offset: 0) {\n    ...SelectionPagingListData\n    items {\n      ... on SportEventSelectionItem {\n        ...SportEventSelectionItem\n        __typename\n      }\n      ... on SportHighlightSelectionItem {\n        ...SportHighlightSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment CatchupsSelection on CatchupsSelection {\n  ...AbstractSelectionData\n  content(limit: 10, offset: 0) {\n    ...SelectionPagingListData\n    items {\n      ... on CatchupSelectionItem {\n        ...CatchupSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment GamesSelection on GamesSelection {\n  ...AbstractSelectionData\n  content(limit: 10, offset: 0) {\n    ...SelectionPagingListData\n    items {\n      ... on GameSelectionItem {\n        ...GameSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PremiereVideosSelection on PremiereVideosSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ... on PremiereVideoSelectionItem {\n        ...PremiereVideoSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment SocialSelection on SocialSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ...SocialSelectionItem\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment StyledShowcasesSelection on StyledShowcasesSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ... on StyledShowcaseSelectionItem {\n        ...StyledShowcasesSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment NotificationsSelection on NotificationsSelection {\n  ...AbstractSelectionData\n  content(offset: 0, limit: 10) {\n    ...SelectionPagingListData\n    items {\n      ... on NotificationSelectionItem {\n        ...NotificationSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment LumenSelection on LumenSelection {\n  id\n  title\n  comment\n  showTitle\n  lumenContent: content(offset: 0, limit: 3) {\n    ...SelectionPagingListData\n    items {\n      ... on LumenMovieSelectionItem {\n        movie {\n          ...LumenMovieData\n          ...PromoTrailer\n          ...MainTrailer\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}";
  var STATUS_QUERY = "query ContentActionsMovieStatuses($contendUuid: String!, $withWatched: Boolean!) {\n  movieByContentUuid(contentUuid: $contendUuid) {\n    id\n    contentId\n    ...MoviePlannedToWatch\n    ...MovieNotInterestedStatus\n    ...MovieWatchedStatus @include(if: $withWatched)\n    userData {\n      voting {\n        value\n        __typename\n      }\n      ...PurchaseMetadata\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment MoviePlannedToWatch on Movie {\n  userData {\n    isPlannedToWatch\n    __typename\n  }\n  __typename\n}\n\nfragment MovieNotInterestedStatus on Movie {\n  userData {\n    watchStatuses {\n      notInterested {\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment MovieWatchedStatus on Movie {\n  userData {\n    watchStatuses {\n      watched {\n        value\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PurchaseMetadata on MovieUserData {\n  purchaseMetadata(includeWaiting: true) {\n    id\n    watchPeriod {\n      watchPeriodStatus\n      __typename\n    }\n    __typename\n  }\n  __typename\n}";
  var SET_WATCHED = "mutation MovieSetWatched($kpId: Long!) {\n  movie {\n    watched {\n      set(input: {movieId: $kpId}) {\n        status\n        error {\n          message\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}";
  var REMOVE_WATCHED = "mutation MovieRemoveWatched($kpId: Long!) {\n  movie {\n    watched {\n      remove(input: {movieId: $kpId}) {\n        status\n        error {\n          message\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}";
  var SET_PLANNED = "mutation MovieSetPlannedToWatch($movieId: Long!) {\n  movie {\n    plannedToWatch {\n      set(input: {movieId: $movieId}) {\n        status\n        error {\n          message\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}";
  var REMOVE_PLANNED = "mutation MovieRemovePlannedToWatch($movieId: Long!) {\n  movie {\n    plannedToWatch {\n      remove(input: {movieId: $movieId}) {\n        status\n        error {\n          message\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}";
  var SET_VOTE = "mutation MovieSetVote($kpId: Long!, $rate: Int!) {\n  movie {\n    vote {\n      set(input: {movieId: $kpId, rate: $rate}) {\n        status\n        error {\n          message\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}";
  var REMOVE_VOTE = "mutation MovieRemoveVote($kpId: Long!) {\n  movie {\n    vote {\n      remove(input: {movieId: $kpId}) {\n        status\n        error {\n          message\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}";
  var SET_NOT_INTERESTED = "mutation MovieSetNotInterested($kpId: Long!) {\n  movie {\n    notInterested {\n      set(input: {movieId: $kpId}) {\n        status\n        error {\n          message\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}";
  var REMOVE_NOT_INTERESTED = "mutation MovieRemoveNotInterested($kpId: Long!) {\n  movie {\n    notInterested {\n      remove(input: {movieId: $kpId}) {\n        status\n        error {\n          message\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}";

  var SELECTION_FRAGMENT_NAMES = ['AbstractSelectionData', 'SelectionPagingListData', 'Title', 'AbstractSelectionMovieData', 'Image', 'MovieHorizontalPoster', 'MovieVerticalPoster', 'RatingValue', 'SelectionMovieViewOptionProps', 'SelectionMovieViewOption', 'MovieRatingListItem', 'MovieRatingLists', 'SelectionMovie', 'MainTrailer', 'PromoTrailer', 'Promo', 'AbstractMovieSelectionItem', 'AbstractAnnounceMovieSelectionItem', 'SeasonAnnounceSelectionItem', 'CatchupReferenceContent', 'SelectionItemViewOption', 'Catchup', 'CatchupSelectionItem', 'SocialUserProfileId', 'SocialUserBadges', 'SocialUserForSelection', 'PlannedToWatchSocialUserArgument', 'WatchedSocialUserArgument', 'VotedSocialUserArgument', 'WatchingSocialUserArgument', 'SocialArgument', 'SocialSelectionItem'];
  var SELECTION_DATA_FRAGMENT = 'fragment SelectionData on AbstractSelection {\n  ...AbstractSelectionData\n  content(offset: $offset, limit: $limit) {\n    ...SelectionPagingListData\n    items {\n      ...AbstractMovieSelectionItem\n      ... on AnnounceSelectionItem {\n        ...AbstractAnnounceMovieSelectionItem\n        __typename\n      }\n      ... on SeasonAnnounceSelectionItem {\n        ...SeasonAnnounceSelectionItem\n        __typename\n      }\n      ... on OriginalAnnounceMovieSelectionItem {\n        ...AbstractAnnounceMovieSelectionItem\n        __typename\n      }\n      ... on PromoAnnounceSelectionItem {\n        ...AbstractAnnounceMovieSelectionItem\n        __typename\n      }\n      ... on CatchupSelectionItem {\n        ...CatchupSelectionItem @include(if: $withCatchupSelection)\n        __typename\n      }\n      ... on SocialSelectionItem {\n        ...SocialSelectionItem\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n  __typename\n}';
  var SELECTION_OPERATION = 'query Selection($showcaseId: String, $selectionId: String!, $offset: Int!, $limit: Int!, $withUserData: Boolean!, $withCatchupSelection: Boolean!) {\n  selection(id: $selectionId, showcaseId: $showcaseId) {\n    ...SelectionData\n    __typename\n  }\n}';
  var SELECTION_QUERY = '';
  // Kinopoisk проверяет этот документ по allowlist. Текст оставляем штатным,
  // а объём неиспользуемых значений фильтров уменьшаем переменной ниже.
  var PLANNED_QUERY = "query UserReactionMoviesPage($isAuthorized: Boolean!, $socialAlias: String!, $includeTypes: [ReactionType!]!, $limit: Int!, $offset: Int!, $orderBy: MovieReactionsOrderBy, $supportedFilterTypes: [FilterType]!, $filters: FilterValuesInput, $singleSelectFiltersLimit: Int!, $singleSelectFiltersOffset: Int!) { userProfileBySocialAlias(socialAlias: {socialAlias: $socialAlias}) { ...SocialUserProfileId userData { movieReactions(limit: $limit, offset: $offset, orderBy: $orderBy, includeTypes: $includeTypes, supportedFilterTypes: $supportedFilterTypes, filters: $filters) { ...UserReactionMoviesAvailableFilters items { ...UserReaction __typename } total limit offset __typename } __typename } __typename } } fragment ToggleFilter on BooleanFilter { id enabled name { russian __typename } __typename } fragment SingleSelectFilters on SingleSelectFilter { id name { russian __typename } hint { russian __typename } values(offset: $singleSelectFiltersOffset, limit: $singleSelectFiltersLimit) { items { name { russian __typename } selectable value __typename } __typename } __typename } fragment KpRatingValue on RatingValue { value isActive count __typename } fragment MovieForPoster on Movie { id title { russian original __typename } poster { avatarsUrl __typename } genres { id name __typename } rating { kinopoisk { ...KpRatingValue __typename } __typename } userData @include(if: $isAuthorized) { watchStatuses { watched { value __typename } __typename } __typename } viewOption { buttonText isAvailableOnline: isWatchable(filter: {anyDevice: false, anyRegion: false}) purchasabilityStatus contentPackageToBuy { billingFeatureName __typename } subscriptionBadge { image { avatarsUrl __typename } __typename } type posterWithRightholderLogo __typename } ... on Film { productionYear __typename } ... on Video { productionYear __typename } ... on TvSeries { releaseYears { start end __typename } __typename } ... on TvShow { releaseYears { start end __typename } __typename } ... on MiniSeries { releaseYears { start end __typename } __typename } __typename } fragment SocialUserProfileId on UserProfileInterface { id { kpId ottId puid __typename } __typename } fragment UserReactionMoviesAvailableFilters on PagingList_UserMovieReactions { availableFilters { ... on BooleanFilter { ...ToggleFilter __typename } ... on SingleSelectFilter { ...SingleSelectFilters __typename } __typename } __typename } fragment UserReaction on UserMovieReactions { movie { ...MovieForPoster contentId __typename } reactions(includeTypes: $includeTypes) { __typename ... on Watched { watched __typename } ... on Vote { value __typename } ... on PlannedToWatch { plannedToWatch __typename } } __typename } ";
  var PROFILE_ID_QUERY = "query UserCanCreateKid { userProfile { ... on UserProfile { ...UserId family { canCreateKid __typename } __typename } __typename } } fragment UserId on UserProfileInterface { id { ottId kpId puid __typename } __typename }";
  var GRAPHQL_URL = 'https://graphql.kinopoisk.ru/graphql/';
  var OAUTH_URL = 'https://oauth.yandex.ru';
  var DEVICE_CLIENT_ID = 'b8b9c7a09b79452094e12f6990009934';
  var DEVICE_CLIENT_SECRET = '0e7001e272944c05ae5a0df16e3ea8bd';
  var STORAGE_ACCOUNTS = 'my_kinopoisk_accounts_v1';
  var STORAGE_ACTIVE = 'my_kinopoisk_active_account_v1';
  var STORAGE_DEVICE_ID = 'my_kinopoisk_device_id_v1';
  var STORAGE_VSID = 'my_kinopoisk_vsid_v1';
  var MENU_ACTION = 'my_kinopoisk';
  var STYLE_ID = 'my-kinopoisk-style';
  var authSession = null;
  var currentSettingsBody = null;
  var activeHome = null;
  var activeCategory = null;
  var settingsRegistered = false;
  var globalListenersRegistered = false;
  var menuOrderTimer = null;

  function addStyle() {
    if (global.document.getElementById(STYLE_ID)) return;

    var css = [
      '.my-kp-page{background:#000;color:#fff;min-height:100%;font-size:1em;}',
      '.my-kp-page .scroll__content{padding:0 2.2em 4em;}',
      '.my-kp-home .scroll__body{padding-bottom:3em;}',
      '.my-kp-hero{height:31em;min-height:430px;position:relative;overflow:hidden;border-radius:.2em;background:#171717;margin-bottom:1.8em;}',
      '.my-kp-hero__back{position:absolute;inset:0;background:#171717 center/cover no-repeat;}.my-kp-hero__back-image{position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;}',
      '.my-kp-hero__back:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.62) 38%,rgba(0,0,0,.12) 75%,rgba(0,0,0,.38) 100%),linear-gradient(0deg,rgba(0,0,0,.8),transparent 42%);}',
      '.my-kp-hero__content{position:absolute;z-index:1;left:4.5%;bottom:8%;width:48%;min-width:19em;}',
      '.my-kp-hero__logo{display:block;max-width:20em;max-height:7em;object-fit:contain;object-position:left bottom;margin-bottom:1em;}',
      '.my-kp-hero__title{font-size:2.1em;font-weight:700;line-height:1.08;margin-bottom:.45em;}',
      '.my-kp-hero__description{font-size:1.05em;line-height:1.4;color:rgba(255,255,255,.82);max-width:34em;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}',
      '.my-kp-hero__actions{display:flex;align-items:center;gap:.65em;margin-top:1.5em;flex-wrap:wrap;}',
      '.my-kp-action{display:flex;align-items:center;justify-content:center;border-radius:2em;padding:.85em 1.35em;background:#242424;color:#fff;min-height:2.6em;box-sizing:border-box;font-weight:600;}',
      '.my-kp-action--primary{background:#ff5b00;}',
      '.my-kp-action--round{width:3.1em;padding:0;border-radius:50%;font-size:1.2em;}',
      '.my-kp-action.focus,.my-kp-action:hover{box-shadow:0 0 0 .2em rgba(255,255,255,.78);}',
      '.my-kp-hero__nav{position:absolute;z-index:2;top:48%;width:2.2em;height:3.8em;border-radius:2em;background:rgba(0,0,0,.3);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.7em;}',
      '.my-kp-hero__nav.focus{background:#ff5b00;box-shadow:0 0 0 .16em #fff;}',
      '.my-kp-hero__prev{left:1em;}.my-kp-hero__next{right:1em;}',
      '.my-kp-hero__dots{display:flex;gap:.35em;margin-top:1.1em;}.my-kp-hero__dot{width:.55em;height:.55em;border-radius:50%;background:#777;}.my-kp-hero__dot--active{width:1.7em;border-radius:1em;background:#fff;}',
      '.my-kp-row{margin:2em 0em 2em 2em;}.my-kp-row__title{font-size:1.18em;font-weight:700;margin:0 0 .75em;}.my-kp-row__viewport{position:relative;}.my-kp-row__cards{display:flex;gap:.75em;overflow-x:auto;overflow-y:hidden;padding:.25em .25em .7em;scrollbar-width:none;}.my-kp-row__cards::-webkit-scrollbar{display:none;}.my-kp-row__arrow{position:absolute;z-index:2;top:50%;width:5%;height:100%;transform:translateY(-50%);display:flex;align-items:center;justify-content:center;color:#fff;font-size:4em;line-height:1;opacity:0;pointer-events:none;cursor:pointer;user-select:none;transition:opacity .15s,background .15s;}.my-kp-row__arrow--left{left:0em;background:linear-gradient(90deg,rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);}.my-kp-row__arrow--right{right:0em;background:linear-gradient(90deg,rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);}.my-kp-row--has-left:hover .my-kp-row__arrow--left,.my-kp-row--has-right:hover .my-kp-row__arrow--right{opacity:.85;pointer-events:auto;}.my-kp-row__arrow:hover{background:rgba(0,0,0,.72);opacity:1;}',
      '.my-kp-card{flex:0 0 14.2em;width:14.2em;min-width:0;color:#fff;contain:layout;}.my-kp-card__view{height:8em;position:relative;border-radius:.18em;overflow:hidden;background:#242424;contain:layout;}.my-kp-card__view img{width:100%;height:100%;display:block;object-fit:cover;background:#242424;}.my-kp-card__empty{height:100%;display:flex;align-items:center;justify-content:center;color:#888;font-size:2em;}.my-kp-card__rating,.my-kp-card__bookmark,.my-kp-card__watched{position:absolute;top:.35em;padding:.2em .42em;border-radius:.2em;background:rgba(15,15,15,.82);font-size:.78em;font-weight:700;}.my-kp-card__rating{left:.35em;background:#656565;}.my-kp-card__rating--red{background:#e0524d;color:#fff;}.my-kp-card__rating--gray{background:#656565;color:#fff;}.my-kp-card__rating--green{background:#5caf45;color:#fff;}.my-kp-card__rating--gold{background:#d8bf76;color:#1a1a1a;}.my-kp-card__bookmark{right:.35em;color:#ff6a00;font-size:1em;}.my-kp-card__watched{right:.35em;top:auto;bottom:.35em;color:#7bd85b;}.my-kp-card.focus .my-kp-card__view{box-shadow:0 0 0 .2em #fff;}.my-kp-card.focus .my-kp-card__title{color:#ff7a19;}.my-kp-card__title{font-size:.92em;font-weight:600;line-height:1.2;margin-top:.5em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}.my-kp-card__meta{font-size:.78em;color:#969696;margin-top:.25em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}',
      '.my-kp-more{flex:0 0 11em;width:11em;min-height:8em;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;border-radius:.3em;}.my-kp-more__arrow{width:2.7em;height:2.7em;border-radius:50%;display:flex;align-items:center;justify-content:center;background:#202020;font-size:2em;line-height:1;}.my-kp-more__title{font-size:.95em;font-weight:600;margin-top:.7em;}.my-kp-more.focus .my-kp-more__arrow{background:#ff5b00;box-shadow:0 0 0 .16em #fff;}.my-kp-more.focus .my-kp-more__title{color:#ff7a19;}',
      '.my-kp-category{padding-top:1em;}.my-kp-category__header{display:flex;align-items:center;margin:0 2em 1.5em;min-height:3.2em;}.my-kp-category__back{width:2.3em;height:2.3em;display:flex;align-items:center;justify-content:center;border-radius:50%;background:#242424;font-size:2em;line-height:1;margin-right:1em;flex:0 0 auto;}.my-kp-category__back.focus{background:#ff5b00;box-shadow:0 0 0 .16em #fff;}.my-kp-category__title{font-size:2em;font-weight:700;line-height:1.1;}.my-kp-category__grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:2em .9em;padding:0 2em;contain:layout style;}.my-kp-category__grid .my-kp-card{width:auto;flex:initial;}.my-kp-category__grid .my-kp-card__view{height:auto;aspect-ratio:468 / 264;}.my-kp-category__grid .my-kp-state{grid-column:1 / -1;}.my-kp-category__footer{min-height:2em;padding:2em;text-align:center;color:#999;}.my-kp-category__empty{grid-column:1 / -1;}',
      '.my-kp-state{min-height:22em;display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;gap:1em;color:#bdbdbd;padding:4em 1em;}.my-kp-state__title{font-size:1.35em;color:#fff;font-weight:600;}.my-kp-state__text{max-width:34em;line-height:1.4;}.my-kp-state .my-kp-action{margin-top:.5em;}',
      '',
      '.my-kp-settings{padding:2em;}.my-kp-settings__caption{font-size:1.2em;font-weight:700;margin:.4em 0 1em;}.my-kp-settings__note{color:#8d8d8d;line-height:1.35;margin:.6em 0 1.3em;}.my-kp-account{position:relative;}.my-kp-account__mark{color:#ff6a00;font-size:.85em;margin-left:.6em;}.my-kp-account.focus,.my-kp-settings__new.focus{background:rgba(255,255,255,.08);}.my-kp-settings__new{font-size:1.05em;color:#ff6a00;padding:1em .7em;border-radius:.2em;}.my-kp-auth{line-height:1.4;padding:.3em 0 1em;}.my-kp-auth__code{font-size:2.5em;letter-spacing:.17em;font-weight:700;text-align:center;margin:1em 0;color:#ff6a00;}.my-kp-auth__url{background:#242424;border-radius:.25em;padding:.8em;word-break:break-all;color:#fff;}.my-kp-auth__url.focus{box-shadow:0 0 0 .15em #fff;}.my-kp-auth__status{color:#aaa;margin-top:1em;text-align:center;min-height:1.4em;}',
      '@media(max-width:800px){.my-kp-hero{height:26em;min-height:350px;}.my-kp-hero__content{left:5%;bottom:7%;width:72%;}.my-kp-hero__title{font-size:1.7em;}.my-kp-card{flex-basis:11.5em;width:11.5em;}.my-kp-card__view{height:6.5em;}}',
      '@media(max-width:520px){.my-kp-page .scroll__content{padding-left:1em;padding-right:1em;}.my-kp-hero{height:23em;min-height:300px;margin-left:-1em;margin-right:-1em;border-radius:0;}.my-kp-hero__content{width:82%;}.my-kp-hero__description{font-size:.9em;}.my-kp-hero__nav{width:2.1em;height:3.2em;font-size:1.5em;}.my-kp-card{flex-basis:9.8em;width:9.8em;}.my-kp-card__view{height:5.5em;}}',
      '.my-kp-hero__content{left:12%;width:44%;}',
      '.my-kp-hero__nav{top:50%;left:auto;width:2.1em;height:3.4em;transform:translateY(-50%);}',
      '.my-kp-hero__prev{left:.35em;}.my-kp-hero__next{right:.35em;}',
      '.my-kp-full-action{min-width:0;}.my-kp-full-action__icon{width:1.5em;height:1.5em;display:block;flex-shrink:0;color:inherit;}.my-kp-full-action--busy{opacity:.55;pointer-events:none;}',
      '@media(max-width:800px){.my-kp-hero__content{left:14%;width:64%;}.my-kp-hero__nav{width:2em;height:3.2em;}}',
      '@media(max-width:1000px){.my-kp-category__grid{grid-template-columns:repeat(4,minmax(0,1fr));}}',
      '@media(max-width:700px){.my-kp-category__grid{grid-template-columns:repeat(3,minmax(0,1fr));}.my-kp-category__title{font-size:1.6em;}}',
      '@media(max-width:520px){.my-kp-hero__content{left:15%;width:70%;}.my-kp-hero__nav{width:1.8em;height:2.8em;font-size:1.4em;}.my-kp-category__header{margin-left:1em;margin-right:1em;}.my-kp-category__grid{grid-template-columns:repeat(2,minmax(0,1fr));padding-left:1em;padding-right:1em;gap:1.5em .65em;}.my-kp-category__title{font-size:1.35em;}}'
    ].join('');

    $('<style id="' + STYLE_ID + '"></style>').text(css).appendTo('head');
  }

  function randomId() {
    try {
      if (global.crypto && global.crypto.randomUUID) return global.crypto.randomUUID();
    } catch (e) {}
    return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2) + '-' + Math.random().toString(36).slice(2);
  }

  function storageGet(key, fallback) {
    try {
      var value = Lampa.Storage.get(key, fallback);
      if (typeof value == 'string') {
        try {
          return JSON.parse(value);
        } catch (e) {}
      }
      return typeof value == 'undefined' || value === null ? fallback : value;
    } catch (e) {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try {
      if (Lampa.Storage && Lampa.Storage.set) Lampa.Storage.set(key, value, true);
      else if (global.localStorage) global.localStorage.setItem(key, typeof value == 'string' ? value : JSON.stringify(value));
    } catch (e) {}
  }

  function getAccounts() {
    var list = storageGet(STORAGE_ACCOUNTS, []);
    if (!Array.isArray(list)) list = [];
    return list.filter(function (item) {
      return item && item.id && item.accessToken;
    });
  }

  function saveAccounts(list) {
    storageSet(STORAGE_ACCOUNTS, list);
  }

  function activeAccount() {
    var list = getAccounts();
    if (!list.length) return null;

    var active = storageGet(STORAGE_ACTIVE, '');
    var found = list.find(function (item) {
      return String(item.id) == String(active);
    });

    if (!found) {
      found = list[0];
      storageSet(STORAGE_ACTIVE, found.id);
    }

    return found;
  }

  function setActiveAccount(id) {
    storageSet(STORAGE_ACTIVE, String(id));
  }

  function accountName(account) {
    return account.title || account.email || 'Аккаунт Kinopoisk';
  }

  function replaceAccount(updated) {
    var list = getAccounts();
    var index = list.findIndex(function (item) {
      return String(item.id) == String(updated.id);
    });
    if (index >= 0) list[index] = updated;else list.push(updated);
    saveAccounts(list);
  }

  function removeAccount(id) {
    var list = getAccounts().filter(function (item) {
      return String(item.id) != String(id);
    });
    saveAccounts(list);
    var active = storageGet(STORAGE_ACTIVE, '');
    if (String(active) == String(id)) storageSet(STORAGE_ACTIVE, list.length ? list[0].id : '');
  }

  function formEncode(data) {
    var result = [];
    for (var key in data) {
      if (data[key] === null || typeof data[key] == 'undefined') continue;
      result.push(encodeURIComponent(key) + '=' + encodeURIComponent(String(data[key])));
    }
    return result.join('&');
  }

  function request(method, url, payload, headers, complete, error) {
    if (!Lampa.Reguest) {
      if (typeof global.fetch == 'function') {
        var fetchOptions = {method: method, headers: headers || {}};
        if (payload) fetchOptions.body = typeof payload == 'string' ? payload : JSON.stringify(payload);
        global.fetch(url, fetchOptions).then(function (response) {
          return response.json().then(function (data) {
            if (!response.ok) throw {responseJSON: data, status: response.status};
            return data;
          });
        }).then(complete).catch(error);
        return;
      }
      if (error) error({message: 'В Lampa недоступен сетевой модуль'});
      return;
    }

    var req = new Lampa.Reguest();
    req.timeout(30000);
    var params = {
      type: method,
      dataType: 'json',
      headers: headers || {}
    };
    var body = typeof payload == 'string' ? payload : payload ? JSON.stringify(payload) : false;
    var isAndroid = false;

    try {
      isAndroid = Lampa.Platform && Lampa.Platform.is && Lampa.Platform.is('android');
    } catch (e) {}

    if (isAndroid && req.native) req.native(url, complete, error, body, params);else req.quiet(url, complete, error, body, params);
  }

  function requestForm(url, data, complete, error) {
    request('POST', url, formEncode(data), {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      Accept: 'application/json'
    }, complete, error);
  }

  function requestGet(url, headers, complete, error) {
    request('GET', url, false, headers || {Accept: 'application/json'}, complete, error);
  }

  function getVsid() {
    var value = storageGet(STORAGE_VSID, '');
    if (value) return String(value);
    value = randomId();
    storageSet(STORAGE_VSID, value);
    return value;
  }

  function getDeviceId() {
    var value = storageGet(STORAGE_DEVICE_ID, '');
    if (typeof value == 'string' && /^[\x20-\x7e]{6,50}$/.test(value)) return value;

    value = 'lampa-' + randomId();
    storageSet(STORAGE_DEVICE_ID, value);
    return value;
  }

  function graphError(data) {
    if (!data || !data.errors || !data.errors.length) return '';
    return data.errors[0] && data.errors[0].message ? data.errors[0].message : 'Ошибка GraphQL';
  }

  function errorPayload(error) {
    if (!error) return null;
    if (error.responseJSON) return error.responseJSON;
    if (error.responseText) {
      try {
        return JSON.parse(error.responseText);
      } catch (e) {}
    }
    return error;
  }

  function errorText(error) {
    if (typeof error == 'string') return error;
    var data = errorPayload(error);
    if (data) {
      if (data.error_description) return data.error_description;
      if (data.message) return data.message;
      if (data.error && typeof data.error == 'string') return data.error;
      if (data.errors && data.errors[0] && data.errors[0].message) return data.errors[0].message;
    }
    if (error && error.decode_error) return error.decode_error;
    return 'Ошибка сети';
  }

  function notice(message) {
    if (Lampa.Noty && Lampa.Noty.show) Lampa.Noty.show(message);
  }

  function graphql(operationName, query, variables, mutation, complete, error) {
    var headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'ru-RU,ru;q=0.9',
      'X-Preferred-Language': 'ru',
      'service-id': '25',
      'X-Kp-Client-Platform': 'web',
      'X-Application-Vsid': getVsid()
    };
    var account = activeAccount();
    if (account && account.accessToken) headers.Authorization = 'OAuth ' + account.accessToken;
    if (mutation) headers['Source-Id'] = '9';

    request('POST', GRAPHQL_URL + '?operationName=' + encodeURIComponent(operationName), {
      operationName: operationName,
      query: query,
      variables: variables
    }, headers, complete, error);
  }

  function profileIdentifiers(response) {
    var profile = response && response.data && response.data.userProfile;
    var id = profile && profile.id;
    if (!id) return null;
    return {
      kpId: id.kpId ? String(id.kpId) : '',
      ottId: id.ottId ? String(id.ottId) : '',
      puid: id.puid ? String(id.puid) : ''
    };
  }

  function queryProfileIdentifiers(account, complete, error) {
    var headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Accept-Language': 'ru-RU,ru;q=0.9',
      'X-Preferred-Language': 'ru',
      'service-id': '25',
      'X-Kp-Client-Platform': 'web',
      'X-Application-Vsid': getVsid()
    };
    if (account && account.accessToken) headers.Authorization = 'OAuth ' + account.accessToken;

    request('POST', GRAPHQL_URL + '?operationName=UserCanCreateKid', {
      operationName: 'UserCanCreateKid',
      query: PROFILE_ID_QUERY,
      variables: {}
    }, headers, function (response) {
      var identifiers = profileIdentifiers(response);
      if (identifiers && (identifiers.kpId || identifiers.puid || identifiers.ottId)) {
        complete(identifiers);
        return;
      }
      if (error) error(graphError(response) || 'Не удалось получить профиль Кинопоиска');
    }, error);
  }

  function applyProfileIdentifiers(account, identifiers) {
    if (!account || !identifiers) return '';
    if (identifiers.kpId) {
      account.kpId = identifiers.kpId;
      // Для userProfileBySocialAlias нужен именно публичный ID Кинопоиска,
      // а не Yandex OAuth user_id/puid.
      account.socialAlias = identifiers.kpId;
      account.socialAliasResolved = true;
    }
    if (identifiers.ottId) account.ottId = identifiers.ottId;
    if (identifiers.puid) account.puid = identifiers.puid;
    if (!account.userId && identifiers.puid) account.userId = identifiers.puid;
    account.updatedAt = Date.now();
    if (getAccounts().some(function (item) { return String(item.id) == String(account.id); })) replaceAccount(account);
    return String(identifiers.kpId || account.socialAlias || identifiers.puid || identifiers.ottId || '');
  }

  function graphqlFragment(query, name) {
    var match = new RegExp('(?:^|\\n)(fragment\\s+' + name + '\\s+on\\s+[^\\{]+\\{)').exec(query);
    if (!match) return '';

    var start = match.index + (match[0].charAt(0) == '\n' ? 1 : 0);
    var open = query.indexOf('{', start);
    var depth = 0;
    var quoted = false;

    for (var i = open; i < query.length; i++) {
      var character = query.charAt(i);
      if (character == '"' && query.charAt(i - 1) != '\\') quoted = !quoted;
      if (!quoted) {
        if (character == '{') depth += 1;
        if (character == '}') depth -= 1;
        if (depth === 0) return query.slice(start, i + 1);
      }
    }

    return '';
  }

  function getSelectionQuery() {
    if (SELECTION_QUERY) return SELECTION_QUERY;

    var definitions = [SELECTION_OPERATION];
    SELECTION_FRAGMENT_NAMES.forEach(function (name) {
      var fragment = graphqlFragment(HOME_QUERY, name);
      if (fragment) definitions.push(fragment);
    });
    definitions.push(SELECTION_DATA_FRAGMENT);
    SELECTION_QUERY = definitions.join('\n\n');
    return SELECTION_QUERY;
  }

  var refreshJobs = {};

  function finishRefresh(key, error, account) {
    var jobs = refreshJobs[key] || [];
    delete refreshJobs[key];
    jobs.forEach(function (job) {
      if (error) job.fail(error);else job.done(account);
    });
  }

  function ensureAccess(complete, error) {
    var account = activeAccount();
    if (!account) {
      error('Сначала добавьте аккаунт Kinopoisk в настройках');
      return;
    }

    var expiresAt = Number(account.expiresAt || 0);
    if (account.accessToken && (!expiresAt || expiresAt > Date.now() + 60000)) {
      complete(account);
      return;
    }

    if (!account.refreshToken) {
      error('Срок авторизации истёк, войдите в аккаунт заново');
      return;
    }

    var key = String(account.id);
    if (refreshJobs[key]) {
      refreshJobs[key].push({done: complete, fail: error});
      return;
    }

    refreshJobs[key] = [{done: complete, fail: error}];
    requestForm(OAUTH_URL + '/token', {
      grant_type: 'refresh_token',
      refresh_token: account.refreshToken,
      client_id: DEVICE_CLIENT_ID,
      client_secret: DEVICE_CLIENT_SECRET
    }, function (data) {
      if (!data || !data.access_token) {
        finishRefresh(key, 'Не удалось обновить авторизацию', null);
        return;
      }

      account.accessToken = data.access_token;
      if (data.refresh_token) account.refreshToken = data.refresh_token;
      account.expiresAt = Date.now() + Number(data.expires_in || 3600) * 1000 - 5000;
      account.updatedAt = Date.now();
      replaceAccount(account);
      finishRefresh(key, null, account);
    }, function (requestError) {
      finishRefresh(key, 'Не удалось обновить авторизацию: ' + errorText(requestError), null);
    });
  }

  function normalizeText(value) {
    if (value === null || typeof value == 'undefined') return '';
    if (typeof value == 'string' || typeof value == 'number') return String(value);
    if (value.localized) return normalizeText(value.localized);
    if (value.russian) return normalizeText(value.russian);
    if (value.ru) return normalizeText(value.ru);
    if (value.original) return normalizeText(value.original);
    if (value.text) return normalizeText(value.text);
    if (value.value) return normalizeText(value.value);
    return '';
  }

  function imageUrl(value, size) {
    if (!value) return '';
    value = String(value);
    if (value.indexOf('//') === 0) value = 'https:' + value;

    var parts = value.match(/^([^?#]*)([?#].*)?$/);
    var path = parts ? parts[1] : value;
    var tail = parts && parts[2] ? parts[2] : '';

    // avatarsUrl от Кинопоиска — это только идентификатор картинки.
    // Без последнего /размер avatars.mds.yandex.net отвечает HTTP 400.
    if (/^https?:\/\/avatars\.mds\.yandex\.net\/get-ott\//i.test(path)) {
      path = path.replace(/\/(?:orig|\d{2,5}x\d{2,5})$/i, '');
      path = path.replace(/\/+$/, '') + '/' + (size || '468x264');
    }

    if (/^https?:\/\/avatars\.mds\.yandex\.net\/get-kinopoisk-image\//i.test(path)) {
      path = path.replace(/\/(?:orig|\d{2,5}x\d{2,5})$/i, '');
      path = path.replace(/\/+$/, '') + '/' + (size || '468x264');
    }

    return path + tail;
  }

  function galleryUrl(movie, groupName, orientation, size) {
    var gallery = movie && movie.gallery || {};
    var group = gallery[groupName] && gallery[groupName][orientation];
    if (Array.isArray(group)) group = group[0];
    if (!group) return '';
    return imageUrl(group.avatarsUrl || group.url || group.fallbackUrl || group.src, size);
  }

  function getMovieId(movie, raw) {
    var value = movie && (movie.kpId || movie.kinopoiskId || movie.id);
    if (!value && raw) value = raw.kpId || raw.kinopoiskId || raw.id;
    var number = parseInt(value, 10);
    return isNaN(number) ? 0 : number;
  }

  function getYear(movie) {
    if (!movie) return '';
    if (movie.productionYear) return String(movie.productionYear);
    if (movie.year) return String(movie.year);
    var years = movie.releaseYears;
    if (Array.isArray(years) && years.length) {
      var first = years[0];
      return normalizeText(first.start || first.year || first);
    }
    if (years && typeof years == 'object') return normalizeText(years.start || years.year || years);
    return '';
  }

  function getRating(movie) {
    var rating = movie && movie.rating && movie.rating.kinopoisk;
    if (rating && typeof rating == 'object') rating = rating.value;
    var number = Number(rating || 0);
    return number > 0 ? number.toFixed(1).replace('.0', '') : '';
  }

  function getDescription(movie, raw) {
    return normalizeText(movie && (movie.shortDescription || movie.description || movie.synopsis)) || normalizeText(raw && raw.shortDescription);
  }

  function getStatusFromMovie(movie) {
    var userData = movie && movie.userData || {};
    var statuses = userData.watchStatuses || {};
    return {
      planned: Boolean(userData.isPlannedToWatch),
      watched: Boolean(statuses.watched && statuses.watched.value),
      notInterested: Boolean(statuses.notInterested && statuses.notInterested.value),
      rating: Number(userData.voting && userData.voting.value || 0)
    };
  }

  function directImageUrl(value, size) {
    if (Array.isArray(value)) value = value[0];
    if (!value) return '';
    if (typeof value == 'object') value = value.avatarsUrl || value.url || value.fallbackUrl || value.src;
    return imageUrl(value, size);
  }

  function getStatusFromReactions(reactions) {
    var result = {planned: false, watched: false, notInterested: false, rating: 0};
    (reactions || []).forEach(function (reaction) {
      if (!reaction) return;
      if (reaction.__typename == 'PlannedToWatch') result.planned = Boolean(reaction.plannedToWatch);
      if (reaction.__typename == 'Watched') result.watched = Boolean(reaction.watched);
      if (reaction.__typename == 'Vote') result.rating = Number(reaction.value || 0);
    });
    return result;
  }

  function normalizeMovie(item) {
    if (!item) return null;

    var movie = item.movie || null;
    if (item.entity) movie = item.entity.tvSeries || item.entity;
    if (!movie) movie = item;
    if (movie.tvSeries && !movie.id && !movie.kpId) movie = movie.tvSeries;

    var id = getMovieId(movie, item);
    if (!id) return null;

    var title = normalizeText(movie.title || movie.titleObject || item.title || item.name);
    if (!title) title = 'Без названия';

    var cover = galleryUrl(movie, 'covers', 'horizontal', '468x264') || directImageUrl(movie.cover, '468x264');
    var poster = galleryUrl(movie, 'posters', 'horizontal', '468x264') || galleryUrl(movie, 'posters', 'vertical', '468x264') || directImageUrl(movie.poster, '468x264') || cover;
    var logo = galleryUrl(movie, 'logos', 'horizontal', 'orig');
    var contentId = movie.contentId || movie.contentUuid || item.contentId || item.contentUuid || '';
    var sourceStatus = getStatusFromMovie(movie);
    var reactionStatus = getStatusFromReactions(item.reactions);
    sourceStatus.planned = reactionStatus.planned || sourceStatus.planned;
    sourceStatus.watched = reactionStatus.watched || sourceStatus.watched;
    sourceStatus.notInterested = reactionStatus.notInterested || sourceStatus.notInterested;
    sourceStatus.rating = reactionStatus.rating || sourceStatus.rating;
    return {
      kpId: id,
      contentId: String(contentId || ''),
      title: title,
      year: getYear(movie),
      rating: getRating(movie),
      myRating: sourceStatus.rating,
      poster: poster || cover,
      cover: cover || poster,
      imageSize: '468x264',
      logo: logo,
      description: getDescription(movie, item),
      type: movie.__typename || '',
      planned: sourceStatus.planned,
      watched: sourceStatus.watched,
      notInterested: sourceStatus.notInterested
    };
  }

  function rowItems(row) {
    var content = row && row.content;
    var items = content && content.items;
    return Array.isArray(items) ? items : [];
  }

  var EXCLUDED_TYPES = {
    StyledShowcasesSelection: true,
    CinemaMoviesSelection: true,
    AnnounceSelection: true,
    PremiereVideosSelection: true,
    MultiSelection: true,
    SportSelection: true,
    SportCompetitionsSelection: true,
    CatchupsSelection: true,
    ChannelProgramsSelection: true,
    GamesSelection: true,
    AnnounceSelection: true,
    ExternalMoviesSelection: true,
    EditorialFeatureSelection: true,
    LumenSelection: true,
    NotificationsSelection: true,
    WatchLaterSelection: true
  };

  var EXCLUDED_PROMO_TYPES = {
    PromoAnnounceSelectionItem: true,
    CinemaAnnounceSelectionItem: true,
    CinemaMovieSelectionItem: true,
    SportEventSelectionItem: true,
    SportHighlightSelectionItem: true,
    PromoTvChannelProgramSelectionItem: true,
    CatchupSelectionItem: true
  };

  function isExcludedPromo(item) {
    return Boolean(item && EXCLUDED_PROMO_TYPES[item.__typename]);
  }

  function isExcludedRow(row) {
    var type = row && row.__typename || '';
    var title = normalizeText(row && (row.title || row.name));
    var identity = normalizeText(row && row.id);
    if (EXCLUDED_TYPES[type]) return true;
    return /витрин|сейчас в кино|в эфир|прям(?:ой|ые)|подписк|кинотеатр|жд[её]м|премь|анонс|deep\s*[_-]?\s*dive|технология\s+deep|amediateka|start|upsale/i.test(title + ' ' + identity);
  }

  function parseHomeRows(rawRows) {
    var hero = [];
    var rows = [];

    (rawRows || []).forEach(function (row) {
      var items = rowItems(row);
      var type = row && row.__typename || '';

      if (type == 'PromoSelection') {
        items.forEach(function (item) {
          if (isExcludedPromo(item)) return;
          var normalized = normalizeMovie(item);
          if (normalized) hero.push(normalized);
        });
        return;
      }

      if (isExcludedRow(row)) return;

      var normalizedItems = [];
      items.forEach(function (item) {
        var normalized = normalizeMovie(item);
        if (normalized) normalizedItems.push(normalized);
      });

      if (!normalizedItems.length) return;

      var title = normalizeText(row.title || row.name || row.id || 'Кинопоиск');
      var hasSelectionPage = type == 'Selection' || type == 'OttTopSelection' || type == 'OttTopFilmsSelection' || type == 'OriginalsSelection' || type == 'SocialSelection';
      rows.push({
        id: row.id || randomId(),
        title: title,
        type: type,
        items: normalizedItems,
        selectionId: hasSelectionPage && row.id ? String(row.id) : '',
        more: hasSelectionPage && Boolean(row.id)
      });
    });

    return {hero: hero, rows: rows};
  }

  function escapeHtml(value) {
    return String(value === null || typeof value == 'undefined' ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  var lazyImageObserver = null;

  function loadLazyImage(image) {
    if (!image) return;
    var source = image.getAttribute('data-src');
    if (!source) return;
    image.setAttribute('src', source);
    image.removeAttribute('data-src');
  }

  function loadImagesNear(root) {
    if (!root || !root.length) return;
    var documentElement = global.document && global.document.documentElement;
    var viewportWidth = Number(global.innerWidth || documentElement && documentElement.clientWidth || 1280);
    var viewportHeight = Number(global.innerHeight || documentElement && documentElement.clientHeight || 720);
    var horizontalMargin = Math.max(160, Math.round(viewportWidth * .18));
    var verticalMargin = Math.max(180, Math.round(viewportHeight * .25));

    root.find('img[data-src]').each(function () {
      var rect = this.getBoundingClientRect();
      if (rect.bottom >= -verticalMargin && rect.top <= viewportHeight + verticalMargin && rect.right >= -horizontalMargin && rect.left <= viewportWidth + horizontalMargin) loadLazyImage(this);
    });
  }

  function releaseImagesFar(root) {
    if (!root || !root.length) return;
    var documentElement = global.document && global.document.documentElement;
    var viewportWidth = Number(global.innerWidth || documentElement && documentElement.clientWidth || 1280);
    var viewportHeight = Number(global.innerHeight || documentElement && documentElement.clientHeight || 720);
    var horizontalLimit = Math.max(viewportWidth * 2, 1200);
    var verticalLimit = Math.max(viewportHeight * 2, 1200);

    root.find('img.my-kp-card__image[src]').each(function () {
      var rect = this.getBoundingClientRect();
      var far = rect.bottom < -verticalLimit || rect.top > viewportHeight + verticalLimit || rect.right < -horizontalLimit || rect.left > viewportWidth + horizontalLimit;
      if (far) {
        var source = this.getAttribute('src');
        if (source) this.setAttribute('data-src', source);
        this.removeAttribute('src');
      }
    });
  }

  function scheduleImageHydration(root) {
    if (!root || !root.length || root.data('my-kp-image-hydration')) return;
    root.data('my-kp-image-hydration', true);

    var done = function () {
      root.removeData('my-kp-image-hydration');
      if (global.document.body.contains(root[0])) {
        loadImagesNear(root);
        releaseImagesFar(root);
      }
    };

    if (global.requestAnimationFrame) global.requestAnimationFrame(done);else setTimeout(done, 40);
  }

  function hydrateImages(root) {
    if (!root || !root.length) return;

    if (!lazyImageObserver && global.IntersectionObserver) {
      lazyImageObserver = new global.IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry || !entry.isIntersecting && !entry.intersectionRatio) return;
          loadLazyImage(entry.target);
          if (lazyImageObserver) lazyImageObserver.unobserve(entry.target);
        });
      }, {rootMargin: '280px 280px'});
    }

    root.find('img[data-src]').each(function () {
      if (lazyImageObserver) lazyImageObserver.observe(this);
    });
    scheduleImageHydration(root);
  }

  function unobserveImages(root) {
    if (!lazyImageObserver || !root || !root.length) return;
    root.find('img[data-src]').each(function () {
      lazyImageObserver.unobserve(this);
    });
  }

  function formatProgress(value) {
    var minutes = Math.floor(Number(value || 0) / 60);
    if (minutes < 60) return minutes + ' мин';
    return Math.floor(minutes / 60) + ' ч ' + minutes % 60 + ' мин';
  }

  function visibleElements(root) {
    return root.find('.selector').toArray().filter(function (element) {
      if ($(element).hasClass('hide')) return false;
      if (!global.document.body.contains(element)) return false;
      return element.offsetParent !== null || element.getClientRects().length > 0;
    });
  }

  function focusInScope(root, target) {
    var elements = visibleElements(root);
    if (!elements.length) return;
    if (!target || !global.document.body.contains(target) || !$.contains(root[0], target)) target = elements[0];
    Lampa.Controller.collectionSet(root);
    Lampa.Controller.collectionFocus(target, root);
  }

  function moveInScope(root, direction, scroll, noTarget) {
    var current = root.find('.selector.focus')[0];
    if (!current) current = root.find('.selector').first()[0];
    if (!current) return;

    var horizontalRow = $(current).closest('.my-kp-row__cards');
    if (horizontalRow.length && (direction == 'left' || direction == 'right')) {
      var rowElements = horizontalRow.children('.selector').toArray();
      var rowIndex = rowElements.indexOf(current);
      var rowTarget = rowElements[rowIndex + (direction == 'right' ? 1 : -1)];

      if (rowTarget) {
        Lampa.Controller.collectionFocus(rowTarget, root);
        if (scroll && scroll.update) scroll.update($(rowTarget), true);
        var rowViewport = horizontalRow[0];
        rowViewport.scrollLeft = rowTarget.offsetLeft - rowViewport.clientWidth / 2 + rowTarget.offsetWidth / 2;
      } else if (direction == 'left' && noTarget) noTarget();
      return;
    }

    // if down in horizonalRow, go to the next row to the first index
    if (horizontalRow.length && direction == 'down') {
      var nextRow = horizontalRow.closest('.my-kp-row').next('.my-kp-row').find('.my-kp-row__cards').first();
      if (nextRow.length) {
        var nextRowElements = nextRow.children('.selector').toArray();
        if (nextRowElements.length) {
          var nextRowTarget = nextRowElements[0];
          Lampa.Controller.collectionFocus(nextRowTarget, root);
          if (scroll && scroll.update) scroll.update($(nextRowTarget), true);
          var nextRowViewport = nextRow[0];
          nextRowViewport.scrollLeft = nextRowTarget.offsetLeft - nextRowViewport.clientWidth / 2 + nextRowTarget.offsetWidth / 2;
          return;
        }
      }
    }

    var categoryGrid = $(current).closest('.my-kp-category__grid');
    if (categoryGrid.length) {
      var gridElements = categoryGrid.children('.selector').toArray();
      var gridIndex = gridElements.indexOf(current);
      var gridDirection = direction == 'left' ? -1 : direction == 'right' ? 1 : direction == 'up' ? -1 : 1;
      var gridStep = direction == 'left' || direction == 'right' ? 1 : getGridColumns(categoryGrid, gridElements);
      var gridTarget = gridElements[gridIndex + gridDirection * gridStep];

      if (gridTarget) {
        if (direction == 'left' || direction == 'right') {
          var currentTop = current.getBoundingClientRect().top;
          var targetTop = gridTarget.getBoundingClientRect().top;
          if (Math.abs(targetTop - currentTop) > 3) gridTarget = null;
        }
        if (gridTarget) {
          Lampa.Controller.collectionFocus(gridTarget, root);
          if (scroll && scroll.update) scroll.update($(gridTarget), true);
          hydrateImages(root);
          return;
        }
      }

      if (direction == 'left' && noTarget) noTarget();
      else if (direction == 'down' && noTarget) noTarget();
      else if (direction == 'right' || direction == 'down') return;
    }

    var elements = visibleElements(root);
    if (!elements.length) return;
    if (elements.indexOf(current) < 0) current = elements[0];

    var currentRect = current.getBoundingClientRect();
    var currentX = currentRect.left + currentRect.width / 2;
    var currentY = currentRect.top + currentRect.height / 2;
    var best = null;
    var bestScore = Infinity;

    elements.forEach(function (element) {
      if (element === current) return;
      var rect = element.getBoundingClientRect();
      var x = rect.left + rect.width / 2;
      var y = rect.top + rect.height / 2;
      var dx = x - currentX;
      var dy = y - currentY;
      var primary = 0;
      var secondary = 0;

      if (direction == 'right') {
        if (dx <= 2) return;
        primary = dx;
        secondary = Math.abs(dy);
      } else if (direction == 'left') {
        if (dx >= -2) return;
        primary = -dx;
        secondary = Math.abs(dy);
      } else if (direction == 'down') {
        if (dy <= 2) return;
        primary = dy;
        secondary = Math.abs(dx);
      } else {
        if (dy >= -2) return;
        primary = -dy;
        secondary = Math.abs(dx);
      }

      var score = primary + secondary * 1.8;
      if (score < bestScore) {
        bestScore = score;
        best = element;
      }
    });

    if (!best) {
      if (noTarget) noTarget();
      return;
    }

    Lampa.Controller.collectionFocus(best, root);
    if (scroll && scroll.update) {
      scroll.update($(best), true);
      var horizontal = $(best).closest('.my-kp-row__cards')[0];
      if (horizontal) horizontal.scrollLeft = best.offsetLeft - horizontal.clientWidth / 2 + best.offsetWidth / 2;
    }
    hydrateImages(root);
  }

  function getGridColumns(grid, elements) {
    if (!elements || !elements.length) return 1;
    var firstTop = elements[0].getBoundingClientRect().top;
    var columns = 0;
    for (var i = 0; i < elements.length; i++) {
      if (Math.abs(elements[i].getBoundingClientRect().top - firstTop) > 3) break;
      columns += 1;
    }
    if (columns > 0) return columns;

    try {
      var template = global.getComputedStyle(grid[0]).gridTemplateColumns || '';
      columns = template.trim().split(/\s+/).filter(Boolean).length;
    } catch (e) {}
    return columns || 1;
  }

  function bindScope(root, enter, focus) {
    root.find('.selector').each(function () {
      var element = $(this);
      if (element.data('my-kp-scope-bound')) return;
      element.data('my-kp-scope-bound', true);
      element.on('hover:focus.my-kp-scope', function (event) {
        if (focus) focus(event.target);
      }).on('hover:enter.my-kp-scope', function (event) {
        if (enter) enter(event);
      });
    });
  }

  function loadHome(complete, error) {
    ensureAccess(function () {
      var rows = [];
      var offset = 0;
      var page = 0;

      function next() {
        graphql('SelectionList', HOME_QUERY, {
          id: 'home',
          offset: offset,
          limit: 40,
          withUserData: true,
          isAuthorized: true,
          withContinueWatchingEmbedded: true,
          withBrandShowcasesEntryPoints: false,
          includeNotificationsSelection: false,
          includeLumenSelection: false,
          filter: null
        }, false, function (response) {
          var responseError = graphError(response);
          var content = response && response.data && response.data.showcase && response.data.showcase.content;

          if (responseError && !content) {
            error(responseError);
            return;
          }

          if (!content) {
            error('Кинопоиск не вернул персональную витрину');
            return;
          }

          Array.prototype.push.apply(rows, content.items || []);
          page += 1;

          if (content.hasMore && page < 3) {
            offset += Number(content.limit || 40);
            setTimeout(next, 0);
          } else {
            complete(rows);
          }
        }, error);
      }

      next();
    }, error);
  }

  function selectionPageResult(response, requestedOffset, requestedLimit) {
    var selection = response && response.data && response.data.selection;
    var content = selection && selection.content;
    if (!content) return null;

    var items = (content.items || []).map(normalizeMovie).filter(Boolean);
    return {
      title: normalizeText(selection.title) || '',
      items: items,
      offset: Number(typeof content.offset == 'undefined' ? requestedOffset : content.offset),
      limit: Number(typeof content.limit == 'undefined' ? requestedLimit : content.limit),
      hasMore: Boolean(content.hasMore)
    };
  }

  function loadSelectionPage(selectionId, offset, complete, error) {
    ensureAccess(function () {
      graphql('Selection', getSelectionQuery(), {
        selectionId: String(selectionId || ''),
        showcaseId: 'home',
        limit: 50,
        offset: Number(offset || 0),
        withUserData: true,
        withCatchupSelection: true
      }, false, function (response) {
        var responseError = graphError(response);
        var result = selectionPageResult(response, offset, 50);
        if (responseError && !result) {
          error(responseError);
          return;
        }
        if (!result) {
          error('Кинопоиск не вернул подборку');
          return;
        }
        complete(result);
      }, error);
    }, error);
  }

  function plannedPageResult(response, requestedOffset, requestedLimit) {
    var profile = response && response.data && response.data.userProfileBySocialAlias;
    var page = profile && profile.userData && profile.userData.movieReactions;
    if (!page) return null;

    var items = (page.items || []).map(function (entry) {
      var normalized = normalizeMovie(entry);
      var reactionStatus = getStatusFromReactions(entry && entry.reactions);
      if (normalized) {
        // На полноразмерной странице много карточек. 468x264 достаточно для
        // сетки, а загрузка /orig для каждой карточки перегружает TV.
        normalized.imageSize = '468x264';
        normalized.planned = reactionStatus.planned || normalized.planned;
        normalized.watched = reactionStatus.watched || normalized.watched;
        normalized.myRating = reactionStatus.rating || normalized.myRating;
        normalized.status = {
          planned: normalized.planned,
          watched: normalized.watched,
          notInterested: normalized.notInterested,
          rating: normalized.myRating
        };
      }
      return normalized;
    }).filter(Boolean);

    var pageOffset = Number(typeof page.offset == 'undefined' ? requestedOffset : page.offset);
    var pageLimit = Number(typeof page.limit == 'undefined' ? requestedLimit : page.limit);
    var hasTotal = page.total !== null && typeof page.total != 'undefined' && !isNaN(Number(page.total));
    var total = hasTotal ? Number(page.total) : 0;

    return {
      items: items,
      offset: pageOffset,
      limit: pageLimit,
      total: total,
      hasMore: hasTotal ? pageOffset + pageLimit < total : items.length >= pageLimit
    };
  }

  function accountSocialAlias(account) {
    return account && String(account.kpId || account.socialAlias || account.userId || account.puid || account.ottId || '');
  }

  function loadPlannedPage(offset, complete, error) {
    ensureAccess(function (account) {
      function requestPage(alias) {
        if (!alias) {
          complete({items: [], offset: Number(offset || 0), limit: 20, total: 0, hasMore: false, missingAlias: true});
          return;
        }

        graphql('UserReactionMoviesPage', PLANNED_QUERY, {
          isAuthorized: true,
          socialAlias: alias,
          includeTypes: ['PLANNED_TO_WATCH'],
          supportedFilterTypes: ['BOOLEAN', 'SINGLE_SELECT'],
          limit: 20,
          offset: Number(offset || 0),
          orderBy: 'UPDATED_AT_DESC',
          filters: {
            booleanFilterValues: [],
            intRangeFilterValues: [],
            singleSelectFilterValues: [],
            multiSelectFilterValues: [],
            realRangeFilterValues: []
          },
          // Фильтры на странице не показываем; одного значения достаточно,
          // чтобы штатный allowlisted-запрос не тянул сотни вариантов.
          singleSelectFiltersLimit: 1,
          singleSelectFiltersOffset: 0
        }, false, function (response) {
          var responseError = graphError(response);
          var result = plannedPageResult(response, offset, 20);
          if (responseError && !result) {
            error(responseError);
            return;
          }
          if (!result) {
            error('Кинопоиск не вернул список «Вы хотели посмотреть»');
            return;
          }
          complete(result);
        }, error);
      }

      if (account.socialAliasResolved && account.kpId) {
        requestPage(String(account.kpId));
        return;
      }

      // Старые версии плагина сохраняли OAuth user_id/puid в socialAlias.
      // Один раз сверяем его с профилем Kinopoisk и мигрируем на kpId.
      queryProfileIdentifiers(account, function (identifiers) {
        var discovered = applyProfileIdentifiers(account, identifiers);
        requestPage(discovered || accountSocialAlias(account));
      }, function () {
        requestPage(accountSocialAlias(account));
      });
    }, error);
  }

  function queryMovieStatus(item, complete, error) {
    if (!item || !item.contentId) {
      complete(null);
      return;
    }

    ensureAccess(function () {
      graphql('ContentActionsMovieStatuses', STATUS_QUERY, {
        contendUuid: item.contentId,
        withWatched: true
      }, false, function (response) {
        var graph = graphError(response);
        if (graph && !(response && response.data && response.data.movieByContentUuid)) {
          error(graph);
          return;
        }

        var movie = response && response.data && response.data.movieByContentUuid;
        if (!movie) {
          complete(null);
          return;
        }

        var userData = movie.userData || {};
        var statuses = userData.watchStatuses || {};
        complete({
          planned: Boolean(userData.isPlannedToWatch),
          watched: Boolean(statuses.watched && statuses.watched.value),
          notInterested: Boolean(statuses.notInterested && statuses.notInterested.value),
          rating: Number(userData.voting && userData.voting.value || 0)
        });
      }, error);
    }, error);
  }

  function findMutationResult(data) {
    function walk(value, depth) {
      if (!value || depth > 6) return null;
      if (Array.isArray(value)) {
        for (var i = 0; i < value.length; i++) {
          var arrayResult = walk(value[i], depth + 1);
          if (arrayResult) return arrayResult;
        }
        return null;
      }
      if (typeof value != 'object') return null;
      if (Object.prototype.hasOwnProperty.call(value, 'status') || Object.prototype.hasOwnProperty.call(value, 'error')) return value;
      for (var key in value) {
        var result = walk(value[key], depth + 1);
        if (result) return result;
      }
      return null;
    }

    return walk(data, 0);
  }

  function mutate(operationName, query, variables, complete, error) {
    ensureAccess(function () {
      graphql(operationName, query, variables, true, function (response) {
        var graph = graphError(response);
        if (graph) {
          error(graph);
          return;
        }

        var result = findMutationResult(response && response.data);
        if (!result) {
          error('Кинопоиск не вернул результат операции');
          return;
        }

        var status = String(result.status || '').toLowerCase();
        if (result.error && result.error.message) {
          error(result.error.message);
          return;
        }
        if (status && status != 'success' && status != 'ok' && status != 'true') {
          error('Операция отклонена: ' + status);
          return;
        }

        complete(result);
      }, error);
    }, error);
  }

  function syncItemStatus(item, status) {
    if (!item || !status) return;
    item.planned = Boolean(status.planned);
    item.watched = Boolean(status.watched);
    item.notInterested = Boolean(status.notInterested);
    item.myRating = Number(status.rating || 0);
    item.status = status;
    if (activeHome && activeHome.updateItem) activeHome.updateItem(item);
    if (activeCategory && activeCategory.updateItem) activeCategory.updateItem(item);
  }

  function searchTitle(value) {
    return normalizeText(value).toLowerCase().replace(/ё/g, 'е').replace(/[^a-zа-я0-9]+/gi, ' ').trim();
  }

  function isSeriesType(type) {
    return type == 'TvSeries' || type == 'TvShow' || type == 'MiniSeries' || type == 'Series';
  }

  function nativeCardScore(card, group, item) {
    var target = searchTitle(item.title);
    var titles = [card.title, card.name, card.original_title, card.original_name].map(searchTitle).filter(Boolean);
    var score = group.type == (item.type == 'TvSeries' ? 'tv' : 'movie') ? 30 : 0;
    var year = String(item.year || '');
    var cardYear = String(card.release_date || card.first_air_date || '').slice(0, 4);

    titles.forEach(function (title) {
      if (title == target) score = Math.max(score, 130);
      else if (title.indexOf(target) === 0 || target.indexOf(title) === 0) score = Math.max(score, 90);
      else if (title.indexOf(target) >= 0 || target.indexOf(title) >= 0) score = Math.max(score, 60);
    });
    if (year && cardYear == year) score += 35;
    return score;
  }

  function findNativeCard(groups, item) {
    var result = [];
    var preferred = isSeriesType(item.type) ? 'tv' : 'movie';
    var fallback = preferred == 'tv' ? 'movie' : 'tv';
    var preferredGroup = groups && groups[preferred];
    var keys = preferredGroup && Array.isArray(preferredGroup.results) && preferredGroup.results.length ? [preferred] : [fallback];

    keys.forEach(function (key) {
      var group = groups && groups[key];
      if (!group || !Array.isArray(group.results)) return;
      group.results.forEach(function (card) {
        if (!card || !card.id) return;
        result.push({card: card, group: group, score: nativeCardScore(card, group, item)});
      });
    });

    result.sort(function (a, b) {
      return b.score - a.score;
    });
    return result.length ? result[0] : null;
  }

  function pushNativeFull(item, found) {
    var card = found.card;
    var method = found.group.type == 'tv' || isSeriesType(item.type) ? 'tv' : 'movie';
    var nativeSource = 'tmdb';
    try {
      var currentSource = Lampa.Storage && Lampa.Storage.field && Lampa.Storage.field('source');
      if (currentSource == 'cub' || currentSource == 'tmdb') nativeSource = currentSource;
    } catch (e) {}
    item.nativeCard = card;
    Lampa.Activity.push({
      url: card.url || '',
      component: 'full',
      title: item.title,
      id: card.id,
      method: method,
      card: card,
      source: nativeSource,
      page: 1,
      my_kinopoisk_item: item
    });
  }

  function openNativeFull(item) {
    if (!item || !item.kpId || item.openingNativeFull) return;
    item.openingNativeFull = true;

    if (item.nativeCard && item.nativeCard.id) {
      pushNativeFull(item, {
        card: item.nativeCard,
        group: {type: isSeriesType(item.type) ? 'tv' : 'movie'}
      });
      item.openingNativeFull = false;
      return;
    }

    if (!Lampa.Api || !Lampa.Api.search) {
      item.openingNativeFull = false;
      notice('В Lampa недоступен поиск медиа');
      return;
    }

    try {
      Lampa.Api.search({query: encodeURIComponent(item.title)}, function (groups) {
        item.openingNativeFull = false;
        var found = findNativeCard(groups, item);
        if (!found) {
          notice('Не удалось сопоставить медиа с базой Lampa');
          return;
        }
        pushNativeFull(item, found);
      });
    } catch (e) {
      item.openingNativeFull = false;
      notice('Не удалось открыть страницу медиа');
    }
  }

  function nativeActionSpec(item, kind, value) {
    if (kind == 'planned') return value ? {operation: 'MovieSetPlannedToWatch', query: SET_PLANNED, variables: {movieId: item.kpId}} : {operation: 'MovieRemovePlannedToWatch', query: REMOVE_PLANNED, variables: {movieId: item.kpId}};
    if (kind == 'watched') return value ? {operation: 'MovieSetWatched', query: SET_WATCHED, variables: {kpId: item.kpId}} : {operation: 'MovieRemoveWatched', query: REMOVE_WATCHED, variables: {kpId: item.kpId}};
    if (kind == 'notInterested') return value ? {operation: 'MovieSetNotInterested', query: SET_NOT_INTERESTED, variables: {kpId: item.kpId}} : {operation: 'MovieRemoveNotInterested', query: REMOVE_NOT_INTERESTED, variables: {kpId: item.kpId}};
    return null;
  }

  function nativeActionIcon(action) {
    var paths = {
      rate: '<path d="M12 3.5l2.65 5.37 5.92.86-4.28 4.17 1.01 5.89L12 17.01l-5.3 2.78 1.01-5.89-4.28-4.17 5.92-.86L12 3.5z"></path>',
      planned: '<path d="M6.5 4.5h11v15l-5.5-3.25-5.5 3.25v-15z"></path>',
      watched: '<circle cx="12" cy="12" r="8.5"></circle><path d="M8.2 12.1l2.45 2.45 5.25-5.25"></path>',
      'not-interested': '<circle cx="12" cy="12" r="8.5"></circle><path d="M8.5 12h7"></path>'
    };
    return '<svg class="my-kp-full-action__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[action] || '') + '</svg>';
  }

  function nativeActionButton(action) {
    var labels = {
      rate: 'Оценить',
      planned: 'Буду смотреть',
      watched: 'Просмотрено',
      'not-interested': 'Неинтересно'
    };
    var label = labels[action] || '';
    return '<div class="full-start__button selector my-kp-full-action" data-static="true" data-my-kp-action="' + action + '" aria-label="' + escapeHtml(label) + '" title="' + escapeHtml(label) + '">' + nativeActionIcon(action) + '<span class="my-kp-full-action__label"></span></div>';
  }

  function updateNativeActions(state) {
    if (!state || !state.buttons) return;
    var status = state.status;
    var labels = {
      rate: status.rating ? 'Моя оценка: ' + status.rating : 'Оценить',
      planned: status.planned ? 'Буду смотреть ✓' : 'Буду смотреть',
      watched: status.watched ? 'Просмотрен ✓' : 'Просмотрено',
      notInterested: status.notInterested ? 'Убрать «Неинтересно»' : 'Неинтересно'
    };

    Object.keys(state.buttons).forEach(function (kind) {
      var button = state.buttons[kind];
      var active = kind == 'rate' ? Boolean(status.rating) : Boolean(status[kind]);
      button.find('.my-kp-full-action__label').text(labels[kind]);
      button.attr('aria-label', labels[kind]).attr('title', labels[kind]);
      button.toggleClass('my-kp-full-action--active', active).toggleClass('my-kp-full-action--busy', state.busy);
    });
  }

  function restoreNativeFocus(state, target) {
    setTimeout(function () {
      if (!state || !state.root || !state.root.length) return;
      try {
        var focus = target || state.last || state.buttons && state.buttons.rate && state.buttons.rate[0];
        Lampa.Controller.toggle('content');
        Lampa.Controller.collectionSet(state.root);
        if (focus) Lampa.Controller.collectionFocus(focus, state.root);
      } catch (e) {}
    }, 0);
  }

  function nativeToggleStatus(state, kind) {
    if (!state || state.busy || !activeAccount()) return;
    var value = !state.status[kind];
    var spec = nativeActionSpec(state.item, kind, value);
    if (!spec) return;

    state.busy = true;
    updateNativeActions(state);
    mutate(spec.operation, spec.query, spec.variables, function () {
      state.status[kind] = value;
      state.busy = false;
      syncItemStatus(state.item, state.status);
      updateNativeActions(state);
      restoreNativeFocus(state, state.buttons[kind] && state.buttons[kind][0]);
      notice(value ? 'Сохранено в Кинопоиске' : 'Изменение удалено в Кинопоиске');
    }, function (message) {
      state.busy = false;
      updateNativeActions(state);
      restoreNativeFocus(state, state.buttons[kind] && state.buttons[kind][0]);
      notice(errorText(message));
    });
  }

  function nativeSelectRating(state) {
    if (!state || state.busy || !activeAccount()) return;
    var options = [];
    for (var i = 1; i <= 10; i++) options.push({title: String(i), value: i, selected: state.status.rating == i});
    options.push({title: 'Не оценивать', value: 0, selected: !state.status.rating});

    Lampa.Select.show({
      title: 'Оценка Кинопоиска',
      items: options,
      onBack: function () {
        restoreNativeFocus(state);
      },
      onSelect: function (option) {
        restoreNativeFocus(state);
        var value = Number(option.value || 0);
        var spec = value ? {operation: 'MovieSetVote', query: SET_VOTE, variables: {kpId: state.item.kpId, rate: value}} : {operation: 'MovieRemoveVote', query: REMOVE_VOTE, variables: {kpId: state.item.kpId}};
        state.busy = true;
        updateNativeActions(state);
        mutate(spec.operation, spec.query, spec.variables, function () {
          state.status.rating = value;
          state.busy = false;
          syncItemStatus(state.item, state.status);
          updateNativeActions(state);
          restoreNativeFocus(state, state.buttons.rate && state.buttons.rate[0]);
          notice(value ? 'Оценка сохранена в Кинопоиске' : 'Оценка удалена в Кинопоиске');
        }, function (message) {
          state.busy = false;
          updateNativeActions(state);
          restoreNativeFocus(state, state.buttons.rate && state.buttons.rate[0]);
          notice(errorText(message));
        });
      }
    });
  }

  function attachNativeActions(event, attempt) {
    var object = event && event.object;
    var item = object && object.my_kinopoisk_item;
    if (!item || !activeAccount()) return;

    var root;
    try {
      root = $(event.body || object.activity.render());
    } catch (e) {
      root = $();
    }
    var container = root.find('.full-start-new__buttons').first();
    if (!container.length) {
      if ((attempt || 0) < 5) setTimeout(function () { attachNativeActions(event, (attempt || 0) + 1); }, 250);
      return;
    }
    if (object.myKpNativeActions) return;

    var state = {
      item: item,
      root: root,
      container: container,
      busy: false,
      last: null,
      status: {
        planned: Boolean(item.planned),
        watched: Boolean(item.watched),
        notInterested: Boolean(item.notInterested),
        rating: Number(item.myRating || 0)
      },
      buttons: {}
    };
    object.myKpNativeActions = state;

    container.append(nativeActionButton('rate'));
    container.append(nativeActionButton('planned'));
    container.append(nativeActionButton('watched'));
    container.append(nativeActionButton('not-interested'));
    state.buttons.rate = container.find('[data-my-kp-action="rate"]').last();
    state.buttons.planned = container.find('[data-my-kp-action="planned"]').last();
    state.buttons.watched = container.find('[data-my-kp-action="watched"]').last();
    state.buttons.notInterested = container.find('[data-my-kp-action="not-interested"]').last();

    state.buttons.rate.add(state.buttons.planned).add(state.buttons.watched).add(state.buttons.notInterested)
      .on('hover:focus', function () { state.last = this; })
      .on('hover:enter', function () {
        var action = $(this).attr('data-my-kp-action');
        if (action == 'rate') nativeSelectRating(state);
        else if (action == 'planned') nativeToggleStatus(state, 'planned');
        else if (action == 'watched') nativeToggleStatus(state, 'watched');
        else if (action == 'not-interested') nativeToggleStatus(state, 'notInterested');
      });
    updateNativeActions(state);

    queryMovieStatus(item, function (remoteStatus) {
      if (remoteStatus) {
        state.status = remoteStatus;
        syncItemStatus(item, state.status);
        updateNativeActions(state);
      }
    }, function () {});
  }

  function openExternal(url) {
    var opened = false;
    try {
      opened = Boolean(global.open(url, '_blank'));
    } catch (e) {}
    if (!opened) notice('Откройте ссылку: ' + url);
  }

  function ratingClass(value) {
    var rating = Number(value || 0);
    if (rating < 5) return 'red';
    if (rating < 7) return 'gray';
    if (rating < 8) return 'green';
    return 'gold';
  }

  function createCard(item) {
    var rating = item.rating ? '<span class="my-kp-card__rating my-kp-card__rating--' + ratingClass(item.rating) + '">' + escapeHtml(item.rating) + '</span>' : '';
    var bookmark = item.planned ? '<span class="my-kp-card__bookmark">★</span>' : '';
    var watched = item.watched ? '<span class="my-kp-card__watched">✓</span>' : '';
    var image = imageUrl(item.poster || item.cover, item.imageSize || '468x264');
    var imageMarkup = image ? '<img class="my-kp-card__image" data-src="' + escapeHtml(image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy" decoding="async">' : '<div class="my-kp-card__empty">●</div>';
    var card = $('<div class="my-kp-card selector" data-static="true"><div class="my-kp-card__view">' + imageMarkup + rating + bookmark + watched + '</div><div class="my-kp-card__title">' + escapeHtml(item.title) + '</div><div class="my-kp-card__meta">' + escapeHtml([item.year, isSeriesType(item.type) ? 'сериал' : ''].filter(Boolean).join(' · ')) + '</div></div>');
    card.data('my-kp-item', item);
    return card;
  }

  function appendCards(container, items) {
    if (!container || !container.length || !container[0]) return;
    var fragment = global.document.createDocumentFragment();
    (items || []).forEach(function (item) {
      var card = createCard(item);
      if (card && card[0]) fragment.appendChild(card[0]);
    });
    if (fragment.childNodes.length) container[0].appendChild(fragment);
  }

  function updateRowArrows(row) {
    if (!row || !row.length) return;
    var cards = row.find('.my-kp-row__cards')[0];
    if (!cards) return;
    var maximum = Math.max(0, cards.scrollWidth - cards.clientWidth);
    row.toggleClass('my-kp-row--has-left', cards.scrollLeft > 2);
    row.toggleClass('my-kp-row--has-right', cards.scrollLeft < maximum - 2);
  }

  function scrollRow(row, direction) {
    if (!row || !row.length) return;
    var cards = row.find('.my-kp-row__cards')[0];
    if (!cards) return;

    var maximum = Math.max(0, cards.scrollWidth - cards.clientWidth);
    var step = Math.max(220, cards.clientWidth * .82);
    var target = cards.scrollLeft + (direction == 'left' ? -step : step);
    target = Math.max(0, Math.min(maximum, target));
    $(cards).stop(true, false).animate({scrollLeft: target}, 180, function () {
      updateRowArrows(row);
    });
    updateRowArrows(row);
  }

  function bindRowScrollers(root) {
    if (!root || !root.length) return;

    root.find('.my-kp-row__cards').unbind('scroll.my-kp-row').on('scroll.my-kp-row', function () {
      updateRowArrows($(this).closest('.my-kp-row'));
      scheduleImageHydration($(this).closest('.my-kp-page'));
    });
    root.find('.my-kp-row').unbind('mouseenter.my-kp-row').on('mouseenter.my-kp-row', function () {
      updateRowArrows($(this));
    });
    root.find('.my-kp-row__arrow').unbind('click.my-kp-row').on('click.my-kp-row', function (event) {
      event.preventDefault();
      event.stopPropagation();
      scrollRow($(this).closest('.my-kp-row'), $(this).attr('data-my-kp-row-direction'));
    });
    root.find('.my-kp-row').each(function () {
      updateRowArrows($(this));
    });
    setTimeout(function () {
      if (!global.document.body.contains(root[0])) return;
      root.find('.my-kp-row').each(function () {
        updateRowArrows($(this));
      });
    }, 0);
  }

  function updateHero(hero, items, index) {
    var item = items[index] || items[0];
    if (!item || !hero || !hero.length) return;

    var heroImage = imageUrl(item.cover || item.poster, '1280x720');
    // Используем один источник hero-обложки. CSS-background и img
    // одновременно заставляли WebView декодировать одну картинку дважды.
    var heroBackImage = hero.find('.my-kp-hero__back-image');
    heroBackImage.toggleClass('hide', !heroImage);
    if (heroImage) heroBackImage.attr('src', heroImage);else heroBackImage.removeAttr('src');
    hero.find('.my-kp-hero__logo').toggleClass('hide', !item.logo).attr('src', item.logo || '');
    hero.find('.my-kp-hero__title').text(item.title || 'Кинопоиск');
    hero.find('.my-kp-hero__description').text(item.description || 'Персональная рекомендация Кинопоиска');
    hero.find('[data-my-kp-action="hero-open"]').data('my-kp-item', item);
    hero.find('.my-kp-hero__dots').html(items.map(function (_, dotIndex) {
      return '<span class="my-kp-hero__dot ' + (dotIndex == index ? 'my-kp-hero__dot--active' : '') + '"></span>';
    }).join(''));
  }

  function createHero(items, index) {
    var hero = $('<section class="my-kp-hero"><div class="my-kp-hero__back"><img class="my-kp-hero__back-image hide" alt=""></div><div class="my-kp-hero__content"><img class="my-kp-hero__logo hide" alt=""><div class="my-kp-hero__title"></div><div class="my-kp-hero__description"></div><div class="my-kp-hero__actions"><div class="my-kp-action my-kp-action--primary selector" data-static="true" data-my-kp-action="hero-open">Подробнее</div></div><div class="my-kp-hero__dots"></div></div>' + (items.length > 1 ? '<div class="my-kp-hero__nav my-kp-hero__prev selector" data-static="true" data-my-kp-action="hero-prev" aria-label="Назад">‹</div><div class="my-kp-hero__nav my-kp-hero__next selector" data-static="true" data-my-kp-action="hero-next" aria-label="Вперёд">›</div>' : '') + '</section>');
    updateHero(hero, items, index);
    return hero;
  }

  function openCategory(row) {
    if (!row) return;
    if (row.mode != 'planned' && !row.selectionId) return;
    Lampa.Activity.push({
      component: 'my_kinopoisk_category',
      title: row.title || 'Кинопоиск',
      url: '',
      page: 1,
      mode: row.mode || 'selection',
      selectionId: row.selectionId || '',
      selectionTitle: row.title || 'Кинопоиск'
    });
  }

  function createMoreCard(row) {
    var action = row.mode == 'planned' ? 'open-planned' : 'open-selection';
    var card = $('<div class="my-kp-more selector" data-static="true" data-my-kp-action="' + action + '" aria-label="Показать все"><div class="my-kp-more__arrow">→</div><div class="my-kp-more__title">Показать все</div></div>');
    card.data('my-kp-row', row);
    return card;
  }

  function createRow(row) {
    var section = $('<section class="my-kp-row"></section>');
    section.append('<div class="my-kp-row__title">' + escapeHtml(row.title) + '</div>');
    var cards = $('<div class="my-kp-row__cards"></div>');
    appendCards(cards, row.items || []);
    if (row.more || row.mode == 'planned') cards.append(createMoreCard(row));
    var viewport = $('<div class="my-kp-row__viewport"></div>');
    viewport.append(cards);
    viewport.append('<div class="my-kp-row__arrow my-kp-row__arrow--left" data-my-kp-row-direction="left" aria-label="Прокрутить назад">‹</div>');
    viewport.append('<div class="my-kp-row__arrow my-kp-row__arrow--right" data-my-kp-row-direction="right" aria-label="Прокрутить вперёд">›</div>');
    section.append(viewport);
    return section;
  }

  function createHomeState(title, text, action) {
    var state = $('<div class="my-kp-state"><div class="my-kp-state__title">' + escapeHtml(title) + '</div><div class="my-kp-state__text">' + escapeHtml(text || '') + '</div>' + (action ? '<div class="my-kp-action selector" data-static="true" data-my-kp-action="' + escapeHtml(action) + '">' + (action == 'signin' ? 'Открыть настройки' : 'Повторить') + '</div>' : '') + '</div>');
    return state;
  }

  function HomeComponent(object) {
    var self = this;
    var scroll;
    var root;
    var body;
    var destroyed = false;
    var homeModel = {hero: [], rows: [], planned: null};
    var heroIndex = 0;
    var lastFocus = null;
    var loadGeneration = 0;

    function showLoading() {
      if (body) body.empty().append(createHomeState('Загрузка Кинопоиска…', 'Получаем персональную витрину для выбранного аккаунта'));
    }

    function moveHeroFocus(direction) {
      if (!root) return false;
      var current = root.find('.my-kp-hero .selector.focus')[0];
      if (!current) return false;

      var action = $(current).attr('data-my-kp-action');
      var targetAction = '';
      if (action == 'hero-prev' && direction == 'right') targetAction = 'hero-next';
      if (action == 'hero-next' && direction == 'left') targetAction = 'hero-prev';
      if (action == 'hero-next' && direction == 'down') targetAction = 'hero-open';
      if (action == 'hero-open' && direction == 'left') targetAction = 'hero-prev';
      if (action == 'hero-open' && direction == 'right') targetAction = 'hero-next';

      if (targetAction) {
        var target = root.find('[data-my-kp-action="' + targetAction + '"]')[0];
        if (target) Lampa.Controller.collectionFocus(target, root);
        return Boolean(target);
      }

      if (action == 'hero-next' && direction == 'right') return true;
      return false;
    }

    function updateCard(item) {
      if (!root) return;
      root.find('.my-kp-card').each(function () {
        var card = $(this);
        var data = card.data('my-kp-item');
        if (!data || data.kpId != item.kpId) return;
        card.find('.my-kp-card__bookmark').remove();
        card.find('.my-kp-card__watched').remove();
        if (item.planned) card.find('.my-kp-card__view').append('<span class="my-kp-card__bookmark">★</span>');
        if (item.watched) card.find('.my-kp-card__view').append('<span class="my-kp-card__watched">✓</span>');
      });
    }

    function bindHome() {
      bindScope(root, function (event) {
        var target = $(event.target);
        var actionable = target.closest('[data-my-kp-action]');
        if (actionable.length) target = actionable;
        var action = target.attr('data-my-kp-action');

        if (action == 'signin') {
          openSettings();
          return;
        }
        if (action == 'retry') {
          reload();
          return;
        }
        if (action == 'hero-prev' || action == 'hero-next') {
          if (!homeModel.hero.length) return;
          heroIndex = action == 'hero-next' ? (heroIndex + 1) % homeModel.hero.length : (heroIndex - 1 + homeModel.hero.length) % homeModel.hero.length;
          var hero = body.find('.my-kp-hero');
          updateHero(hero, homeModel.hero, heroIndex);
          focusInScope(root, target[0]);
          return;
        }

        if (action == 'open-selection' || action == 'open-planned') {
          var row = target.data('my-kp-row');
          if (!row) row = {
            mode: action == 'open-planned' ? 'planned' : 'selection',
            selectionId: target.attr('data-selection-id') || '',
            title: target.attr('data-selection-title') || 'Кинопоиск'
          };
          openCategory(row);
          return;
        }

        var item = target.data('my-kp-item') || target.closest('.my-kp-card').data('my-kp-item');
        if (item) openNativeFull(item);
      }, function (element) {
        lastFocus = element;
        if (scroll) {
          scroll.update($(element), true);
          var horizontal = $(element).closest('.my-kp-row__cards')[0];
          if (horizontal) horizontal.scrollLeft = element.offsetLeft - horizontal.clientWidth / 2 + element.offsetWidth / 2;
        }
        hydrateImages(root);
      });
      bindRowScrollers(root);
    }

    function renderHome() {
      if (destroyed) return;
      body.empty();

      if (!activeAccount()) {
        body.append(createHomeState('Войдите в Кинопоиск', 'Добавьте аккаунт в разделе «Мой Кинопоиск», чтобы увидеть персональную витрину', 'signin'));
        bindHome();
        focusInScope(root, lastFocus);
        return;
      }

      var parsed = parseHomeRows(homeModel.raw || []);
      // После нормализации карточек исходный ответ больше не нужен. На TV
      // это освобождает большой граф объектов и снижает паузы сборщика мусора.
      homeModel.raw = null;
      body.empty();
      if (parsed.hero.length) body.append(createHero(parsed.hero, heroIndex));
      if (homeModel.planned && homeModel.planned.items && homeModel.planned.items.length) {
        var plannedItems = homeModel.planned.items.slice(0, 10);
        body.append(createRow({
          id: 'planned-to-watch',
          title: 'Вы хотели посмотреть',
          type: 'planned',
          mode: 'planned',
          items: plannedItems,
          more: true
        }));
      }
      parsed.rows.forEach(function (row) {
        body.append(createRow(row));
      });
      homeModel.hero = parsed.hero;
      homeModel.rows = parsed.rows;

      if (!parsed.hero.length && !parsed.rows.length && !(homeModel.planned && homeModel.planned.items && homeModel.planned.items.length)) {
        body.append(createHomeState('Нет доступных подборок', 'Кинопоиск не вернул медиа для выбранного аккаунта', 'retry'));
      }

      bindHome();
      hydrateImages(root);
      focusInScope(root, lastFocus);
    }

    function showError(message) {
      if (destroyed) return;
      body.empty().append(createHomeState('Не удалось загрузить Кинопоиск', message || 'Проверьте соединение и попробуйте ещё раз', 'retry'));
      bindHome();
      focusInScope(root, false);
    }

    function reload() {
      if (destroyed) return;
      var generation = ++loadGeneration;
      heroIndex = 0;
      homeModel.planned = null;
      showLoading();
      if (self.activity) self.activity.loader(true);

      if (!activeAccount()) {
        if (self.activity) self.activity.loader(false);
        renderHome();
        return;
      }

      function finishHome() {
        if (destroyed) return;
        if (self.activity) self.activity.loader(false);
        renderHome();
      }

      loadHome(function (rows) {
        if (destroyed || generation != loadGeneration) return;
        homeModel.raw = rows;
        loadPlannedPage(0, function (page) {
          if (destroyed || generation != loadGeneration) return;
          homeModel.planned = page;
          finishHome();
        }, function () {
          if (destroyed || generation != loadGeneration) return;
          homeModel.planned = {items: [], offset: 0, limit: 20, total: 0, hasMore: false};
          finishHome();
        });
      }, function (message) {
        if (destroyed || generation != loadGeneration) return;
        if (self.activity) self.activity.loader(false);
        showError(errorText(message));
      });
    }

    this.create = function () {
      scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
      scroll.minus();
      root = scroll.render();
      root.addClass('my-kp-page my-kp-home');
      body = scroll.body();
      scroll.onScroll = function () {
        scheduleImageHydration(root);
      };
      activeHome = self;
      showLoading();
      reload();
    };

    this.render = function (js) {
      return js ? root[0] : root;
    };

    this.start = function () {
      Lampa.Controller.add('content', {
        invisible: true,
        toggle: function () {
          focusInScope(root, lastFocus);
        },
        right: function () {
          if (moveHeroFocus('right')) return;
          moveInScope(root, 'right', scroll);
        },
        left: function () {
          if (moveHeroFocus('left')) return;
          moveInScope(root, 'left', scroll, function () {
            if (Lampa.Menu) Lampa.Menu.open();
          });
        },
        up: function () {
          moveInScope(root, 'up', scroll, function () {
            Lampa.Controller.toggle('head');
          });
        },
        down: function () {
          if (moveHeroFocus('down')) return;
          moveInScope(root, 'down', scroll);
        },
        back: function () {
          Lampa.Activity.backward();
        }
      });
      Lampa.Controller.toggle('content');
    };

    this.updateItem = updateCard;
    this.reload = reload;

    this.destroy = function () {
      destroyed = true;
      loadGeneration += 1;
      if (activeHome === self) activeHome = null;
      unobserveImages(root);
      if (scroll) scroll.destroy();
    };
  }

  function CategoryComponent(object) {
    object = object || {};
    var self = this;
    var scroll;
    var root;
    var body;
    var grid;
    var footer;
    var destroyed = false;
    var mode = object.mode || 'selection';
    var selectionId = String(object.selectionId || '');
    var title = object.selectionTitle || object.title || 'Кинопоиск';
    var pageLimit = mode == 'planned' ? 20 : 50;
    var model = {offset: 0, hasMore: true, loading: false, items: []};
    var lastFocus = null;
    var loadGeneration = 0;

    function getScrollElement() {
      if (!root || !root.length) return null;
      var candidates = [root[0], root.find('.scroll__content')[0]];
      var best = candidates[0];
      candidates.forEach(function (element) {
        if (!element) return;
        if (!best || element.scrollHeight - element.clientHeight > best.scrollHeight - best.clientHeight) best = element;
      });
      return best;
    }

    function checkEnd() {
      var threshold = 320;
      if (scroll && scroll.vieport) {
        var viewport = scroll.vieport();
        var remaining = Number(viewport.body || 0) - Number(viewport.content || 0) - Math.abs(Number(viewport.position || 0));
        if (remaining <= threshold) loadNext();
        return;
      }
      var element = getScrollElement();
      if (!element) return;
      threshold = Math.max(320, Math.min(520, element.clientHeight * .35));
      if (element.scrollTop + element.clientHeight >= element.scrollHeight - threshold) loadNext();
    }

    function updateCard(item) {
      if (!root) return;
      root.find('.my-kp-card').each(function () {
        var card = $(this);
        var data = card.data('my-kp-item');
        if (!data || data.kpId != item.kpId) return;
        card.find('.my-kp-card__bookmark').remove();
        card.find('.my-kp-card__watched').remove();
        if (item.planned) card.find('.my-kp-card__view').append('<span class="my-kp-card__bookmark">★</span>');
        if (item.watched) card.find('.my-kp-card__view').append('<span class="my-kp-card__watched">✓</span>');
        card.data('my-kp-item', item);
      });
    }

    function bindCategory() {
      bindScope(root, function (event) {
        var target = $(event.target);
        var actionable = target.closest('[data-my-kp-action]');
        if (actionable.length) target = actionable;
        var action = target.attr('data-my-kp-action');

        if (action == 'category-back') {
          Lampa.Activity.backward();
          return;
        }

        var item = target.data('my-kp-item') || target.closest('.my-kp-card').data('my-kp-item');
        if (item) openNativeFull(item);
      }, function (element) {
        lastFocus = element;
        if (scroll) scroll.update($(element), true);
        hydrateImages(root);
        checkEnd();
      });
    }

    function buildShell() {
      body.empty();
      var header = $('<div class="my-kp-category__header"><div class="my-kp-category__back selector" data-static="true" data-my-kp-action="category-back" aria-label="Назад">‹</div><div class="my-kp-category__title"></div></div>');
      header.find('.my-kp-category__title').text(title);
      grid = $('<div class="my-kp-category__grid"></div>');
      footer = $('<div class="my-kp-category__footer"></div>');
      body.append(header, grid, footer);
      bindCategory();
    }

    function appendPage(page) {
      var existing = {};
      var newItems = [];
      model.items.forEach(function (item) { existing[item.kpId] = true; });
      grid.find('.my-kp-state').remove();

      (page.items || []).forEach(function (item) {
        if (!item || existing[item.kpId]) return;
        existing[item.kpId] = true;
        model.items.push(item);
        newItems.push(item);
      });
      appendCards(grid, newItems);

      var pageOffset = Number(page.offset);
      if (isNaN(pageOffset)) pageOffset = model.offset;
      var receivedLimit = Number(page.limit) || pageLimit;
      model.offset = pageOffset + receivedLimit;
      model.hasMore = Boolean(page.hasMore);
      footer.text(model.hasMore ? ' ' : '');

      if (!model.items.length && !model.hasMore) {
        grid.append(createHomeState('Список пуст', mode == 'planned' ? 'В «Вы хотели посмотреть» пока ничего нет' : 'В этой подборке нет доступных медиа'));
      }

      bindCategory();
      hydrateImages(root);
      focusInScope(root, lastFocus);
      checkEnd();
    }

    function showError(message) {
      model.loading = false;
      model.hasMore = false;
      if (self.activity) self.activity.loader(false);
      if (!model.items.length) {
        grid.find('.my-kp-state').remove();
        grid.append(createHomeState('Не удалось загрузить подборку', errorText(message)));
      }
      footer.text(errorText(message));
      bindCategory();
      focusInScope(root, lastFocus);
    }

    function loadNext() {
      if (destroyed || model.loading || !model.hasMore) return;
      var generation = loadGeneration;
      model.loading = true;
      footer.text('Загрузка…');

      var complete = function (page) {
        if (destroyed || generation != loadGeneration) return;
        model.loading = false;
        if (self.activity) self.activity.loader(false);
        appendPage(page);
      };
      var error = function (message) {
        if (destroyed || generation != loadGeneration) return;
        showError(message);
      };

      if (mode == 'planned') loadPlannedPage(model.offset, complete, error);
      else loadSelectionPage(selectionId, model.offset, complete, error);
    }

    this.create = function () {
      scroll = new Lampa.Scroll({mask: true, over: true, step: 250});
      scroll.minus();
      root = scroll.render();
      root.addClass('my-kp-page my-kp-category');
      body = scroll.body();
      activeCategory = self;
      buildShell();
      scroll.onScroll = function () {
        checkEnd();
        scheduleImageHydration(root);
      };
      scroll.onEnd = loadNext;
      root.on('scroll.my-kp-category', function () {
        checkEnd();
        scheduleImageHydration(root);
      });
      root.find('.scroll__content').on('scroll.my-kp-category', function () {
        checkEnd();
        scheduleImageHydration(root);
      });
      if (self.activity) self.activity.loader(true);
      loadNext();
    };

    this.render = function (js) {
      return js ? root[0] : root;
    };

    this.start = function () {
      Lampa.Controller.add('content', {
        invisible: true,
        toggle: function () {
          focusInScope(root, lastFocus);
        },
        right: function () {
          moveInScope(root, 'right', scroll);
        },
        left: function () {
          moveInScope(root, 'left', scroll, function () {
            if (Lampa.Menu) Lampa.Menu.open();
          });
        },
        up: function () {
          moveInScope(root, 'up', scroll, function () {
            Lampa.Controller.toggle('head');
          });
        },
        down: function () {
          moveInScope(root, 'down', scroll, checkEnd);
        },
        back: function () {
          Lampa.Activity.backward();
        }
      });
      Lampa.Controller.toggle('content');
    };

    this.updateItem = updateCard;

    this.reload = function () {
      if (destroyed) return;
      loadGeneration += 1;
      model.offset = 0;
      model.hasMore = true;
      model.loading = false;
      model.items = [];
      buildShell();
      if (self.activity) self.activity.loader(true);
      loadNext();
    };

    this.destroy = function () {
      destroyed = true;
      loadGeneration += 1;
      if (activeCategory === self) activeCategory = null;
      if (root) root.off('.my-kp-category');
      unobserveImages(root);
      if (scroll) scroll.destroy();
    };
  }

  function renderSettings(body) {
    currentSettingsBody = body;
    // Settings.Component передаёт сюда внешний .scroll. Нельзя очищать его:
    // Controller.settings_component хранит внутренний шаблон component как
    // коллекцию фокуса. Ищем именно этот дочерний узел и рендерим в него.
    var root = body && body.find ? body.find('.scroll__body').first().children().first() : null;
    if (!root || !root.length) root = body;
    if (!root || !root.length) return;
    root.empty();
    root.append('<div class="my-kp-settings"><div class="my-kp-settings__caption">Аккаунты Кинопоиска</div><div class="my-kp-settings__note">Авторизованные аккаунты переключаются сразу. Новый вход выполняется кодом на странице Кинопоиска.</div><div class="my-kp-settings__accounts"></div><div class="my-kp-settings__new selector" data-static="true">+ Новый</div></div>');

    var accounts = getAccounts();
    var list = root.find('.my-kp-settings__accounts');
    if (!accounts.length) list.append('<div class="my-kp-settings__note">Нет авторизованных аккаунтов</div>');

    accounts.forEach(function (account) {
      var row = $('<div class="settings-param selector my-kp-account" data-static="true"></div>');
      row.attr('data-account-id', account.id);
      row.append('<div class="settings-param__name">' + escapeHtml(accountName(account)) + (String(account.id) == String(storageGet(STORAGE_ACTIVE, '')) ? '<span class="my-kp-account__mark">активен</span>' : '') + '</div>');
      if (account.email && account.email != accountName(account)) row.append('<div class="settings-param__descr">' + escapeHtml(account.email) + '</div>');
      list.append(row);
    });

    root.find('.my-kp-account').unbind('hover:enter').on('hover:enter', function () {
      openAccountActions($(this).attr('data-account-id'));
    });
    root.find('.my-kp-settings__new').unbind('hover:enter').on('hover:enter', startLogin);
  }

  function restoreSettings() {
    if (currentSettingsBody && currentSettingsBody.length) renderSettings(currentSettingsBody);
    setTimeout(function () {
      try {
        Lampa.Controller.toggle('settings_component');
      } catch (e) {}
    }, 0);
  }

  function openSettings() {
    try {
      if ($('body').hasClass('settings--open')) Lampa.Settings.create('my_kinopoisk');else {
        Lampa.Controller.toggle('settings');
        setTimeout(function () {
          try {
            Lampa.Settings.create('my_kinopoisk');
          } catch (e) {}
        }, 60);
      }
    } catch (e) {
      notice('Не удалось открыть настройки Кинопоиска');
    }
  }

  function openAccountActions(id) {
    var account = getAccounts().find(function (item) {
      return String(item.id) == String(id);
    });
    if (!account) return;

    Lampa.Select.show({
      title: accountName(account),
      items: [{title: 'Войти', value: 'login'}, {title: 'Забыть', value: 'forget'}],
      onBack: restoreSettings,
      onSelect: function (option) {
        if (option.value == 'login') {
          setActiveAccount(account.id);
          notice('Аккаунт Kinopoisk выбран');
          restoreSettings();
          if (activeHome && activeHome.reload) activeHome.reload();
        } else if (option.value == 'forget') {
          Lampa.Controller.toggle('settings_component');
          confirmForget(account);
        }
      }
    });
  }

  function confirmForget(account) {
    var html = $('<div class="my-kp-auth"><div>Удалить локально сохранённый токен аккаунта <b></b>?</div></div>');
    html.find('b').text(accountName(account));
    Lampa.Modal.open({
      title: 'Забыть аккаунт?',
      html: html,
      size: 'small',
      buttons: [{
        name: 'Забыть',
        onSelect: function () {
          removeAccount(account.id);
          Lampa.Modal.close();
          notice('Аккаунт удалён из Lampa');
          restoreSettings();
          if (activeHome && activeHome.reload) activeHome.reload();
        }
      }, {
        name: 'Отмена',
        onSelect: function () {
          Lampa.Modal.close();
          restoreSettings();
        }
      }],
      onBack: function () {
        Lampa.Modal.close();
        restoreSettings();
      }
    });
  }

  function copyCode(code) {
    try {
      if (Lampa.Utils && Lampa.Utils.copyTextToClipboard) {
        Lampa.Utils.copyTextToClipboard(code, function () {
          notice('Код скопирован');
        }, function () {
          notice('Код: ' + code);
        });
        return;
      }
    } catch (e) {}
    notice('Код: ' + code);
  }

  function closeAuth(state) {
    if (!state) return;
    state.cancelled = true;
    if (state.timer) clearTimeout(state.timer);
    if (authSession === state) authSession = null;
    try {
      Lampa.Modal.close();
    } catch (e) {}
    restoreSettings();
  }

  function finishAuth(account, state) {
    if (state.cancelled) return;
    var accounts = getAccounts();
    var index = accounts.findIndex(function (item) {
      return account.email && item.email && item.email.toLowerCase() == account.email.toLowerCase();
    });
    if (index >= 0) {
      account.id = accounts[index].id;
      account.createdAt = accounts[index].createdAt || account.createdAt;
      accounts[index] = account;
    } else accounts.push(account);
    saveAccounts(accounts);
    setActiveAccount(account.id);
    state.cancelled = true;
    if (state.timer) clearTimeout(state.timer);
    if (authSession === state) authSession = null;
    try {
      Lampa.Modal.close();
    } catch (e) {}
    notice('Аккаунт Kinopoisk авторизован');
    restoreSettings();
    if (activeHome && activeHome.reload) activeHome.reload();
  }

  function completeAuthToken(tokenData, state) {
    if (!tokenData || !tokenData.access_token || state.cancelled) return;
    state.finished = true;
    if (state.timer) clearTimeout(state.timer);
    state.setStatus('Авторизация подтверждена. Получаем профиль…');

    var account = {
      id: randomId(),
      email: '',
      title: 'Аккаунт Kinopoisk',
      deviceId: state.deviceId,
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token || '',
      socialAlias: '',
      kpId: '',
      socialAliasResolved: false,
      userId: tokenData.user_id || tokenData.uid || '',
      expiresAt: Date.now() + Number(tokenData.expires_in || 3600) * 1000 - 5000,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    function finishNewAccount(profile) {
      if (state.cancelled) return;
      var label = profile && (profile.default_email || profile.email || profile.login || '');
      var profileId = profile && (profile.id || profile.uid || profile.puid || '');
      if (profileId && typeof profileId != 'object') account.userId = String(profileId);
      account.email = label;
      account.title = label || account.title;

      queryProfileIdentifiers(account, function (identifiers) {
        if (state.cancelled) return;
        applyProfileIdentifiers(account, identifiers);
        finishAuth(account, state);
      }, function () {
        finishAuth(account, state);
      });
    }

    requestGet('https://login.yandex.ru/info?format=json', {
      Accept: 'application/json',
      Authorization: 'OAuth ' + account.accessToken
    }, function (profile) {
      finishNewAccount(profile);
    }, function () {
      finishNewAccount(null);
    });
  }

  function scheduleDevicePoll(state, seconds) {
    if (!state || state.cancelled || state.finished) return;
    if (state.timer) clearTimeout(state.timer);

    var delay = Math.max(1, Number(seconds || state.interval || 5));
    state.timer = setTimeout(function () {
      state.timer = null;
      pollDevice(state);
    }, delay * 1000);
  }

  function isHiddenDevicePendingError(error) {
    var data = errorPayload(error) || {};
    if (data.error || data.code || data.error_description) return false;

    var text = errorText(error);
    return Number(error && (error.status || error.statusCode)) == 400 || /invalid response from server[\s\S]*400[\s\S]*bad request/i.test(text);
  }

  function pollDevice(state) {
    if (authSession !== state || state.cancelled || state.finished) return;
    if (Date.now() > state.expiresAt) {
      state.setStatus('Срок действия кода истёк. Запустите вход ещё раз.');
      return;
    }

    requestForm(OAUTH_URL + '/token', {
      grant_type: 'device_code',
      code: state.deviceCode,
      client_id: DEVICE_CLIENT_ID,
      client_secret: DEVICE_CLIENT_SECRET
    }, function (data) {
      if (authSession !== state || state.cancelled) return;
      if (data && data.access_token) {
        completeAuthToken(data, state);
        return;
      }
      var code = data && (data.error || data.code);
      if (code == 'authorization_pending' || code == 'pending') {
        state.setStatus('Ожидаем подтверждение на странице Кинопоиска…');
        scheduleDevicePoll(state);
      } else if (code == 'slow_down') {
        state.interval = Number(state.interval || 5) + 5;
        scheduleDevicePoll(state);
      } else {
        state.setStatus('Авторизация не завершена: ' + (data && (data.error_description || data.error) || 'неизвестный ответ'));
      }
    }, function (requestError) {
      if (authSession !== state || state.cancelled) return;
      var data = errorPayload(requestError) || {};
      var code = data.error || data.code;
      if (code == 'authorization_pending' || code == 'pending') {
        state.setStatus('Ожидаем подтверждение на странице Кинопоиска…');
        scheduleDevicePoll(state);
      } else if (code == 'slow_down') {
        state.interval = Number(state.interval || 5) + 5;
        scheduleDevicePoll(state);
      } else if (code == 'expired_token') {
        state.setStatus('Срок действия кода истёк. Запустите вход ещё раз.');
      } else if (code == 'access_denied') {
        state.setStatus('Вход отменён в Яндекс ID.');
      } else if (isHiddenDevicePendingError(requestError)) {
        // Android TV's native HTTP bridge may discard the JSON body of the
        // normal HTTP 400 authorization_pending response. Keep polling so
        // the login can finish after the user confirms the device code.
        state.setStatus('Ожидаем подтверждение на странице Кинопоиска…');
        scheduleDevicePoll(state);
      } else {
        state.setStatus('Ошибка авторизации: ' + errorText(requestError));
      }
    });
  }

  function startLogin() {
    if (authSession) return;
    var deviceId = getDeviceId();
    requestForm(OAUTH_URL + '/device/code', {
      client_id: DEVICE_CLIENT_ID,
      device_id: deviceId
    }, function (data) {
      if (!data || !data.device_code || !data.user_code) {
        notice('Кинопоиск не выдал код авторизации');
        return;
      }

      var verificationUrl = data.verification_url || data.verification_uri || 'https://ya.ru/device';
      var state = {
        deviceId: deviceId,
        deviceCode: data.device_code,
        expiresAt: Date.now() + Number(data.expires_in || 300) * 1000,
        interval: Number(data.interval || 5),
        timer: null,
        cancelled: false,
        finished: false,
        box: null,
        setStatus: function (value) {
          if (state.box) state.box.find('.my-kp-auth__status').text(value);
        }
      };
      var box = $('<div class="my-kp-auth"><div>Откройте ссылку на устройстве или компьютере и введите код:</div><div class="my-kp-auth__code"></div><div class="my-kp-auth__url selector" data-static="true"></div><div class="my-kp-auth__status">Ожидаем подтверждение…</div></div>');
      box.find('.my-kp-auth__code').text(data.user_code);
      box.find('.my-kp-auth__url').text(verificationUrl);
      state.box = box;
      authSession = state;

      Lampa.Modal.open({
        title: 'Вход в Кинопоиск',
        html: box,
        size: 'small',
        buttons: [{
          name: 'Скопировать код',
          onSelect: function () { copyCode(data.user_code); }
        }, {
          name: 'Отмена',
          onSelect: function () { closeAuth(state); }
        }],
        onSelect: function (target) {
          if ($(target).hasClass('my-kp-auth__url')) openExternal(verificationUrl);
        },
        onBack: function () { closeAuth(state); }
      });
      // Yandex returns the minimum polling interval with the device code.
      // The first token request must wait for it as well.
      scheduleDevicePoll(state);
    }, function (requestError) {
      notice('Не удалось получить код: ' + errorText(requestError));
    });
  }

  function openHome() {
    if (!activeAccount()) {
      openSettings();
      return;
    }
    Lampa.Activity.push({
      component: 'my_kinopoisk',
      title: 'Мой Кинопоиск',
      url: '',
      page: 1
    });
  }

  var MENU_ICON = '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="12" stroke="white" stroke-width="2.5"/><path d="M10 13h12M10 17h12M10 21h8" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>';
  var SETTINGS_ICON = '<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="19" cy="19" r="14" stroke="white" stroke-width="2.5"/><path d="M12 17.5h14M12 22h9" stroke="white" stroke-width="2.5" stroke-linecap="round"/></svg>';

  function enforceMenuPlacement(button, scope) {
    if (!button || !button.length || !scope || !scope.length) return false;

    var main = scope.find('[data-action="main"]').first();
    if (!main.length) return false;

    if (button[0] != main[0] && button.prev()[0] != main[0]) button.insertAfter(main);

    // Редактор меню Lampa восстанавливает порядок из menu_sort с задержкой.
    // Сохраняем уже исправленный DOM-порядок, иначе старое значение с плагином
    // в конце снова вернёт его туда после перезагрузки меню.
    var items = scope.children('.menu__item');
    if (!items.length) items = scope.find('.menu__item');
    var order = [];
    items.each(function () {
      var title = $(this).find('.menu__text').first().text().trim();
      if (title && order.indexOf(title) < 0) order.push(title);
    });
    if (order.length) storageSet('menu_sort', order);
    return true;
  }

  function installMenu(body) {
    if (!Lampa.Menu || !Lampa.Menu.addButton) return false;
    var root = body ? $(body) : null;
    if (!root || !root.length) {
      try { root = $(Lampa.Menu.render()); } catch (e) { root = $('.menu').first(); }
    }
    if (!root || !root.length) return false;

    var list = root.find('.menu__list').first();
    if (!list.length && root.hasClass('menu__list')) list = root;
    if (!list.length) {
      try { list = $(Lampa.Menu.render()).find('.menu__list').first(); } catch (e) {}
    }

    var scope = list.length ? list : root;
    var button = scope.find('[data-action="' + MENU_ACTION + '"]').first();
    if (!button.length && scope[0] != root[0]) button = root.find('[data-action="' + MENU_ACTION + '"]').first();

    if (!button.length) {
      try {
        button = Lampa.Menu.addButton(MENU_ICON, 'Мой Кинопоиск', openHome);
      } catch (e) {
        return false;
      }
    }

    button.attr('data-action', MENU_ACTION);
    if (!enforceMenuPlacement(button, scope)) {
      var fallbackMain = root.find('[data-action="main"]').first();
      if (fallbackMain.length && button.length && button[0] != fallbackMain[0] && button.prev()[0] != fallbackMain[0]) button.insertAfter(fallbackMain);
    }

    if (menuOrderTimer) clearTimeout(menuOrderTimer);
    menuOrderTimer = setTimeout(function () {
      if (!button.length || !global.document || !global.document.body || !global.document.body.contains(button[0])) return;
      var currentList = button.closest('.menu__list');
      enforceMenuPlacement(button, currentList.length ? currentList : scope);
    }, 3000);
    return true;
  }

  function updateSettingsMain() {
    try {
      var main = Lampa.Settings && Lampa.Settings.main && Lampa.Settings.main();
      if (main && main.update) main.update();
    } catch (e) {}
  }

  function registerSettings() {
    if (settingsRegistered || !Lampa.SettingsApi || !Lampa.SettingsApi.addComponent) return;
    Lampa.SettingsApi.addComponent({
      component: 'my_kinopoisk',
      name: 'Мой Кинопоиск',
      icon: SETTINGS_ICON,
      before: 'interface'
    });
    settingsRegistered = true;
  }

  function bindGlobalListeners() {
    if (globalListenersRegistered) return;
    if (!Lampa.Listener || !Lampa.Listener.follow) return;

    Lampa.Listener.follow('menu', function (event) {
      if (event.type == 'start') installMenu(event.body);
      if (event.type == 'action' && event.action == MENU_ACTION) {
        if (event.abort) event.abort();
      }
    });

    Lampa.Listener.follow('app', function (event) {
      if (event.type == 'ready') {
        installMenu();
        updateSettingsMain();
      }
    });

    Lampa.Listener.follow('full', function (event) {
      if (event.type == 'complite') attachNativeActions(event, 0);
    });

    Lampa.Listener.follow('activity', function (event) {
      if (event.component == 'full' && event.type == 'create' && event.object && event.object.my_kinopoisk_item) {
        setTimeout(function () { attachNativeActions({object: event.object}, 0); }, 250);
      }
    });

    if (Lampa.Settings && Lampa.Settings.listener && Lampa.Settings.listener.follow) {
      Lampa.Settings.listener.follow('open', function (event) {
        if (event.name == 'my_kinopoisk') renderSettings(event.body);
      });
    }

    globalListenersRegistered = true;
  }

  function registerComponents() {
    if (!Lampa.Component || !Lampa.Component.add) return;
    if (!Lampa.Component.get('my_kinopoisk')) Lampa.Component.add('my_kinopoisk', HomeComponent);
    if (!Lampa.Component.get('my_kinopoisk_category')) Lampa.Component.add('my_kinopoisk_category', CategoryComponent);
  }

  function boot() {
    addStyle();
    registerSettings();
    registerComponents();
    bindGlobalListeners();
    installMenu();
    updateSettingsMain();
  }

  boot();
})(window);
