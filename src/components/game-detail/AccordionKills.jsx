import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import { getTokenInStorage } from "../../utils/tokenHelper";
import Endpoints from "../../services/endpoints";
import AccordionRowKills from "./AccordionRowKills";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    makeStyles,
    Typography,
    useTheme,
    Fab,
  } from "@material-ui/core";
import Title from "../admin-pages/admin-dashboard/Title";
import GameKillPopup from "./GameKillPopup"

const AccordionKills = ({ game, player }) => {
    // Fetch Kills
    const {
        data: kills,
        error: killsError,
    } = useSWR(`${Endpoints.GAME_API}/${game.id}/kills`, (url) =>
    fetcherToken(url, getTokenInStorage())
    );

    useEffect(() =>{
        console.log(killsError);
    }, [killsError]);

    const useStyles = makeStyles((theme) => ({
        root: {},
      }));
    
      
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        if (open === false){
            setOpen(true);
        }
        else {
            setOpen(false);
        }
    
    };
    
    return (
        <>
        <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
            }}
            >
        <Title stickyHeader>Kill List</Title>
        <Fab
              color="secondary"
              aria-label="Add Kill button"
              variant="extended"
              size="medium"
              onClick={handleClickOpen}
            >
              <>
                Register Kill
                {open && <GameKillPopup open={open} setOpen={setOpen} game={game} player={player} />}
              </>
             
            </Fab>
        </div>
            {kills?.map((k) => (
                <AccordionRowKills k={k} />
            ))}
        
        </>
    )   
}
export default AccordionKills;