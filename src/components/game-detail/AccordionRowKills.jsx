import { React, useState, useEffect } from "react";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import { getTokenInStorage } from "../../utils/tokenHelper";
import Endpoints from "../../services/endpoints";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const AccordianRowKills = ({ k }) => {
    const moment = require("moment");
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    //Fech Killer
    const {
        data: killer,
        error: killerError,
    } = useSWR(`${Endpoints.PLAYERS_API}/${k.killerId}`, (url) =>
        fetcherToken(url, getTokenInStorage())
    );
    useEffect(() => {
        console.log(killerError);
    }, [killerError]);

    //Fetch Victim
    const {
        data: victim,
        error: victimError,
    } = useSWR(`${Endpoints.PLAYERS_API}/${k.victimId}`, (url) =>
        fetcherToken(url, getTokenInStorage())
    );
    useEffect(() => {
        console.log(victimError);
    }, [victimError]);


    return (
        <div>
            <Accordion
                key={k.id}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography > <b>{killer.name}</b> killed <b>{victim.name}</b> {moment(`${k.tod}`).format(" HH:mm ")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Description: {k.story}
                    </Typography>
                </AccordionDetails>

                <AccordionDetails>
                    <Typography>
                        Time: {moment(`${k.tod}`).format("MMMM Do YYYY, HH:mm ")}
                    </Typography>
                </AccordionDetails>

                <AccordionDetails>
                    <Typography>
                        Killer: {killer.name}
                    </Typography>
                </AccordionDetails>

                <AccordionDetails>
                    <Typography>
                        Victim: {victim.name}
                    </Typography>
                </AccordionDetails>
                


            </Accordion>
            <br></br>
        </div>
    )
}
export default AccordianRowKills;