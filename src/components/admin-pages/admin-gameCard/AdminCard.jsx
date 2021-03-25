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
  Tooltip,
  Grid,
  Container,
} from "@material-ui/core";
import "../../game-list/CardStyles.scss";
import "fontsource-roboto";
import theme from "../../shared/theme";
import Moment from "moment";
import useSWR from "swr";
import { fetcher } from "../../../services/FetcherFunction";
import { Cloudinary } from "cloudinary-core";
import EditGame from "./EditGame";
import AdminDashboard from "../admin-dashboard/AdminDashboard";
import { useHistory } from "react-router";
import Endpoints from "../../../services/endpoints";
import { Link } from "react-router-dom";

function AdminCard({ game }) {
  const moment = require("moment");
  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });

  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState();

  const history = useHistory();

  useEffect(() => {
    setPlayers(game.countPlayers);
  }, [game]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOpenGame = () => {
    history.push({
      path: `/admin/game/${game.id}`,
      satte: game,
    });
  };
  //pass on game.id for edit games

  return (
    <>
      <div>
        <Card className="card">
          <p>Game id: {game.id}</p>
          <CardMedia
            image={cloudinaryCore.url(game.imageUrl)}
            height="200px"
            title="game avatar"
          />
          <CardHeader
            className="header"
            title={game.name}
            subheader={
              game.gameState
                ? "In Progress"
                : !game.gameState && game.registrationOpen
                ? "Open for registration"
                : "Completed games"
            }
          />
          <CardContent>
            <Typography variant="body2" color="primary" component="p">
              {players} Registered Players
            </Typography>
          </CardContent>

          <CardContent>
            <Typography variant="body1" color="textPrimary" component="p">
              <span>Start Date &emsp; {} &emsp; End Date</span>
            </Typography>

            <Typography variant="body2" color="black" component="p">
              <Tooltip title="Game start">
                <span>
                  {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}|{" "}
                  {}
                </span>
              </Tooltip>

              <Tooltip title="Game End">
                <span>
                  {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
                </span>
              </Tooltip>
            </Typography>
          </CardContent>

          <CardContent>
            <Button
              //   onClick={handleOpenGame}
              variant="button"
              color="secondary"
              component="p"
            >
              <Link
                to={{
                  pathname: `/admin/game/${game.id}`,
                  state: game,
                }}
              >
                Edit game
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      {open && (
        <AdminDashboard
          open={open}
          setOpen={setOpen}
          game={game}
          gameid={game.id}
        />
      )}
    </>
  );
}

export default AdminCard;
