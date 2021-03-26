import { React, useEffect } from "react";
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
import { getTokenInStorage } from "../../../utils/tokenHelper";
import { useSelector } from "react-redux";
import Title from "./Title";

export default function GameStats({ game }) {
  const user = useSelector((state) => state.loggedInUser);

  //Fech players
  const {
    data: players,
    error: playersError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/players`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  //Fech Squad
  const {
    data: squads,
    error: squadsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/squads`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  useEffect(() => {
    if (players) {
      players.forEach(
        (p) =>
          (p.squad = squads.find((s) =>
            s.squadMembers.some((sm) => sm.playerId == p.id)
          ))
      );
    }
  }, []);

  return (
    <>
      <Title>Game info </Title>

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
              <TableCell>
                {p.isHuman
                  ? `Human`
                  : p.isPatientZero
                  ? `Patient Zero`
                  : `Zombie`}
              </TableCell>
              <TableCell>{p.biteCode}</TableCell>
              <TableCell>{p.squadName ? p.squadName : `No Squad`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
