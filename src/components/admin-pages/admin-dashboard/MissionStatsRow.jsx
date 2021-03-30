import { useState, useEffect } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  Typography,
  TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import BlockIcon from "@material-ui/icons/Block";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from '@material-ui/icons/Done';
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { DeleteMission, UpdateMission } from "./AdminAPI";
import "react-datepicker/dist/react-datepicker.css";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function MissionStatsRow({ mission }) {
  const moment = require("moment");

  const [editMission, setEditMission] = useState();
  useEffect(() => {
    setName(mission.name);
    setDescription(mission.description);
    setIsHumanVisible(mission.isHumanVisible);
    setStartTime(mission.startTime);
    setEndTime(mission.endTime);
    setIsComplete(mission.isComplete);
    setLatitude(mission.lat);
    setlongtitude(mission.lng);
  }, [editMission]);

  // Input handlers
  const [name, setName] = useState(mission.name);
  const handleMissionTitle = (e) => setName(e.target.value);

  const [description, setDescription] = useState(mission.description);
  const handleMissionDesc = (e) => setDescription(e.target.value);

  const [isHumanVisible, setIsHumanVisible] = useState(mission.isHumanVisible);
  const handleMissionHumanVisible = (e) => setIsHumanVisible(e.target.checked);

  const [startTime, setStartTime] = useState(mission.startTime);
  const handleMissionStartTime = (e) => setStartTime(e);

  const [endTime, setEndTime] = useState(mission.endTime);
  const handleMissionEndTime = (e) => setEndTime(e);

  const [isComplete, setIsComplete] = useState(mission.isComplete);
  const handleMissionIsComplete = (e) => setIsComplete(e.target.value);

  const [latitude, setLatitude] = useState(mission.lat);
  const handleMissionLatitude = (e) => setLatitude(e.target.value);

  const [longtitude, setlongtitude] = useState(mission.lng);
  const handleMissionLongtitude = (e) => setlongtitude(e.target.value);

  // Event handlers
  const handleDeleteMissionClick = () => {
    DeleteMission(mission.id);
  };

  const handleEditMissionClick = () => setEditMission(!editMission);

  const handleCancelClick = () => setEditMission(false);

  const handleCompleteMissionClick = () => {
    let data = {
        ...mission,
        isComplete: !mission.isComplete,
        endTime: new Date(Date.now()).toISOString(),
      };
  console.log(data);
      UpdateMission(data, mission.id)
  }

  const handleSaveMissionClick = () => {
    let data = {
        ...mission,
      name: name,
      isHumanVisible: isHumanVisible,
      isZombieVisible: !isHumanVisible,
      startTime: startTime,
      endTime: endTime,
      lat: latitude,
      lng: longtitude,
      isComplete: isComplete,
    };
console.log(data);
    UpdateMission(data, mission.id)
      setEditMission(false);
  };


  return (
    <>
      <TableRow key={mission.id} hover role="checkbox">
        {!editMission ? (
          <>
            <TableCell>{mission.isComplete ? mission.name+"(Complete)" : mission.name}</TableCell>

            <TableCell>
              {moment(`${mission.startTime}`).format("MMMM Do YYYY, HH:mm ")}-
              {moment(`${mission.endTime}`).format("MMMM Do YYYY, HH:mm ")}
            </TableCell>

            <TableCell>
              {mission.isHumanVisible ? (
                <Typography
                  variant="body2"
                  style={{ color: "#3bbb4c", fontWeight: "bold" }}
                >
                  Human
                </Typography>
              ) : (
                <Typography
                  variant="body2"
                  style={{ color: "#df1b55", fontWeight: "bold" }}
                >
                  Zombie
                </Typography>
              )}
            </TableCell>
            <TableCell>
                <DoneIcon
                style={{ cursor: "pointer" }}
                onClick={handleCompleteMissionClick}
              />
              </TableCell>
              <TableCell>
              <EditIcon
                style={{ cursor: "pointer" }}
                onClick={handleEditMissionClick}
              />
              </TableCell>
              <TableCell>
              <DeleteForeverIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleDeleteMissionClick}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell>
              <TextField
                required
                name="name"
                label="Mission Title"
                value={name}
                style={{ padding: "10px"}}
                onChange={handleMissionTitle}
              />
            </TableCell>

            <TableCell>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDateTimePicker
                  id="time-picker"
                  label="Start Date/Time (UTC)"
                  format="MM/dd/yyyy"
                  value={startTime}
                  onChange={handleMissionStartTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <KeyboardDateTimePicker
                  id="time-picker1"
                  label="End Date/Time (UTC)"
                  format="MM/dd/yyyy"
                  value={endTime}
                  onChange={handleMissionEndTime}
                  minDate={startTime}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </MuiPickersUtilsProvider>
            </TableCell>

            <TableCell>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isHumanVisible}
                      onChange={handleMissionHumanVisible}
                      name="HumanVisibleSwitch"
                    />
                  }
                  label={isHumanVisible ? "Human" : "Zombie"}
                />
              </FormGroup>
            </TableCell>
            <TableCell>
              <SaveIcon
                style={{ cursor: "pointer" }}
                onClick={handleSaveMissionClick}
              />
              </TableCell>
              <TableCell>
              <BlockIcon
                style={{ color: "red", cursor: "pointer" }}
                onClick={handleCancelClick}
              />
            </TableCell>
          </>
        )}
      </TableRow>
    </>
  );
}
