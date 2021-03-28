import React from "react";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Chip from '@material-ui/core/Chip';
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: "auto",
    borderBottom: "1px solid grey",
  },
}));

export default function GameChatMessage({ chat, username}) {
  const moment = require("moment");
  const classes = useStyles();
  return (
    <Grid container spacing={1} xs={12} className={classes.root}>
      <Grid container item xs={3}>
        <Grid item xs={5}>
          {moment(`${chat.chatTime}`).format("HH:mm-ddd")}
        </Grid>
        <Grid item xs={7}  style={{textAlign:"right"}}>
          <Chip style={{width: "100%"}}size="small" label={chat.username}color={chat.username === username?  "secondary": "primary"}/> 
        </Grid>
      </Grid>
      <Grid item xs={8}>
        {chat.message}
      </Grid>
    </Grid>
  );
}
