import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  makeStyles,
  Typography,
  Divider,
  Button,
  ThemeProvider,
  Dialog,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import "./GameCard.scss";
import "fontsource-roboto";
import purple from "@material-ui/core/colors/purple";
import ColoredButton from "../shared/ColoredButton";
import theme from "../shared/theme";
import { dark } from "@material-ui/core/styles/createPalette";
import GameCardPopUp from "./GameCardPopup";

function GameListCard({ game, onClick, onClose }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      textAlign: "center",
      "& .MuiPaper-root": {
        borderRadius: "25px",
      },
      " & .MuiCardMedia-root": {
        margin: "auto",
        width: "80%",
        borderRadius: "100%",
      },
    },

    media: {
      height: "100%",
      //paddingTop: "56.25%", // 16:9
      paddingTop: "75%", // 4:3
      objectFit: "cover",
    },
    primary: {
      main: "#a61766",
    },
    palette: {
      type: "dark",
      common: {
        black: "#a61766",
      },
    },
  }));
  const classes = useStyles();

  const database = require("../../mockdata/mockDb.json");
  const [gameCards, setGameCards] = useState([]);

  const [gameSquad, setGameSquad] = useState([]);
  const [squads, setSquads] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setSquads(
      database.squads.filter((squad) =>
        database.games.some((game) => squad.id === game.id)
      )
    );
  }, [gameSquad]);

  useEffect(() => {
    setGameSquad(database.squads);
  }, []);

  console.log(
    database.games.map((squad, i) => {
      let game = database.squads.find((id) => id.id === squad.id);
      return game;
    })
  );
  return (
    <div>
      <article container justify="center">
        gameSquad
        {gameSquad.map((squad) => {
          if (gameCards.some((game) => game.id === squad.id)) {
            return <GameCardPopUp squad={squad} />;
          }
        })}
      </article>
      test squad:
      {gameCards && (
        <div>
          {squads.map((squad) => (
            <GameCardPopUp
              key={squad.id}
              squad={squad}
              open={open}
              game={game}
            />
          ))}
        </div>
      )}
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {game.name}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Latitude: {game.nw_lat}
            <br />
            Longitude: {game.nw_lng}
          </Typography>
          <Typography gutterBottom>
            {squads.map((squad) => (
              <p>{squad.name}</p>
            ))}
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero
            minima cum culpa at. Unde modi distinctio nemo iure non vel placeat
            soluta nesciunt incidunt velit, aut, eveniet neque magni saepe?
            {squads.map((squad) => {
              if (game.gam_state) {
                return <p>{squad.name}</p>;
              } else if (!game.game_state && game.game_registration) {
                return <p>{squad.name}</p>;
              } else {
                return <p>{squad.name}</p>;
              }
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <section className={classes.root}>
        <ThemeProvider theme={theme}>
          <Card className="card">
            <CardMedia
              className={classes.media}
              image={game.url}
              height="200px"
              title="game avatar"
            />
            <CardHeader
              className="header"
              title={game.name}
              subheader={
                game.game_state
                  ? "In Progress"
                  : !game.game_state && game.game_registration
                  ? "Open for registration"
                  : "Completed games"
              }
            />
            <CardContent>
              <Typography variant="body2" color="primary" component="p">
                X Registered Players
              </Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardContent>
              <Typography variant="body1" color="textPrimary" component="p">
                Relative dates
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
                12.02.2021 | 12.02.2021 | 12.02.2021{" "}
              </Typography>
            </CardContent>

            <Divider />

            <CardContent>
              <Button
                onClick={handleClickOpen}
                className={classes.button}
                variant="button"
                color="secondary"
                component="p"
              >
                See More
              </Button>
            </CardContent>
          </Card>
        </ThemeProvider>
      </section>
    </div>
  );
}

export default GameListCard;
