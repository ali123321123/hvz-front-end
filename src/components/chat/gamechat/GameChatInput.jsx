import React, { useState } from "react";
import { useParams } from "react-router";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import { makeStyles, Paper } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import DirectionsIcon from "@material-ui/icons/Directions";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import SendIcon from '@material-ui/icons/Send';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "90%",
    margin: "auto",
    marginTop: "2%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
export default function GameChatInput({isGlobal}) {
  const { id: gameId } = useParams();
  const [message, setMessage] = useState("");
  const postMessage = () => {
      if(message === "") return
    let data = {
      message,
      isGlobal,
      gameId: gameId,
    };
    fetch(`${Endpoints.GAME_API}/${gameId}/chats`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + getTokenInStorage(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json().then((res) => console.warn("result", res)));

    setMessage("");
  };

  const classes = useStyles();

  const handleMessage = e => setMessage(e.target.value);
  const handleMessageEnterPress = e => {
      if(e.key === 'Enter') postMessage()
  }

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        value={message}
        onChange={handleMessage}
        onKeyPress={handleMessageEnterPress}
        placeholder={`Send new chatmessage to ${isGlobal ? 'everyone' : 'your faction'}`}
        inputProps={{ "aria-label": "Send new chatmessage" }}
      />

      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="directions"
        onClick={postMessage}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
