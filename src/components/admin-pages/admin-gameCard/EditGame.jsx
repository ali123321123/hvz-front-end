import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  Grid,
  makeStyles,
  CssBaseline,
  Checkbox,
} from "@material-ui/core";
import DatePicker from "react-datepicker";
import { Cloudinary } from "cloudinary-core";

const EditGame = ({ open, setOpen, game }) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "#0e101c",
    },
    //Content container
    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(4),
    },

    fixedHeight: {
      height: 240,
    },
  }));

  const classes = useStyles();

  const [data, setData] = useState(null);
  const { handleSubmit, control } = useForm();

  const [name, setName] = useState("");
  const [gameState, setGameState] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [imageUrl, setImageUrl] = useState("");

  const updateGame = () => {
    let data = {
      name,
      gameState,
      registrationOpen,
      startTime,
      endTime,
      imageUrl,
    };
    console.log("data id", game.id, data);

    fetch(`https://localhost:44390/api/games/${game.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json().then((res) => console.warn("result", res)));

    setOpen(false);
  };

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "debyqnalg",
      uploadPreset: "siwpunif",
    },
    (error, res) => {
      if (!error && res && res.event === "success") {
        console.log(res.info);
        setImageUrl(res.info.public_id);
      }
    }
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleGameTitle = (e) => {
    setName(e.target.value);
  };

  const handleGameState = () => {
    setGameState(true);
  };
  const handleRegistration = () => {
    setRegistrationOpen(true);
  };

  const handleUpload = () => {
    myWidget.open();
  };

  return (
    <div>
      <Dialog aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {game.name} id: {game.id}
        </DialogTitle>

        <DialogContent className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={10}>
              <Grid spacing={10} item xs={7}>
                {/* FORM START*/}
                <form
                  onSubmit={handleSubmit((data) => setData(data))}
                  className="form"
                >
                  <section>
                    <label className="h1">Edit Game</label>
                  </section>

                  {/* GAME TITLE | REG | START | MAP */}
                  <section>
                    <label>Game Title:</label>
                    <input
                      name="name"
                      className="input"
                      onChange={handleGameTitle}
                    />

                    {/* BUTTON UPLOAD IMAGE */}
                    <button
                      className="buttonImg"
                      type="button"
                      onClick={handleUpload}
                    >
                      Upload image
                    </button>
                  </section>

                  {/* REGISTRATION & START GAME */}
                  <section>
                    <label className="checkBox">Open Registration </label>
                    <Controller
                      className="checkBox"
                      as={Checkbox}
                      name="registrationOpen"
                      type="checkbox"
                      control={control}
                      onClick={handleRegistration}
                    />

                    <label className="checkBox">&emsp; Start Game</label>
                    <Controller
                      className="checkBox"
                      as={Checkbox}
                      name="gameState"
                      type="checkbox"
                      control={control}
                      onClick={handleGameState}
                    />

                    {/* Interactive Map */}
                  </section>

                  {/* START | END DATE */}
                  <section className="date">
                    <label className="checkBox">Start Date</label>
                    <DatePicker
                      className="datePicker"
                      placeholderText="Select date"
                      showWeekNumbers
                      selected={startTime}
                      endDate={endTime}
                      showTimeSelect
                      dateFormat="Pp"
                      onChange={(date) => setStartTime(date)}
                    />

                    <label className="checkBox">End Date</label>
                    <DatePicker
                      className="datePicker"
                      placeholderText="Select date"
                      showWeekNumbers
                      selected={endTime}
                      startDate={startTime}
                      minDate={startTime}
                      selectsEnd
                      showTimeSelect
                      dateFormat="Pp"
                      onChange={(date) => setEndTime(date)}
                    />
                  </section>

                  {/* BUTTON CREATE GAME */}
                  <section>
                    <button
                      className="buttonPink"
                      type="button"
                      onClick={updateGame}
                    >
                      Save
                    </button>
                  </section>
                </form>
              </Grid>

              {/* CARD PREVIEW */}
            </Grid>
          </Container>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            CLose
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditGame;
