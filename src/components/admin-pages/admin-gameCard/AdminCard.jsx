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
} from "@material-ui/core";
import "../../game-list/CardStyles.scss";
import "fontsource-roboto";
import { Cloudinary } from "cloudinary-core";
import AdminDashboard from "../admin-dashboard/AdminDashboard";
import { Link } from "react-router-dom";

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
        <Link
          style={{ textDecoration: "none" }}
          to={{
            pathname: `/admin/game/${game.id}`,
            state: game,
          }}
        >
          <Card className="card" key={game.id}>
            <p>Game id: {game.id}</p>

            <CardMedia
              image={cloudinaryCore.url(game.imageUrl)}
              height="200px"
              title="game avatar"
            />
            <CardHeader
              title={game.name}
              subheader={
                game.gameStarted ? (
                  <span style={{ color: "#9c27b0" }}>In Progress</span>
                ) : game.registrationOpen ? (
                  <span style={{ color: "#9c27b0" }}>
                    Open for registration
                  </span>
                ) : game.gameComplete ? (
                  <span style={{ color: "#9c27b0" }}>Completed games</span>
                ) : (
                  <span style={{ color: "#9c27b0" }}>
                    Registration not yet open
                  </span>
                )
              }
            />
            <CardContent>
              <Typography variant="body2" component="p" color="inherit">
                {players} Registered Players
              </Typography>
            </CardContent>

            <CardContent>
              <Typography variant="body1" color="inherit" component="p">
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
          </Card>
        </Link>
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
