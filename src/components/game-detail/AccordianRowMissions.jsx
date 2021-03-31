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
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";

const AccordianRowMissions = ({ m }) => {
  const moment = require("moment");
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
      <Accordion
        key={m.id}
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <TableCell>{m.name}</TableCell>
          <TableCell>
            {m.isHumanVisible ? (
              <Typography
                variant="body2"
                style={{ color: "#3bbb4c", fontWeight: "bold" }}
              >
                Human
              </Typography>
            ) : (
              <Typography
                variant="body2"
                style={{ color: "#df1b55", fontWeight: "bold" }}
              >
                Zombie
              </Typography>
            )}
          </TableCell>

          <TableCell>
            {moment(`${m.startTime}`).format("MMMM Do YYYY, HH:mm ")}
          </TableCell>
          <TableCell>
            {moment(`${m.endTime}`).format("MMMM Do YYYY, HH:mm ")}
          </TableCell>
        </AccordionSummary>

        <AccordionDetails>
          <Typography>{m.description}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordianRowMissions;
