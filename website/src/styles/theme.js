const colors = {
  white: "#FCFCFC",
  black: "#171717",
  grey: "#333333",
  blueHighlight: "#108ee9",
  greyHighlight: "#aaa",

  mainBackground: "#FFFFFF",
  secondaryBackground: "#FCFCFC",

  mainText: "#171717",
  secondaryText: "#333333",

  mainAccent: "#f76600",
  secondaryAccent: "#B4EC51",

  // mainBackground: "#202124",
  // secondaryBackground: "#FCFCFC",
  //
  // mainText: "#fafafa",
  // secondaryText: "#5f6368",
  //
  // mainAccent: "#1D9696",
  // secondaryAccent: "#B4EC51",
};

export default {
  baseWrapper: {
    paddingTop: 12,
    marginRight: 32,
    marginLeft: 32,
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
    secondaryAccent: colors.secondaryAccent,
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
    hundredTwenty: "120px"
  },
  flex: {
    spaceBetween: "display: flex; justify-content: space-between",
    spaceAround: "display: flex; justify-content: space-around",
    center: "display: flex; align-items: center; justify-content: center",
    topCenter: "display: flex; align-items: flex-start; justify-content: center",
    flexStart: "display: flex; justify-content: flex-start; align-items: flex-start;",
    flexEnd: "display: flex; justify-content: flex-end",
    flexRowEnd: "display: flex; flex-direction: row; justify-content: flex-end; align-items: center;",
    flexRowBetween: "display: flex; flex-direction: row; justify-content: space-between; align-items: flex-start; flex-wrap: wrap;",
    flexColumnCenter: "display: flex; flex-direction: column; justify-content: center, align-items: center;",
    flexColumnTopCenter: "display: flex; flex: 1; flex-direction: column; justify-content: flex-start, align-items: center;",
    flexRowJustifyStart: "display: flex; flex-direction: row; justify-content: flex-start; align-items: center;",
  },
  fontSize: {
    mainHeading: "32px",
    subHeading: "24px"
  },
  breakpoints: {
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px"
  },
  logoFont: "'Quicksand', sans-serif;",
};
