import React from "react";
import GameListCard from "./GameListCard";
import { useState, useEffect } from "react";
import {
  Divider,
  Grid,
  Typography,
  makeStyles,
  Container,
  TablePagination,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import AppbarMainMenu from "../shared/AppbarMainMenu";
import MenuItemsGameList from "./MenuItemsGameList";
import { ReactComponent as HvZLogo } from "../../assets/logo_without_title.svg";
import {
  themeActive,
  themeUpcoming,
  themeCompleted,
} from "../shared/themeGameCards";
import Endpoints from "../../services/endpoints";
import { getTokenInStorage } from "../../utils/tokenHelper";
import "./CardStyles.scss";

function GameList() {
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",

      "& .MuiSvgIcon-root-141": {
        fontSize: "1.8em",
      },

      "& .MuiTypography-h3": {
        textAlign: "center",
      },
      "& .MuiTypography-colorPrimary": {
        color: "#434346",
      },
      "& .MuiDivider-root": {
        height: "2px",
        marginBottom: "2em",
      },
    },

    caption: {
      color: "#CA1551",
      fontSize: "20px",
    },
    selectIcon: {
      color: "#CA1551",
    },
    select: {
      color: "#CA1551",
      fontSize: "20px",
    },
    actions: {
      color: "#CA1551",
    },
    container: {
      maxWidth: "100%",
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(4),
      textAlign: "center",
    },
  }));
  const classes = useStyles();

  const [activeGames, setActiveGames] = useState([]);
  const [completedGames, setCompletedGames] = useState([]);
  const [upCommingGames, setupCommingGames] = useState([]);

  //Pagniation default to 3 cards/row
  const [pageActive, setPageActive] = useState(0);
  const [pageUpComming, setPageUpcomming] = useState(0);
  const [pageComplete, setPageComplete] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(3);

  const [loading, setLoading] = useState(true);

  //Fetch games
  const { data: games, error: gamesError } = useSWR(
    `${Endpoints.GAME_API}`,
    (url) => fetcherToken(url, getTokenInStorage())
  );

  //Filter out new array from game_state and registration
  useEffect(() => {
    if (gamesError) {
      console.log(gamesError);
    }
    if (!games) {
      setLoading(true);
    } else {
      setActiveGames(games.filter((g) => g.gameStarted));
      setupCommingGames(games.filter((g) => g.registrationOpen));
      setCompletedGames(games.filter((g) => g.gameComplete));

      setLoading(false);
    }
  }, [games]);

  const handleChangePageActive = (event, newPage) => {
    setPageActive(newPage);
  };

  const handleChangePageUpcomming = (event, newPage) => {
    setPageUpcomming(newPage);
  };

  const handleChangePageCompleted = (event, newPage) => {
    setPageComplete(newPage);
  };

  const handleChangeRowsPerPageActive = (event) => {
    setRowsPerPage(+event.target.value);
    setPageActive(0);
  };

  const handleChangeRowsPerPageUpcomming = (event) => {
    setRowsPerPage(+event.target.value);
    setPageUpcomming(0);
  };

  const handleChangeRowsPerPageCompleted = (event) => {
    setRowsPerPage(+event.target.value);
    setPageComplete(0);
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.root}>
          {/* APP BAR  */}
          <AppbarMainMenu menuItems={<MenuItemsGameList />} />
          <div
            style={{
              marginTop: "6em",
              marginRight: "auto",
              marginLeft: "auto",
              width: "480px",
              zIndex: 100,
            }}
          >
            <HvZLogo className="logo" />
            <Divider
              variant="fullWidth"
              style={{
                backgroundColor: "#df1b55",
                height: 2,
                marginTop: "-100px",
              }}
            />
          </div>

          <main>
            <Container maxWidth="lg" fluid>
              <MuiThemeProvider theme={themeActive}>
                <CssBaseline />
                {/* ACTIVE GAMES */}
                <article className="gameTitle">
                  <Typography variant="h3" color="primary" component="p">
                    Active games
                  </Typography>
                </article>

                <Divider variant="middle" />
                <section>
                  <Grid
                    container
                    spacing={10}
                    align="center"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {activeGames
                      ?.slice(
                        pageActive * rowsPerPage,
                        pageActive * rowsPerPage + rowsPerPage
                      )
                      .map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                          <GameListCard
                            key={game.id}
                            game={game}
                            className={classes.card}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </section>
              </MuiThemeProvider>
              <TablePagination
                rowsPerPageOptions={[1, 3, 6, 12]}
                labelRowsPerPage=""
                component="div"
                count={activeGames?.length}
                rowsPerPage={rowsPerPage}
                page={pageActive}
                onChangePage={handleChangePageActive}
                onChangeRowsPerPage={handleChangeRowsPerPageActive}
                classes={{
                  toolbar: classes.toolbar,
                  caption: classes.caption,
                  selectIcon: classes.selectIcon,
                  select: classes.select,
                  actions: classes.actions,
                }}
              />

              {/* UCOMING GAMES */}
              <MuiThemeProvider theme={themeUpcoming}>
                <CssBaseline />

                <article className="gameTitle">
                  <Typography variant="h3" color="primary" component="p">
                    Upcoming games
                  </Typography>
                </article>

                <Divider />
                <section className="container">
                  <Grid
                    container
                    spacing={10}
                    align="center"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {upCommingGames
                      ?.slice(
                        pageUpComming * rowsPerPage,
                        pageUpComming * rowsPerPage + rowsPerPage
                      )
                      .map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                          <GameListCard key={game.id} game={game} />
                        </Grid>
                      ))}
                  </Grid>
                </section>
              </MuiThemeProvider>
              <TablePagination
                rowsPerPageOptions={[1, 3, 6, 12]}
                labelRowsPerPage=""
                component="div"
                nextIconButtonProps={classes.tablePagination}
                count={upCommingGames?.length}
                rowsPerPage={rowsPerPage}
                page={pageUpComming}
                onChangePage={handleChangePageUpcomming}
                onChangeRowsPerPage={handleChangeRowsPerPageUpcomming}
                classes={{
                  toolbar: classes.toolbar,
                  caption: classes.caption,
                  selectIcon: classes.selectIcon,
                  select: classes.select,
                  actions: classes.actions,
                }}
              />

              {/* COMPLETED GAMES */}
              <MuiThemeProvider theme={themeCompleted}>
                <CssBaseline />
                <article className="gameTitle">
                  <Typography variant="h3" color="primary" component="p">
                    Completed games
                  </Typography>
                </article>

                <Divider />
                <section className="container">
                  <Grid
                    container
                    spacing={10}
                    align="center"
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {completedGames
                      ?.slice(
                        pageComplete * rowsPerPage,
                        pageComplete * rowsPerPage + rowsPerPage
                      )
                      .map((game) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                          <GameListCard key={game.id} game={game} />
                        </Grid>
                      ))}
                  </Grid>
                </section>
              </MuiThemeProvider>
              <TablePagination
                rowsPerPageOptions={[1, 3, 6, 12]}
                labelRowsPerPage=""
                component="div"
                nextIconButtonProps={classes.tablePagination}
                count={completedGames?.length}
                rowsPerPage={rowsPerPage}
                page={pageComplete}
                onChangePage={handleChangePageCompleted}
                onChangeRowsPerPage={handleChangeRowsPerPageCompleted}
                classes={{
                  toolbar: classes.toolbar,
                  caption: classes.caption,
                  selectIcon: classes.selectIcon,
                  select: classes.select,
                  actions: classes.actions,
                }}
              />
            </Container>
          </main>
        </div>
      )}
    </>
  );
}

export default GameList;
