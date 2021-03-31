import React from "react";
import { useState, useEffect } from "react";
import PeopleIcon from "@material-ui/icons/People";
import { AddLocation, Delete, Gavel, PostAdd } from "@material-ui/icons";
import { Cloudinary } from "cloudinary-core";
import { Route, useHistory } from "react-router";
import CreateGameForm from "../admin-gameCard/CreateGameForm";
import MenuItem_StartGame from "../../menu-items/MenuItem_StartGame";
import MenuItem_OpenRegistration from "../../menu-items/MenuItem_OpenRegistration";
import MenuIcon from "../../menu-items/MenuIcon";
import { Divider } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import CreateMissionForm from "./CreateMissionForm";
import MenuItem_DeleteGame from "../../menu-items/MenuItem_DeleteGame";

export default function MenuItemsAdminDashboard({game}) {
  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });
  const location = useLocation();


  const [open, setOpen] = useState(false);
  const [openMission, setOpenMission] = useState(false);

  const [centerArea, setCenterArea] = useState([]);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenMission = () => {
    setOpenMission(true);
  };

  const handleClickRules = () => {
    history.push("/rules");
  };

  
  return (
    <div>
      {/* BTN: START && END  WITH DIALOG POPUP*/}
      <MenuItem_StartGame game={game} />
      {/* BTN: REGISTRATION WITH DIALOG POPUP*/}
      <MenuItem_OpenRegistration
        disabled={game.gameComplete || game.gameStarted ? true : false}
      />
      {/* BTN: ADD MISSION */}
      {/* <MenuIcon
        disabled={game.gameComplete ? true : false}
        menuIcon={<AddLocation />}
        title={"Add Mission"}
        onClick={handleClickOpenMission}
      /> */}
      {/* BTN: ADD EDIT PLAYERS */}
      {/* <MenuIcon
        disabled={game.gameComplete ? true : false}
        menuIcon={<PeopleIcon />}
        title={"Edit Players"}
      /> */}
      {/* CREATE NEW GAME */}
      <MenuIcon
        menuIcon={<PostAdd />}
        title={"Create new Game"}
        onClick={handleClickOpen}
      />
      {/* DELETE GAME */}
      <MenuItem_DeleteGame game={game} />

      {open && <CreateGameForm open={open} setOpen={setOpen} />}
      {openMission && (
        <CreateMissionForm
          openMission={openMission}
          setOpenMission={setOpenMission}
          game={game}
        />
      )}
      {/*Rules & Instruction*/}
      <MenuIcon
        menuIcon={<Gavel />}
        title={"Rules & Instructions"}
        onClick={handleClickRules}
      />
    </div>
  );
}
