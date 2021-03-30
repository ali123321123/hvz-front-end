import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Checkbox,
  CssBaseline,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MuiThemeProvider,
  TextField,
  IconButton,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Grid,
  Container,
} from "@material-ui/core";
import "react-datepicker/dist/react-datepicker.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { themeCreateGameForm } from "../../shared/themeGameCards";
import CloseIcon from "@material-ui/icons/Close";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";

const CreateGameForm = ({ open, setOpen }) => {
  const { handleSubmit } = useForm();
  const [setData] = useState(null);

  const [name, setName] = useState("");
  const [gameState, setGameState] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const [imageUrl, setImageUrl] = useState("");

  const updateGame = () => {
    let data = {
      name,
      registrationOpen,
      startTime,
      endTime,
      imageUrl,
      nW_lat: 0,
      nW_lng: 0,
      sE_lat: 0,
      sE_lng: 0,
    };

    fetch(`${Endpoints.GAME_API}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
        Accept: "application/json",
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleStartDateChange = (date) => {
    console.log(date);
    setStartTime(date);
  };

  const handleEndDateChange = (date) => {
    console.log(date);
    setEndTime(date);
  };

  return (
    <div>
      <MuiThemeProvider theme={themeCreateGameForm}>
        <CssBaseline />
        <Dialog
          open={open}
          fullWidth
          onClose={handleClose}
          maxWidth="sm"
          aria-labelledby="responsive-dialog-title"
        >
          <DialogActions>
            <IconButton aria-label="close" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>

          <DialogTitle id="form-dialog-title">
            <Typography variant="h4">Create new Game</Typography>
          </DialogTitle>

          <DialogContent dividers>
            {/* FORM START*/}

            <form onSubmit={handleSubmit((data) => setData(data))}>
              {/* GAME TITLE & IMAGE */}
              <DialogContent>
                <Container maxWidth="lg" fluid>
                  <Grid item xs={6}>
                    <TextField
                      autofocus
                      name="name"
                      label="Game Title"
                      style={{ padding: "10px" }}
                      onChange={handleGameTitle}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpload}
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload Image
                    </Button>
                  </Grid>
                </Container>
              </DialogContent>

              {/* Interactive Map | UPLOAD IMAGE*/}
              <DialogContent>
                <Typography gutterBottom>Interactive Map</Typography>
              </DialogContent>

              {/* START | END DATE */}
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  id="time-picker"
                  label="Start Date/Time (UTC)"
                  format="MM/dd/yyyy"
                  value={startTime}
                  onChange={handleStartDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <KeyboardDateTimePicker
                  id="time-picker"
                  label="End Date/Time (UTC)"
                  format="MM/dd/yyyy"
                  value={endTime}
                  onChange={handleEndDateChange}
                  minDate={startTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </MuiPickersUtilsProvider>

              {/* REGISTRATION  */}
              <FormControl component="fieldset">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onClick={handleRegistration}
                        name="registrationOpen"
                      />
                    }
                    label="Open Registration"
                  />
                </FormGroup>
              </FormControl>

              {/* BUTTON CREATE GAME */}
              <section>
                <DialogActions>
                  <Button
                    className="buttonPink"
                    color="primary"
                    type="button"
                    onClick={updateGame}
                  >
                    Create Game
                  </Button>
                </DialogActions>
              </section>
            </form>
          </DialogContent>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
};

export default CreateGameForm;
