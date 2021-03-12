import Main from "../components/main/Main";
import GameList from "../components/game-list/GameList";
import Temp from "../components/game-list/Temp";

function Home() {
  return (
    <Main>
      <Temp />
      <GameList />
    </Main>
  );
}

export default Home;
