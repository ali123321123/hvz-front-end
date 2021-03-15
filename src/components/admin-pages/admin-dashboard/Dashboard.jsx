import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  Drawer,
  Box,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Container,
  Grid,
  Paper,
  Link,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import TempInteractiveMap from "./TempInteractiveMap";
import GameStats from "./GameStats";
import MissionStats from "./MissionStats";
import PlayerStats from "./PlayerStats";
import MenuItems from "./MenuItems";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">HVZ</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },

  startGameButton: {
    marginRight: 36,
  },
  startGameButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard({ game }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleToggleOpen = () => {
    setOpen(true);
  };

  const handleToggleClose = () => {
    setOpen(false);
  };

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleToggleOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard | Insert Game Name
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Side menu  */}
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleToggleClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />

        <List>
          <MenuItems
            onClick={handleToggleOpen}
            className={clsx(
              classes.startGameButton,
              open && classes.startGameButtonHidden
            )}
          />
        </List>
      </Drawer>
      {/* Side menu End  */}

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Player stats */}
            <Grid item xs={12} md={3} lg={3}>
              <PlayerStats />
            </Grid>

            {/* Mission Stats */}
            <Grid item xs={12} md={5} lg={6}>
              <Paper className={fixedHeightPaper}>
                <MissionStats />
              </Paper>
            </Grid>

            {/* Interactive Map */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TempInteractiveMap />
              </Paper>
            </Grid>

            {/* Player stats */}
            <Grid item xs={12} md={3} lg={3}>
              <PlayerStats />
            </Grid>

            {/* Game Stats */}
            <Grid item xs={9}>
              <Paper className={classes.paper}>
                <GameStats />
              </Paper>
            </Grid>
          </Grid>

          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
