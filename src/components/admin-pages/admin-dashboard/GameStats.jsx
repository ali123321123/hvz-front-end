import { React, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { useSelector } from "react-redux";
import { getTokenInStorage } from "../../../utils/tokenHelper";
import Title from "./Title";

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function GameStats({ game }) {
  const classes = useStyles();

  const user = useSelector((state) => state.loggedInUser);

  // console.log(game);
  console.log("game id", game.id);

  const [player, setPlayer] = useState({});
  const [humanPlayers, setHumanPlayers] = useState([]);
  const [playerBiteCode, setPlayerBiteCode] = useState();
  const { hoursPlayed, setHoursPlayed } = useState();

  //Fech players
  const {
    data: players,
    error: playersError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/players`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );
  console.log(game);
  console.log(players);
  //Fech Squad
  const {
    data: squads,
    error: squadsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/squads`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  console.log(squads);

  return (
    <>
      <Title>Game info </Title>
      {/* <h2>{playerBiteCode}</h2> */}

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Player Name</TableCell>
            <TableCell>Player Type</TableCell>
            <TableCell>Bite Code</TableCell>
            <TableCell>Squad Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players?.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.isHuman ? `Human` : `Zombie`}</TableCell>
              <TableCell>{p.biteCode}</TableCell>
              {/* <TableCell>{p.squad}</TableCell> */}
            </TableRow>
          ))}
          {/* {players.map((player) => (
            <TableRow key={player.id}>
              <TableCell>
                {moment(`${game.startTime}`).format("MMMM Do YYYY, HH:mm ")}
              </TableCell>
              <TableCell>
                {moment(`${game.endTime}`).format("MMMM Do YYYY, HH:mm ")}
              </TableCell>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.player}</TableCell>
              <TableCell>{player.biteCode}</TableCell>
              <TableCell>{player.squad}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  );
}

// const startDate = game.startTime;
// const currentDate = new Date();
// const endDate = game.endTime;

// const startTime = new Date(startDate);
// startTime.getTime();
// console.log(startTime.getHours());

// const date = new Date("Thur Mar 25 2021 10:00:00");
// console.log(date.getHours());
// console.log(date.setHours(date.getHours() - 5));
// console.log(date.setMinutes(date.getMinutes() - 30));

// const timeDiff = Math.abs(currentDate.getTime() - startTime.getTime());
// var minutes = Math.floor(timeDiff / 60000);
// var seconds = ((timeDiff % 60000) / 1000).toFixed(0);

// if (currentDate > endDate) {
//   setHoursPlayed(currentDate - startDate);
// }
// console.log("time diff", timeDiff);
// console.log(seconds, "seconds");
// console.log(minutes, "min");
// console.log(startTime);
// console.log(game.startTime);
// console.log(currentDate);
