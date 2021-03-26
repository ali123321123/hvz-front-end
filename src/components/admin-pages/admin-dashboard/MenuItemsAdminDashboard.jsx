import React from "react";
import { useState } from "react";
import PeopleIcon from "@material-ui/icons/People";
import { AddLocation, Delete, HomeRounded, PostAdd } from "@material-ui/icons";
import { Cloudinary } from "cloudinary-core";
import { useHistory } from "react-router";
import CreateGameForm from "../admin-gameCard/CreateGameForm";
import MenuItem_StartGame from "../../menu-items/MenuItem_StartGame";
import MenuItem_OpenRegistration from "../../menu-items/MenuItem_OpenRegistration";
import MenuIcon from "../../menu-items/MenuIcon";
import MenuIcon_ThemeToggle from "../../menu-items/MenuIcon_ThemeToggle";
import { Divider } from "@material-ui/core";

export default function MenuItemsAdminDashboard({ games }) {
  const [open, setOpen] = useState(false);
  const history = useHistory();

  console.log(games);

  const onClickDelete = () => {};

  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickHome = () => {
    history.push("/");
  };

  return (
    <div>
      <MenuIcon_ThemeToggle />

      <Divider />
      {/* BTN: HOME */}
      <MenuIcon
        menuIcon={<HomeRounded />}
        title={"Home "}
        onClick={handleClickHome}
      />

      {/* BTN: START && END  WITH DIALOG POPUP*/}
      <MenuItem_StartGame />
      {/* BTN: REGISTRATION WITH DIALOG POPUP*/}
      <MenuItem_OpenRegistration />
      {/* BTN: ADD MISSION */}
      <MenuIcon menuIcon={<AddLocation />} title={"Add Mission"} />
      {/* BTN: ADD EDIT PLAYERS */}
      <MenuIcon menuIcon={<PeopleIcon />} title={"Edit Players"} />
      {/* CREATE NEW GAME */}
      <MenuIcon
        menuIcon={<PostAdd />}
        title={"Create new Game"}
        onClick={handleClickOpen}
      />
      {/* DELETE GAME */}
      <MenuIcon
        menuIcon={<Delete />}
        title={"Delete Game"}
        onClick={onClickDelete}
      />
      {open && <CreateGameForm open={open} setOpen={setOpen} />}
    </div>
  );
}
