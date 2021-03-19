import React from "react";
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
  Tooltip,
} from "@material-ui/core";
import "../../game-list/GameCard.scss";
import "fontsource-roboto";
import theme from "../../shared/theme";
import Moment from "moment";

const AdminCard = ({
  name,
  registrationOpen,
  gameState,
  startTime,
  endTime,
  imageUrl,
}) => {
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
    customWidth: {
      maxWidth: 120,
    },

    container: {
      paddingTop: theme.spacing(16),
      paddingBottom: theme.spacing(4),
    },
  }));
  const classes = useStyles();
  const moment = require("moment");

  return (
    <div className={classes.container}>
      <section className={classes.root}>
        <ThemeProvider theme={theme}>
          <Card className="card" style={{ backgroundColor: "#004ba0" }}>
            <CardMedia
              className={classes.media}
              image={imageUrl}
              height="200px"
              title="game avatar"
            />
            <CardHeader
              className="header"
              title={name}
              subheader={
                gameState ? "Game has started" : "Game has not started"
              }
            />

            <CardContent>
              <Typography variant="body2" color="primary" component="p">
                {registrationOpen
                  ? "Registration is Open"
                  : "Registration is Closed"}
              </Typography>
            </CardContent>

            <Divider variant="middle" />

            <CardContent>
              <Typography variant="body1" color="textPrimary" component="p">
                <span>Start Date &emsp; {} &emsp; End Date</span>
              </Typography>

              <Typography variant="body2" color="black" component="p">
                <Tooltip title="Game start">
                  <span>
                    {startTime}| {}
                  </span>
                </Tooltip>

                <Tooltip title="Game End">
                  <span>{endTime}</span>
                </Tooltip>
              </Typography>
            </CardContent>
          </Card>
        </ThemeProvider>
      </section>
    </div>
  );
};

export default AdminCard;
