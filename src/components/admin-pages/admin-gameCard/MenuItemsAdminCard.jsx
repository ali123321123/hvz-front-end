import React from "react";
import { useState } from "react";
import { HomeRounded, PostAdd } from "@material-ui/icons";
import MenuIcon_ThemeToggle from "../../menu-items/MenuIcon_ThemeToggle";
import MenuIcon from "../../menu-items/MenuIcon";
import CreateGameForm from "./CreateGameForm";
import { Divider } from "@material-ui/core";
import { useHistory } from "react-router";

export default function MenuItemsAdminCard() {
  const history = useHistory();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickHome = () => {
    history.push("/");
  };

  return (
    <div>
      {/* TOGGLE THEME */}
      <MenuIcon_ThemeToggle />

      <Divider />

      {/* BTN: HOME */}
      <MenuIcon
        menuIcon={<HomeRounded />}
        title={"Home "}
        onClick={handleClickHome}
      />

      {/* CREATE NEW GAME */}
      <MenuIcon
        menuIcon={<PostAdd />}
        title={"Create new Game"}
        onClick={handleClickOpen}
      />

      {open && <CreateGameForm open={open} setOpen={setOpen} />}
    </div>
  );
}
