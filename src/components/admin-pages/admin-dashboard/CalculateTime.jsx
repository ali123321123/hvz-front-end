import { React, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Box, LinearProgress, TableCell } from "@material-ui/core";

const CalculateTime = ({ game }) => {
  const moment = require("moment");

  const [progress, setProgress] = useState(10);
  const [timeCalculation, setTimeCalculation] = useState();
  const [calculationText, setCalculationText] = useState("");

  const currentDate = new Date();
  const startTime = new Date(game.startTime);
  const endTime = new Date(game.endTime);

  let timeDifferenceSeconds = currentDate.getTime() - startTime.getTime();

  let timeDifferenceMinutes = Math.floor(timeDifferenceSeconds / 60000);

  const gameTimeLeft = Math.abs(endTime.getTime() - currentDate.getTime());
  const gameTimeLeftMinutes = Math.floor(gameTimeLeft / 60000);

  const totalGameTime = Math.abs(endTime.getTime() - startTime.getTime());
  const totalGameTimeMinutes = Math.floor(totalGameTime / 60000);
  const progressValue = gameTimeLeft / totalGameTime;
  const timeToGameStart = Math.abs(endTime.getTime() - currentDate.getTime());
  let timeToGameStartMinutes = Math.floor(timeToGameStart / 60000);

  useEffect(() => {
    if (game) {
      if (timeDifferenceSeconds > 0) {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? progressValue : prevProgress + 10
        );
        setTimeCalculation(timeDifferenceMinutes);
        setCalculationText("since game started");
      } else {
        setProgress(0);
        setTimeCalculation(timeToGameStartMinutes);
        setCalculationText("time to game start");
      }
    }
  }, [game]);
  return (
    <>
      <TableCell alignItems="center">
        {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}
      </TableCell>
      <TableCell>
        {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
      </TableCell>

      <Typography variant="h4" style={{ marginTop: "10px" }}>
        {timeCalculation} minutes
      </Typography>

      <Box display="flex" alignItems="center">
        <Box width="90%" mr={1}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
      </Box>

      <Typography color="primary">{calculationText}</Typography>
    </>
  );
};

export default CalculateTime;
