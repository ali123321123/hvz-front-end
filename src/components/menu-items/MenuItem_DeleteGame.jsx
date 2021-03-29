import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import DialogPopUp from "../admin-pages/admin-dashboard/DialogPopUp";
import { useLocation } from "react-router-dom";
import { Delete } from "@material-ui/icons";
import { getTokenInStorage } from "../../utils/tokenHelper";
import { fetcherToken } from "../../services/FetcherFunction";
import Endpoints from "../../services/endpoints";

const MenuItem_DeleteGame = ({ game }) => {
  const location = useLocation();

  const [openPopUp, setopenPopUp] = useState(false);
  const [status, setStatus] = useState(null);

  const deleteGame = () => {
    if (window.confirm("Do you want to delete this game?")) {
      fetch(`${Endpoints.GAME_API}/${game.id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + getTokenInStorage(),
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      }).then((res) => res.json().then((res) => console.warn("result", res)));
    }
  };

  //Open PopUps
  const handleClickOpenPopUp = () => {
    setopenPopUp(true);
  };

  //Close PopUp On Button NO
  const handleClosePopUp = () => {
    setopenPopUp(false);
  };

  const handleGameState = () => {
    setopenPopUp(false);
    deleteGame();
  };

  return (
    <div>
      {/* DIALOG: START | END GAME */}
      <article>
        {openPopUp && (
          <DialogPopUp
            dialogTitle={game.name}
            dialogText={`Would you like to Delete this game? `}
            setopenPopUp={setopenPopUp}
            handleClosePopUp={handleClosePopUp}
            handleGameState={handleGameState}
          />
        )}
      </article>

      <article>
        <Tooltip
          arrow
          placement={"bottom"}
          aria-label="Delete Game"
          title="Delete Game"
        >
          <ListItem
            disabled={game.gameComplete ? true : false}
            button
            // onClick={handleClickOpenPopUp}
            onClick={() => deleteGame(game.id)}
            aria-label="start game"
            variant="danger"
          >
            <ListItemIcon>{<Delete />}</ListItemIcon>
            <ListItemText primary="Delete Game" />
          </ListItem>
        </Tooltip>
      </article>

      <button
        onClick={(game) =>
          window.confirm("Are you sure you wish to delete game?") &&
          deleteGame(game.id) &&
          document.write("Deleted")
        }
      >
        Delete Game
      </button>
    </div>
  );
};

export default MenuItem_DeleteGame;
