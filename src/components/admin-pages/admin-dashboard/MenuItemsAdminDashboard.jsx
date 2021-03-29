import React from "react";
import { useState, useEffect } from "react";
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
import UploadImages from "../../upload-images/UploadImages";
import { useLocation } from "react-router-dom";
import CreateMissionForm from "./CreateMissionForm";
import MenuItem_DeleteGame from "../../menu-items/MenuItem_DeleteGame";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import Endpoints from "../../../services/endpoints";

export default function MenuItemsAdminDashboard(props) {
  const cloudinaryCore = new Cloudinary({ cloud_name: "debyqnalg" });
  const location = useLocation();

  const [game, setGame] = useState({});

  const [open, setOpen] = useState(false);
  const [openMission, setOpenMission] = useState(false);

  const history = useHistory();

  const handleClickOpen = () => {
    setOpen(true);
  };
  console.log("location", location.state);
  const handleClickOpenMission = () => {
    setOpenMission(true);
  };

  const handleClickHome = () => {
    history.push("/");
  };

  useEffect(() => {
    setGame(location.state);
  }, [location.state]);

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
      <MenuItem_OpenRegistration
        disabled={game.gameComplete || game.gameStarted ? true : false}
      />
      {/* BTN: ADD MISSION */}
      <MenuIcon
        disabled={game.gameComplete ? true : false}
        menuIcon={<AddLocation />}
        title={"Add Mission"}
        onClick={handleClickOpenMission}
      />
      {/* BTN: ADD EDIT PLAYERS */}
      <MenuIcon
        disabled={game.gameComplete ? true : false}
        menuIcon={<PeopleIcon />}
        title={"Edit Players"}
      />
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
        />
      )}
    </div>
  );
}
