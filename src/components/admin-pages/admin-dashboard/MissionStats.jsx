import { React, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import useSWR from "swr";
import { fetcherToken } from "../../../services/FetcherFunction";
import Endpoints from "../../../services/endpoints";
import { getTokenInStorage } from "../../../utils/tokenHelper";

export default function MissionStats() {
  const moment = require("moment");

  const [mission, setMission] = useState();

  //Fech Missions
  const {
    data: missions,
    error: missionsError,
  } = useSWR(`${Endpoints.MISSION_API}`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  useEffect(() => {
    if (missions) {
      setMission(missions);
    }
  }, [missions]);

  return (
    <>
      <Title>Missions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Mission</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Mission for:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {mission.map((m) => (
            <TableRow key={m.id}>
              <TableCell>{m.name}</TableCell>
              <TableCell>
                {moment(`${m.startTime}`).format("MMMM Do YYYY, HH:mm ")}
              </TableCell>
              <TableCell>
                {moment(`${m.endTime}`).format("MMMM Do YYYY, HH:mm ")}
              </TableCell>
              <TableCell>{m.isHumanVisible ? `Human` : `Zombie`}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  );
}
