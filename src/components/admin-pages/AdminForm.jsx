import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import clsx from "clsx";

import {
  Checkbox,
  ThemeProvider,
  createMuiTheme,
  makeStyles,
  CssBaseline,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import TempInteractiveMap from "./admin-dashboard/TempInteractiveMap";
import "./styles.scss";
import ButtonsResult from "./ButtonsResult";
import { Cloudinary } from "cloudinary-core";
import MenuItemsAdminDashboard from "../admin-pages/admin-dashboard/MenuItemsAdminDashboard";
import AppbarMainMenu from "../shared/AppbarMainMenu";
import AdminCard from "./admin-gameCard/AdminCard";
import Moment from "moment";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function AdminForm({ onClick, openForm, setopenForm }) {
  const moment = require("moment");
  const drawerWidth = 240;

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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });

  const { handleSubmit, control } = useForm();
  const [data, setData] = useState(null);

  const [name, setName] = useState("");
  const [gameState, setGameState] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [imageUrl, setImageUrl] = useState("");
  const [toggle, setToggle] = useState(false);

  const saveGame = () => {
    let data = {
      name,
      gameState,
      registrationOpen,
      startTime,
      endTime,
      imageUrl,
    };
    console.log(data);

    fetch("https://localhost:44390/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json().then((res) => console.warn("result", res)));
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

  const handleUpload = () => {
    myWidget.open();
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

  const handleToggle = () => {
    setToggle(toggle === true ? false : true);
    console.log(toggle);
  };

  //Create a game card that recives all the changes

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppbarMainMenu
        menuTitle={"Dashboard | Insert Game Name"}
        menuItems={<MenuItemsAdminDashboard />}
      />

      <ThemeProvider theme={theme}>
        <main className={classes.content}>
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
                    <label className="h1">Create new Game</label>
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
                    <Paper className={fixedHeightPaper}>
                      <TempInteractiveMap />
                    </Paper>
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
                      onClick={saveGame}
                    >
                      Create Game
                    </button>
                  </section>
                </form>
              </Grid>

              {/* CARD PREVIEW */}
              <Grid item>
                <section>
                  <label className="h1">Preview</label>
                </section>

                <AdminCard
                  name={name}
                  registrationOpen={registrationOpen}
                  gameState={gameState}
                  startTime={moment(`${startTime}`).format("MM do YYYY, HH:mm")}
                  endTime={moment(`${endTime}`).format("MM do YYYY, HH:mm")}
                  imageUrl={cloudinaryCore.url(imageUrl)}
                />
              </Grid>
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
}

export default AdminForm;

//Denne fungerer
//   useEffect(() => {
//     // DELETE request using fetch with set headers
//     const requestOptions = {
//       method: "DELETE",
//       headers: {
//         Authorization: "Bearer my-token",
//         "My-Custom-Header": "foobar",
//       },
//     };
//     fetch(
//       `https://localhost:44390/api/games/${game.id}`,
//       requestOptions
//     ).then(() => setStatus("Delete successful"));
//   }, []);
