import React, { useEffect, useState } from "react";
import Main from "../components/main/Main";
import GameDetail from "../components/game-detail/GameDetail";
import Header from "../components/header/Header";

function GameDetailsPage(props) {
    const [stateFromPopUp, setStateFromPopUp] = useState();
  useEffect(() => {
    if (props.location) {
      setStateFromPopUp(props.location.state);
    }
  }, []);
  return (
    <>
      <Header />
      <Main>
        <GameDetail game={stateFromPopUp}/>
      </Main>
    </>
  );
}

export default GameDetailsPage;
