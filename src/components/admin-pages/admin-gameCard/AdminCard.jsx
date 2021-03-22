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
import "../../game-list/CardStyles.scss";
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
    },

    media: {
      //paddingTop: "56.25%", // 16:9
      paddingTop: "75%", // 4:3
      objectFit: "cover",
      width: "80%",
      borderRadius: "100%",
      margin: "auto",
      marginTop: "2em",
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
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(4),
    },

    divider: {
      marginTop: "0px",
      height: "1px",
    },
  }));
  const classes = useStyles();
  const moment = require("moment");

  return (
    <div className={classes.container}>
      <section className={classes.root}>
        <ThemeProvider theme={theme}>
          <Card style={{ borderRadius: "20px" }}>
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

            <Divider className="divider" variant="middle" />
            <br />
            <CardContent>
              <Typography variant="body1" color="textPrimary" component="p">
                <span>Start Date &emsp; {} &emsp; End Date</span>
              </Typography>
              <br />
              <br />

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
