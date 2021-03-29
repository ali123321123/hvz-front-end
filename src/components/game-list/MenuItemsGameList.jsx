import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import BrightnessMedium from "@material-ui/icons/BrightnessMedium";
import MenuIcon_ThemeToggle from "../menu-items/MenuIcon_ThemeToggle";
import MenuIcon from "../menu-items/MenuIcon";
import {
  AccountCircle,
  QueryBuilder,
  RadioButtonChecked,
  RadioButtonUnchecked,
  Timelapse,
} from "@material-ui/icons";
import Auth from "../../utils/authentication";
import { useHistory } from "react-router";

export default function MenuItemsGameList() {
  const history = useHistory();

  const handleProfileOption = () => {
    if (Auth.userIsLoggedIn()) {
      history.push("/profile");
    } else {
      history.push("/login");
    }
  };

  return (
    <div>
      {/* TOGGLE THEME */}
      <MenuIcon_ThemeToggle />

      <Divider />

      <MenuIcon
        menuIcon={<AccountCircle />}
        title={"Profile"}
        onClick={handleProfileOption}
      />

      <MenuIcon menuIcon={<Timelapse />} title={"Active Games"} />

      <MenuIcon menuIcon={<QueryBuilder />} title={"Upcoming Games"} />

      <MenuIcon menuIcon={<RadioButtonChecked />} title={"Completed Games"} />
    </div>
  );
}
