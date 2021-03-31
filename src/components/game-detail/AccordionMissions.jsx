import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import { getTokenInStorage } from "../../utils/tokenHelper";
import Endpoints from "../../services/endpoints";
import AccordianRowMissions from "./AccordianRowMissions";
import AccordionRowSquads from "./AccordionRowSquads";

const AccordionMissions = ({ game }) => {
  const [playerSquad, setPlayerSquad] = useState({});
  //Fech Missions
  const {
    data: missions,
    error: missionsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/missions`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  const {
    data: squads,
    error: squadsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/squads`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  console.log(squads);

  useEffect(() => {
    console.log(missionsError);
  }, [missionsError]);

  useEffect(() => {
    if (squads) {
      setPlayerSquad(squads.filter((s) => s.squadMembers.name));
      console.log(playerSquad);
      console.log(squads);
    }
  }, [squads]);

  console.log(missions);
  console.log(game);
  return (
    <>
      {missions?.map((m) => (
        <AccordianRowMissions m={m} />
      ))}

      {squads?.map((s) => (
        <AccordionRowSquads s={s} />
      ))}
    </>
  );
};

export default AccordionMissions;
