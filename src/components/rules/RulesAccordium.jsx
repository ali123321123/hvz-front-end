import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AppbarMainMenu from "../shared/AppbarMainMenu";
import MenuItemsRules from "./MenuItemsRules"

const useStyles = makeStyles((theme) => ({
  root: {
    width: '60%',
    marginTop: '10%',
    margin: 'auto',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    backgroundColor: "",
  },
}));

export default function SimpleAccordion() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <AppbarMainMenu
        menuTitle={`Rules & Instructions`}
        menuItems={<MenuItemsRules />}
    />
    <h1>Rules and Instructions</h1>
    <p>Humans vs. Zombies (HvZ) is a game of tag played at schools, camps, neighborhoods,
    libraries, and conventions around the world. The game simulates the exponential spread
    of a fictional zombie infection through a population.</p>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}><b>Game Start</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The game begins with one "Patient Zero" (PZ).
        The purpose of the PZ is to infect human players by tagging them. Once tagged,
        a human becomes a zombie for the remainder of the game.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}><b>Objective: Zombies</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The Zombies win when all human players have been tagged and turned into zombies.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
        
          <Typography className={classes.heading}><b>Objective: Humans</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          The Humans win by surviving until the game ends.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
        
          <Typography className={classes.heading}><b>Zombie Tag</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          A zombie contaminates humans by tagging them. When tagged, the humans is required to provide the killing
          zombie with their bite code, to be registerd as an official kill. The contamiated player is now a part 
          of the zombie team and will join them in the fight to exterminate the human population.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
        
          <Typography className={classes.heading}><b>Human Defence</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Human players are able to defend themselves against the zombie horde using Nerf
          weapons and clean, rolled-up socks which may be thrown to stun a zombie for 15 minutes.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
        
          <Typography className={classes.heading}><b>Squads</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Human players who are not in a squad, can join or create squads. Squads are smaller groups of players
          intended to be used as a tool for improved teamwork in the fight against zombies.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
        
          <Typography className={classes.heading}><b>Missions</b></Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Missions can only be created by Admin users. Missions are intended to provide human players with 
          objectives which are marked on the game map.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
