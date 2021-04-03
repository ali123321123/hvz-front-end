import clsx from "clsx";
import {
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import Auth from "../../utils/authentication";
import "./styles.scss";
import Endpoints from "../../services/endpoints";
import { getTokenInStorage, decodedToken } from "../../utils/tokenHelper";
import GameRows from "./GameRows";
import UserStats from "./UserStats";
import UserInfo from "./UserInfo";

function Profile() {
  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {},

    //Content container
    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(4),
    },

    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },

    appBar: {
      //Keep appbar on top
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },

    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },

    fixedHeight: {
      height: 240,
    },
  }));
  const classes = useStyles();

  //Group classes
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  useEffect(() => {
    if (!Auth.userIsLoggedIn()) {
      history.push("/");
    }
  }, []);

  const { data: user, error: userError } = useSWR(
    `${Endpoints.USERS_API}/${decodedToken().unique_name}`,
    (url) => fetcherToken(url, getTokenInStorage())
  );
  //Fetch games
  const { data: players, error: playersError } = useSWR(
    `${Endpoints.USERS_API}/${decodedToken().unique_name}/games`,
    (url) => fetcherToken(url, getTokenInStorage())
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userError) {
      console.log(userError);
      if (userError.status === 404) {
        history.push("../*"); //TODO: GOTO ROOT (NOT FOUND) PAGE
      }
    }
    if (!user) {
      setLoading(true);
    } else {
      setLoading(false);
      console.log(user);
    }
  }, [user, userError]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            {!Auth.userIsAdmin() ? (
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} lg={3}>
                  <UserStats user={user} players={players} />
                </Grid>

                {/* User info */}
                <Grid item xs={12} md={9} lg={9}>
                  <Paper>
                    <UserInfo user={user} />
                  </Paper>
                </Grid>

                {/* User stats */}
                <Grid item xs={12} md={3} lg={3}>
                  {/* <UserStats user={user} gamesCount={games}/> */}
                </Grid>

                {/* Game Stats */}
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <GameRows players={players} />
                  </Paper>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={2}>
                {/* User info */}
                <Grid item xs={12} md={9} lg={9}>
                  <Paper>
                    <UserInfo user={user} />
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Container>
        </main>
      )}
    </>
  );
}

export default Profile;
