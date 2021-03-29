import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Tooltip,
  ListItemIcon,
} from "@material-ui/core";
import "../../game-list/CardStyles.scss";
import "fontsource-roboto";
import { Cloudinary } from "cloudinary-core";
import AdminDashboard from "../admin-dashboard/AdminDashboard";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import Endpoints from "../../../services/endpoints";

function AdminCard({ game }) {
  const moment = require("moment");
  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });

  const [open, setOpen] = useState(false);
  const [players, setPlayers] = useState();

  useEffect(() => {
    setPlayers(game.countPlayers);
  }, [game]);

  return (
    <>
      <div>
        <Card className="card" key={game.id}>
          <p>Game id: {game.id}</p>

          <Link
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/admin/game/${game.id}`,
              state: game,
            }}
          >
            <CardMedia
              image={cloudinaryCore.url(game.imageUrl)}
              height="200px"
              title="game avatar"
            />
            <CardHeader
              className="header"
              title={game.name}
              color="black"
              subheader={
                game.gameStarted
                  ? "In Progress"
                  : game.registrationOpen
                  ? "Open for registration"
                  : game.gameComplete
                  ? "Completed games"
                  : "Registration not yet open"
              }
            />
            <CardContent>
              <Typography variant="body2" component="p" color="black">
                {players} Registered Players
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="body1" color="black" component="p">
                <span>Start Date &emsp; {} &emsp; End Date</span>
              </Typography>

              <Typography variant="body2" component="p">
                <Tooltip title="Game start">
                  <span>
                    {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}
                    | {}
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
              <Button color="secondary" component="p">
                Edit game
              </Button>
            </CardContent>
          </Link>
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
