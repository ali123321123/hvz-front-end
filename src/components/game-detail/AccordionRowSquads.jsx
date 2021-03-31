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

const AccordionRowSquads = ({ s }) => {
  const moment = require("moment");
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div>
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
          <TableCell>{s.name}</TableCell>
          <TableCell>
            {s.isHumanVisible ? (
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
        </AccordionSummary>

        <AccordionDetails>
          <Typography>squad members?</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
export default AccordionRowSquads;
