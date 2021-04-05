import { useEffect } from "react";
import useSWR from "swr";
import { fetcherToken } from "../../services/FetcherFunction";
import { getTokenInStorage } from "../../utils/tokenHelper";
import Endpoints from "../../services/endpoints";
import AccordianRowMissions from "./AccordianRowMissions";

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
      {missions?.map((m) => (
        <AccordianRowMissions m={m} />
      ))}
    </>
  );
};

export default AccordionMissions;
