import { useEffect } from "react";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import { getTokenInStorage } from "../../utils/tokenHelper";
import Endpoints from "../../services/endpoints";
import AccordianRowMissions from "./AccordianRowMissions";
import Title from "../admin-pages/admin-dashboard/Title";

const AccordionMissions = ({ game }) => {
  //Fech Missions
  const {
    data: missions,
    error: missionsError,
  } = useSWR(`${Endpoints.GAME_API}/${game.id}/missions`, (url) =>
    fetcherToken(url, getTokenInStorage())
  );

  useEffect(() => {
    console.log(missionsError);
  }, [missionsError]);

  console.log(missions);

  return (
    <>
      {missions ? (
        missions.map((m) => <AccordianRowMissions m={m} />)
      ) : (
        <Title>No active Mission</Title>
      )}
    </>
  );
};

export default AccordionMissions;
