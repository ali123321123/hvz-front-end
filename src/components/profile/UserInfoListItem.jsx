import { React, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

export default function UserInfoListItem({ primaryValue, secondaryValue, avatar }) {

  return (
    <ListItem>
              <ListItemAvatar>
                <Avatar>
                  {avatar}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={primaryValue} secondary={secondaryValue} />
            </ListItem>
  );
}
