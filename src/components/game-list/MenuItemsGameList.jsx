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
  Gavel,
} from "@material-ui/icons";
import Auth from "../../utils/authentication";
import { useHistory } from "react-router";

export default function MenuItemsGameList({handleClickActive, handleClickUpcoming, handleClickCompleted}) {
  const history = useHistory();

  const handleProfileOption = () => {
    if (Auth.userIsLoggedIn()) {
      history.push("/profile");
    } else {
      history.push("/login");
    }
  };
  const handleClickRules = () => {
    history.push("/rules")
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

      <MenuIcon menuIcon={<Timelapse />} title={"Active Games"} onClick={handleClickActive} />

      <MenuIcon menuIcon={<QueryBuilder />} title={"Upcoming Games"} onClick={handleClickUpcoming}/>

      <MenuIcon menuIcon={<RadioButtonChecked />} title={"Completed Games"} onClick={handleClickCompleted}/>

            {/*Rules & Instruction*/}
            <MenuIcon
        menuIcon={<Gavel />}
        title={"Rules & Instructions"}
        onClick={handleClickRules}
      />
    </div>
  );
}
