const colors = {
  white: "#FCFCFC",
  black: "#171717",
  grey: "#333333",
  blueHighlight: "#108ee9",
  greyHighlight: "#aaa",

  mainBackground: "#FFFFFF",

  secondaryBackground: "#F2F3F5",
  // secondaryBackground: "#FCFCFC",


  mainText: "#171717",
  secondaryText: "#aaa",

  mainAccent: "#f76600",
  mainAccentDark: "#d15600",
  secondaryAccent: "#B4EC51"

  // mainBackground: "#202124",
  // secondaryBackground: "#FCFCFC",
  //
  // mainText: "#fafafa",
  // secondaryText: "#5f6368",
  //
  // mainAccent: "#1D9696",
  // secondaryAccent: "#B4EC51",
};

export const layout = {
  paddingHorizontal: "24px",
  paddingHorizInt: 24,
  paddingVertical: "24px",
  paddingVertInt: 24,
  sideBarWidth: 200,
  sidebarCollapsedWidth: 80,
  topBarHeight: "48px",
  topBariHeightInt: 48,
  outerPadding: "16px",
  outerPaddingInt: 16,
  maxWrapperWidthInt: 1280,
  maxBlogPostWidthInt: 300,
  sidebarGoneWidth: 768,
  sidebarExpandedWidth: 992,
  individualAboveHeightInt: 300,
  colWidth: 100,
  mobileColWidth: 50,
};

export default {
  DefaultNumTableItems: 100,
  defaultMinShotsGraph: 50,
  layout: {
    paddingHorizontal: layout.paddingHorizontal,
    paddingHorizInt: layout.paddingHorizInt,
    sideBarWidth: layout.sideBarWidth,
    sidebarCollapsedWidth: layout.sidebarCollapsedWidth,
    topBarHeight: layout.topBarHeight,
    topBariHeightInt: layout.topBariHeightInt,
    outerPadding: layout.outerPadding,
    outerPaddingInt: layout.outerPaddingInt,
    paddingVertical: layout.paddingVertical,
    paddingVertInt: layout.paddingVertInt,
    maxWrapperWidthInt: layout.maxWrapperWidthInt,
    maxBlogPostWidthInt: layout.maxBlogPostWidthInt,
    sidebarGoneWidth: layout.sidebarGoneWidth,
    sidebarExpandedWidth: layout.sidebarExpandedWidth,
    individualAboveHeightInt: layout.individualAboveHeightInt,
    mobileColWidth: layout.mobileColWidth,
    colWidth: layout.colWidth,
  },
  dimensions: {
    subSection: {
      margin: "0 auto"
    },
    portfolioHeader: {
      height: "550px"
    },
    navbar: {
      height: "64px",
      margin: "0 auto"
    },
    button: {
      largeHeight: "48px",
      smallHeight: "32px"
    },
    maxWidth: "920px"
  },
  colors: {
    primary: colors.blue,
    linkColor: colors.blue,
    primaryHover: colors.yellowGreen,
    text: {
      black: colors.black /* base */,
      white: colors.white
    },
    mainBackground: colors.mainBackground,
    secondaryBackground: colors.secondaryBackground,
    mainText: colors.mainText,
    secondaryText: colors.secondaryText,
    mainAccent: colors.mainAccent,
    mainAccentDark: colors.mainAccentDark,
    secondaryAccent: colors.secondaryAccent
  },
  padding: {
    four: "4px",
    eight: "8px",
    sixteen: "16px",
    twentyFour: "24px",
    thirtyTwo: "32px",
    fourtyEight: "48px",
    sixtyFour: "64px",
    eighty: "80px",
    hundredTwenty: "120px",
    mainWrapper: layout.padding
  },
  flex: {
    spaceBetween: "display: flex; justify-content: space-between",
    spaceAround: "display: flex; justify-content: space-around",
    center: "display: flex; align-items: center; justify-content: center",
    topCenter:
      "display: flex; align-items: flex-start; justify-content: center",
    flexStart:
      "display: flex; justify-content: flex-start; align-items: flex-start;",
    flexEnd: "display: flex; justify-content: flex-end",
    flexRowEnd:
      "display: flex; flex-direction: row; justify-content: flex-end; align-items: center;",
    flexRowBetween:
      "display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;",
    flexColumnCenter:
      "display: flex; flex-direction: column; justify-content: center, align-items: center;",
    flexColumnTopCenter:
      "display: flex; flex: 1; flex-direction: column; justify-content: flex-start, align-items: center;",
    flexRowJustifyStart:
      "display: flex; flex-direction: row; justify-content: flex-start; align-items: center;"
  },
  fontSize: {
    mainHeading: "32px",
    subHeading: "24px",
    filterTitle: "16px",
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px"
  },
  logoFont: "'Quicksand', sans-serif;"
};