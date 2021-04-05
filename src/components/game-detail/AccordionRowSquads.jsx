import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  withStyles,
  Fab,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import Endpoints from "../../services/endpoints";
import { getTokenInStorage } from "../../utils/tokenHelper";

const AccordionRowSquads = ({ s, playerId }) => {
  const moment = require("moment");
  const [expanded, setExpanded] = useState(false);

  console.log(s);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleJoinSquadYesClick = () => {
    let data = {
        gameId: s.gameId,
        squadId: s.id,
        playerId: playerId,
      };
      console.log(data);
      fetch(`${Endpoints.SQUADS_API}/${data.squadId}/join`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + getTokenInStorage(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => res.json().then((res) => console.warn("result", res)));
      window.location.reload()
  }
  
  const handleJoinSquadClick = () => setJoinSquadDialogOpen(true);
  const [joinSquadDialogOpen, setJoinSquadDialogOpen] = useState();

  const Accordion = withStyles({
    root: {
      border: '1px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
    },
    expanded: {},
  })(MuiAccordion);
  
  const AccordionSummary = withStyles({
    root: {
      backgroundColor: 'rgba(0, 0, 0, .03)',
      borderBottom: '1px solid rgba(0, 0, 0, .125)',
      marginBottom: -1,
      minHeight: 56,
      '&$expanded': {
        minHeight: 56,
      },
    },
    content: {
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
  })(MuiAccordionSummary);

  return (
    <>
      <Accordion
        key={s.id}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
        <Grid item xs={4}>
          {s.name}
        </Grid>
        <Grid item xs={4}>
              <Typography
                variant="body2"
                style={{ fontWeight: "bold" }}
              >
                {s.squadMembers.filter(s => s.isHuman).length}/{s.squadMembers.length}
              </Typography>
        </Grid>
        <Grid item xs={4}>
        <Fab
            color="secondary"
            aria-label="Join Squad button"
            variant="extended"
            size="medium"
            onClick={handleJoinSquadClick}
          >
            <>
              Join
              <PlayArrowIcon />
            </>
          </Fab>
        </Grid>
        </AccordionSummary>

        <AccordionDetails>
          <Grid container >
              <Grid xs={5}>
                  <Grid xs={12}>
                      <Typography style={{ fontWeight: "bold", borderBottom:"1px solid black" }}>SquadMembers</Typography>
                  </Grid>
                  {s.squadMembers.map(sm => (
                      <Typography>{sm.name}</Typography>
                  ))}
              </Grid>
              <Grid xs={5}>
                  <Grid xs={12}>
                      <Typography style={{ fontWeight: "bold", borderBottom:"1px solid black" }}>Faction</Typography>
                  </Grid>
                  <Typography>{s.isHuman ? `Human` : `Zombie`}</Typography>
                  
              </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Dialog
              aria-labelledby="simple-dialog-title"
              open={joinSquadDialogOpen}
            >
              <DialogTitle id="simple-dialog-title">
                Are you sure you want to join this squad
              </DialogTitle>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleJoinSquadYesClick}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setJoinSquadDialogOpen(false)}
              >
                Cancel
              </Button>
            </Dialog>
    </>
  );
};
export default AccordionRowSquads;
