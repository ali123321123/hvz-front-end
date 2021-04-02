import { PostAdd } from "@material-ui/icons";
import { React, useState } from "react";
import MenuIcon from "../menu-items/MenuIcon";
import GameKillPopup from "./GameKillPopup";

const MenuItemsGameDetail = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <MenuIcon
        menuIcon={<PostAdd />}
        title={"Registrate Kill "}
        onClick={handleClickOpen}
      />

      {open && <GameKillPopup open={open} setOpen={setOpen} />}
    </div>
  );
};

export default MenuItemsGameDetail;
