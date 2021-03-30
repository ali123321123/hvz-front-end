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

export default function MenuItemsGameList() {
  const history = useHistory();

  const handleProfileOption = () => {
    if (Auth.userIsLoggedIn()) {
      history.push("/profile");
    } else {
      history.push("/login");
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

      <MenuIcon menuIcon={<Timelapse />} title={"Active Games"} />

      <MenuIcon menuIcon={<QueryBuilder />} title={"Upcoming Games"} />

      <MenuIcon menuIcon={<RadioButtonChecked />} title={"Completed Games"} />

      {/*Rules & Instruction*/}
      <MenuIcon
        menuIcon={<Gavel />}
        title={"Rules & Instructions"}
        onClick={handleClickRules}
      />
    </div>
  );
}
