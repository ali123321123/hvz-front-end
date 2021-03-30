import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  TextField,
} from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";

function MapAddMarker() {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [openInput, setOpenInput] = useState(false);
  const [missionTitle, setMissionTitle] = useState("");
  const [missionDescription, setMissionDescription] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      setOpenInput(true);
    },
  });

  const handleClose = () => {
    setOpenInput(false);
  };


  const handleMissionTitle = (e) => {
    setMissionTitle(e.target.value);
  };

  const handleMissionDescription = (e) => {
    setMissionDescription(e.target.value);
  };

  const handleStartDateChange = (date) => {
    console.log(date);
    setStartTime(date);
  };

  const handleEndDateChange = (date) => {
    console.log(date);
    setEndTime(date);
  };

  const handleAddButton = () => {
    setMarkers([...markers, {
            position: {
              lat: position.lat,
              lng: position.lng,
            },
            title: missionTitle,
            description: missionDescription,
            startTime: startTime,
            endTime: endTime,
          },
    ])
    setOpenInput(false)
  }

  return (
    <>
      <Dialog aria-labelledby="customized-dialog-title" open={openInput}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add squad mission
        </DialogTitle>

        <form>
          {/* GAME TITLE & IMAGE */}
          <DialogContent>
            <TextField
              autofocus
              name="name"
              label="Mission Title"
              style={{ padding: "10px" }}
              onChange={handleMissionTitle}
            />
          </DialogContent>

          <DialogContent>
            <TextField
              autofocus
              name="description"
              label="Mission Description"
              style={{ padding: "10px" }}
              onChange={handleMissionDescription}
            />
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
        </form>

        <Button variant="outlined" onClick={handleAddButton} color="primary">
          Add mission
        </Button>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {markers &&
        markers?.map((m) => (
          <Marker position={m.position}>
            <Popup>{m.description}</Popup>
          </Marker>
        ))}
    </>
  );
}

export default MapAddMarker;
