import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import BrightnessMedium from "@material-ui/icons/BrightnessMedium";
import MenuIcon_ThemeToggle from "../menu-items/MenuIcon_ThemeToggle";
import MenuIcon from "../menu-items/MenuIcon";
import { AccountCircle } from "@material-ui/icons";

export default function MenuItemsGameList() {
  const useStyles = makeStyles((theme) => ({
    registrationButton: {
      marginRight: 36,
    },
    registrationButtonHidden: {
      display: "none",
    },
    gameButton: {
      marginRight: 36,
    },
    gameButtonHidden: {
      display: "none",
    },
    customWidth: {
      maxWidth: 120,
    },
  }));
  const classes = useStyles();

  //onClick ... scroll to section?

  return (
    <div>
      {/* TOGGLE THEME */}
      <MenuIcon_ThemeToggle />

      <Divider />

      <MenuIcon menuIcon={<AccountCircle />} title={"Profile"} />

      <MenuIcon menuIcon={<BrightnessMedium />} title={"Active Games"} />

      <MenuIcon menuIcon={<BrightnessMedium />} title={"Upcoming Games"} />

      <MenuIcon menuIcon={<BrightnessMedium />} title={"Completed Games"} />
    </div>
  );
}
