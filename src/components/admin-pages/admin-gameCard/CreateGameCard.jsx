import React from "react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import "../../game-list/CardStyles.scss";
import "fontsource-roboto";
import { Cloudinary } from "cloudinary-core";
import CreateGameForm from "./CreateGameForm";
import { AddCircle } from "@material-ui/icons";

function CreateGameCard({ game }) {
  const useStyles = makeStyles((theme) => ({
    largeButton: {
      padding: 24,
    },
    largeIcon: {
      fontSize: "3em",
    },
  }));
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  //If no image is uploaded display default image
  return (
    <>
      <div>
        <Card style={{ textAlign: "center" }}>
          <CardContent>{""}</CardContent>
          <CardContent
            button="true"
            onClick={handleClickOpen}
            style={{ paddingTop: "100px" }}
          >
            <IconButton className={classes.largeButton}>
              <AddCircle className={classes.largeIcon} />
            </IconButton>
          </CardContent>
          <CardHeader
            style={{ paddingBottom: "100px" }}
            className="header"
            title="Create Game"
          />
        </Card>
      </div>
      {open && <CreateGameForm open={open} setOpen={setOpen} game={game} />}
    </>
  );
}

export default CreateGameCard;
