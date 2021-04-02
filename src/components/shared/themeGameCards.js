import { createMuiTheme } from "@material-ui/core/styles";
const primary = "#2c2c2c";
const secondary = "#c43c80";
const highlight = "#eef131";
const black = "#a5a5a5";
const cardBackground = "#ffffff";
const white = "#ffffff";

export const light = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      //Font color
      main: "#9c27b0",
      dark: primary,
      light: secondary,
    },
    background: {
      default: "#eeeeee",
    },
  },
  common: {
    black,
  },

  typography: {
    h3: {
      textAlign: "center",
      textDecoration: "underline",
      textDecorationColor: "#00ffd5",
      marginBottom: "0.6em",
    },
  },

  overrides: {
    MuiSwitch: {
      track: {
        backgroundColor: "red",
      },
    },

    MuiFormLabel: {
      root: {
        color: primary,
      },
    },
    MuiInputBase: {
      root: {
        color: primary,
      },
    },

    MuiInputBase: {
      input: {
        color: primary,
      },
    },

    MuiFormLabel: {
      root: {
        color: primary,
      },
    },
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
          boxShadow: "0px 0px 40px 15px #9c27b0",
        },
      },
    },
    MuiFormLabel: {
      root: {
        color: primary,
      },
    },
    MuiInputBase: {
      root: {
        color: primary,
      },
    },

    MuiInputBase: {
      input: {
        color: primary,
      },
    },

    MuiFormLabel: {
      root: {
        color: primary,
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
          boxShadow: "0px 0px 20px 5px #9c27b0",
          transition: "0.3s",
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: "20px",
      },
    },
  },
});

//Dark Theme
export const themeActive = createMuiTheme({
  palette: {
    type: "dark",

    background: {
      default: "#131729",
    },
    primary: {
      //Font color
      main: "#9c27b0",
      dark: primary,
      light: secondary,
    },
  },

  // background: {
  //   default: "#0e101c",
  // },
  typography: {
    h3: {
      textAlign: "center",
      textDecoration: "underline",
      textDecorationColor: "#00ffd5",
      marginBottom: "0.6em",
    },
  },
  //Override MuiCard
  overrides: {
    MuiSwitch: {
      track: {
        backgroundColor: "red",
      },
    },

    MuiFormLabel: {
      root: {
        color: primary,
      },
    },

    MuiInputBase: {
      root: {
        color: primary,
      },
    },

    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: primary,
      },
    },

    MuiListItemIcon: {
      root: {
        color: primary,
      },
    },
    MuiGrid: {
      container: {
        justifyContent: "center",
      },
    },

    MuiListItem: {
      root: {
        width: "20%",
      },
    },
    MuiCard: {
      root: {
        "&:hover": {
          boxShadow:
            "0 12px 15px 0 rgba(0, 0, 0, 0.24) 0 17px 50px 0 rgba(0, 0, 0, 0.19)",
          boxShadow: "0px 0px 40px 15px #9c27b0",
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
          boxShadow: "0px 0px 20px 5px #9c27b0",
          transition: "0.3s",
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: cardBackground,
        color: primary,
      },
      rounded: {
        borderRadius: "20px",
      },
    },
    MuiButton: {
      root: {
        color: primary,
        border: "#df1b55",
        "&:hover": {
          backgroundColor: "secondary",
        },
      },
    },
    MuiIconButton: {
      root: {
        color: primary,
      },
    },

    MuiTableCell: {
      stickyHeader: {
        backgroundColor: white,
      },
      head: {
        color: primary,
        fontWeight: 600,
      },
      body: {
        color: primary,
      },
    },

    MuiTablePagination: {
      root: {
        color: primary,
      },
    },
  },
});

export const themeUpcoming = createMuiTheme({
  palette: {
    type: "dark",

    background: {
      default: "#131729",
    },
    primary: {
      //Font color
      main: "#ffd000",
      dark: primary,
      light: secondary,
    },
  },

  typography: {
    h3: {
      textAlign: "center",
      textDecoration: "underline",
      textDecorationColor: "#00ffd5",
      marginBottom: "0.6em",
    },
  },

  //Override MuiCard HoverColor
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
          boxShadow: "0px 0px 40px 15px #ffd000",
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
          boxShadow: "0px 0px 20px 5px #ffd000",
          transition: "0.3s",
        },
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: cardBackground,
        color: primary,
      },
      rounded: {
        borderRadius: "20px",
      },
    },
    MuiButton: {
      root: {
        color: primary,
        border: "#df1b55",
        "&:hover": {
          backgroundColor: "secondary",
        },
      },
    },

    MuiTableCell: {
      stickyHeader: {
        backgroundColor: white,
      },
      head: {
        color: primary,
      },
    },

    MuiTableRow: {
      root: {
        color: primary,
      },
    },
  },
});

export const themeCompleted = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      //Font color
      main: "#ff0062",
      dark: primary,
      light: secondary,
    },
    background: {
      default: "#131729",
    },
    // background: {
    //   default: "#0e101c",
    // },
  },
  typography: {
    h3: {
      textAlign: "center",
      textDecoration: "underline",
      textDecorationColor: "#00ffd5",
      marginBottom: "0.6em",
    },
  },

  //Override MuiCard
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
      root: {
        backgroundColor: cardBackground,
        color: primary,
      },
      rounded: {
        borderRadius: "20px",
      },
    },
    MuiButton: {
      root: {
        color: primary,
        border: "#df1b55",
        "&:hover": {
          backgroundColor: "secondary",
        },
      },
    },

    MuiTableCell: {
      stickyHeader: {
        backgroundColor: white,
      },
      head: {
        color: primary,
      },
    },

    MuiTableRow: {
      root: {
        color: primary,
      },
    },
  },
});

export const themeCreateGameForm = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      //Font color
      main: "#9c27b0",
    },
    // background: {
    //   default: "#0e101c",
    // },
  },
  typography: {
    h3: {
      textAlign: "center",
      textDecoration: "underline",
      textDecorationColor: "#00ffd5",
      marginBottom: "0.6em",
    },
  },
  //Override MuiCard
  overrides: {
    MuiDialog: {
      root: {
        fullWidth: true,
      },
    },
    MuiGrid: {
      container: {},
    },
    MuiPaper: {
      rounded: {
        borderRadius: "10px",
      },
    },
  },
});
