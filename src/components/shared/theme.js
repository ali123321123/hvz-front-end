import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

// colors
const primary = "#e6e6e6";
const secondary = "#c43c80";
const card = "f3e45b";
const black = "#343a40";
const darkBlack = "rgb(36, 40, 44)";
const background = "#0e101c";
const warningLight = "rgba(253, 200, 69, .3)";
const warningMain = "rgba(253, 200, 69, .5)";
const warningDark = "rgba(253, 200, 69, .7)";

// border
const borderWidth = 2;
const borderColor = "rgba(0, 0, 0, 0.13)";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

// spacing
const spacing = 8;

//Change the theme between light and dark under palette: type: "light"
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
      dar: primary,
      light: primary,
      contrastText: primary,
    },
    secondary: { main: secondary },
    card: { main: card },
    common: {
      black,
      darkBlack,
    },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark,
    },
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
    background: {
      default: background,
    },
    spacing,
  },
  breakpoints: {
    // Define custom breakpoint values.
    // These will apply to Material-UI components that use responsive
    // breakpoints, such as `Grid` and `Hidden`. You can also use the
    // theme breakpoint functions `up`, `down`, and `between` to create
    // media queries for these breakpoints
    values: {
      xl,
      lg,
      md,
      sm,
      xs,
    },
  },
  border: {
    borderColor: borderColor,
    borderWidth: borderWidth,
  },

  overrides: {
    MuiGrid: {
      container: {
        justifyContent: "center",
      },
    },
    MuiCard: {
      root: {
        "&:hover": {
          boxShadow:
            "0 12px 15px 0 rgba(0, 0, 0, 0.24) 0 17px 50px 0 rgba(0, 0, 0, 0.19)",
          boxShadow: "0px 0px 40px 15px #ff0062",
          //backgroundColor: "#1bdf84",
        },
      },
    },
    MuiCardMedia: {
      root: {
        paddingTop: "75%", // 4:3
        objectFit: "cover",
        width: "80%",
        borderRadius: "100%",
        margin: "auto",
        marginTop: "2em",
        boxShadow: "0px 0px 20px 5px #333",
        transition: "0.3s",

        "&:hover": {
          boxShadow: "0px 0px 20px 5px #ff0062",
          transition: "0.3s",
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: "20px",
      },
    },

    MuiExpansionPanel: {
      root: {
        position: "static",
      },
    },
    MuiTableCell: {
      root: {
        paddingLeft: spacing * 2,
        paddingRight: spacing * 2,
        borderBottom: `${borderWidth}px solid ${borderColor}`,
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing,
        },
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: "#df1b55",
        height: borderWidth,
        marginTop: "-100px",
      },
    },
    MuiPrivateNotchedOutline: {
      root: {
        borderWidth: borderWidth,
      },
    },
    MuiListItem: {
      divider: {
        borderBottom: `${borderWidth}px solid ${borderColor}`,
      },
    },

    MuiDialog: {
      paper: {
        width: "100%",
        backgroundColor: "#fff",
        maxWidth: 430,
        marginLeft: spacing,
        marginRight: spacing,
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: darkBlack,
      },
    },
    MuiExpansionPanelDetails: {
      root: {
        [`@media (max-width:  ${sm}px)`]: {
          paddingLeft: spacing,
          paddingRight: spacing,
        },
      },
    },
  },
  typography: {
    useNextVariants: true,
  },
});

export default responsiveFontSizes(theme);
