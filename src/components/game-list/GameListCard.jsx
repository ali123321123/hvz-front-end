import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Divider,
} from "@material-ui/core";
import "./GameCard.scss";

function GameListCard({ game }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 345,
    },
    divider: {
      margin: "3px",
    },
    heading: {
      fontWeight: "bold",
    },
    subheading: {
      lineHeight: 1.8,
    },
    media: {
      height: "100%",
      //paddingTop: "56.25%", // 16:9
      paddingTop: "75%", // 4:3
      objectFit: "cover",
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <article>
        <section>
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
              <Typography variant="body2" color="textSecondary" component="p">
                X Registered Players
              </Typography>
            </CardContent>

            <Divider className={classes.divider} light />

            <CardContent>
              <Typography paragraph>Relative dates</Typography>
              <Typography paragraph>
                12.02.2021 12.02.2021 12.02.2021{" "}
              </Typography>
            </CardContent>

            <Divider className={classes.divider} bold />

            <CardContent>
              <Typography paragraph>See More</Typography>
            </CardContent>
          </Card>
        </section>
      </article>
    </div>
  );
}

export default GameListCard;
