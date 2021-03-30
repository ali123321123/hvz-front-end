import { useEffect, useState } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import "react-datepicker/dist/react-datepicker.css";
import "date-fns";
import { DeletePlayer, UpdateFactionPlayer } from "./AdminAPI";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function GameStatsRow({ p }) {
  const moment = require("moment");

  const [faction, setFaction] = useState(
    p.isHuman ? 1 : p.isPatientZero ? 3 : 2
  );
  const noSquad = "No Squad";

  const handleDeletePlayerClick = () => setDeletePlayerDialogOpen(true);

  const handlePlayerDialogYes = (e) => DeletePlayer(e);

  const [deletePlayerDialogOpen, setDeletePlayerDialogOpen] = useState();
  
  const handleFactionChange = (e) => {
      setFaction(e.target.value)
    UpdateFactionPlayer(p, e.target.value)
  };
  return (
    <>
      <TableRow key={p.id}>
        <TableCell color="primary">{p.name}</TableCell>
        <TableCell color="primary">
          <Select
            id="factionselect"
            value={faction}
            onChange={handleFactionChange}
          >
            <MenuItem value={1}>
              <Typography variant="body2" style={{ color: "#3bbb4c" }}>
                Human
              </Typography>
            </MenuItem>
            <MenuItem value={2}>
              <Typography variant="body2" style={{ color: "#df1b55" }}>
                Zombie
              </Typography>
            </MenuItem>
            <MenuItem value={3}>
              <Typography
                variant="body2"
                style={{
                  color: "#df1b55",

                  fontStyle: "italic",
                }}
              >
                Patient Zero
              </Typography>
            </MenuItem>
          </Select>
        </TableCell>
        <TableCell>{p.biteCode}</TableCell>
        <TableCell>
          {p.squadName ? (
            p.squadName
          ) : (
            <Typography
              variant="body2"
              color="secondary"
              style={{ fontStyle: "italic" }}
            >
              {noSquad}
            </Typography>
          )}
        </TableCell>
        <TableCell>
          <DeleteForeverIcon
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => handleDeletePlayerClick(p.id)}
          />
        </TableCell>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={deletePlayerDialogOpen}
        >
          <DialogTitle id="simple-dialog-title">
            Are you sure you want to delete this player
          </DialogTitle>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handlePlayerDialogYes(p.id)}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setDeletePlayerDialogOpen(false)}
          >
            Cancel
          </Button>
        </Dialog>
      </TableRow>
    </>
  );
}
