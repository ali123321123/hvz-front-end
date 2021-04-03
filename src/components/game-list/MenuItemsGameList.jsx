import React from "react";
import MenuIcon from "../menu-items/MenuIcon";
import {
  AccountCircle,
  QueryBuilder,
  RadioButtonChecked,
  Timelapse,
  Gavel,
} from "@material-ui/icons";
import Auth from "../../utils/authentication";
import { useHistory } from "react-router";

export default function MenuItemsGameList({
  handleClickActive,
  handleClickUpcoming,
  handleClickCompleted,
}) {
  const history = useHistory();

  const handleProfileOption = () => {
    if (Auth.userIsLoggedIn()) {
      history.push("/profile");
    } else {
      history.push("/login");
    }
    if (Auth.userIsAdmin()) {
      history.push("/admin");
    }
  };
  const handleClickRules = () => {
    history.push("/rules");
  };

  return (
    <div>
      <MenuIcon
        menuIcon={<AccountCircle />}
        title={"Profile"}
        onClick={handleProfileOption}
      />

      <MenuIcon
        menuIcon={<Timelapse />}
        title={"Active Games"}
        onClick={handleClickActive}
      />

      <MenuIcon
        menuIcon={<QueryBuilder />}
        title={"Upcoming Games"}
        onClick={handleClickUpcoming}
      />

      <MenuIcon
        menuIcon={<RadioButtonChecked />}
        title={"Completed Games"}
        onClick={handleClickCompleted}
      />

      {/*Rules & Instruction*/}
      <MenuIcon
        menuIcon={<Gavel />}
        title={"Rules & Instructions"}
        onClick={handleClickRules}
      />
    </div>
  );
}
