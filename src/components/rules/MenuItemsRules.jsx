import React from "react";
import { useHistory } from "react-router";
import { HomeRounded } from "@material-ui/icons";
import MenuIcon from "../menu-items/MenuIcon";

export default function MenuItemRules() {
  const history = useHistory();
  const handleClickHome = () => {
    history.push("/");
  };

  return (
    <div>
      <MenuIcon
        menuIcon={<HomeRounded />}
        title={"Home "}
        onClick={handleClickHome}
      />
    </div>
  );
}
