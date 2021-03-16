import React from "react";
import { useState } from "react";
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
} from "@material-ui/core";
import "../../game-list/GameCard.scss";
import "fontsource-roboto";
import theme from "../../shared/theme";

function AdminGameListCard({ game }) {
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div>
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
    </>
  );
}

export default AdminGameListCard;
