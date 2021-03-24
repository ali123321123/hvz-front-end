import { createMuiTheme } from "@material-ui/core/styles";

// breakpoints
const xl = 1920;
const lg = 1280;
const md = 960;
const sm = 600;
const xs = 0;

export const themeActive = createMuiTheme({
  palette: {
    primary: {
      //Font color
      main: "#9c27b0",
    },
    background: {
      default: "#0e101c",
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
        // backgroundColor: "blue",
      },
    },
    MuiCard: {
      root: {
        "&:hover": {
          boxShadow:
            "0 12px 15px 0 rgba(0, 0, 0, 0.24) 0 17px 50px 0 rgba(0, 0, 0, 0.19)",
          boxShadow: "0px 0px 40px 15px #9c27b0",
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

export const themeUpcoming = createMuiTheme({
  palette: {
    primary: {
      //Font color
      main: "#ffd000",
    },
    background: {
      default: "#0e101c",
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
      rounded: {
        borderRadius: "20px",
      },
    },
  },
});

export const themeCompleted = createMuiTheme({
  palette: {
    primary: {
      //Font color
      main: "#ff0062",
    },
    background: {
      default: "#0e101c",
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
      rounded: {
        borderRadius: "20px",
      },
    },
  },
});

export const themeCreateGameForm = createMuiTheme({
  palette: {
    primary: {
      //Font color
      main: "#9c27b0",
    },
    background: {
      default: "#0e101c",
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
