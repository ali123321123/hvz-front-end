import Main from "../components/main/Main";
import GameList from "../components/game-list/GameList";
import AdminDashboard from "../components/admin-pages/admin-dashboard/AdminDashboard";
import AdminGameList from "../components/admin-pages/admin-gameCard/AdminGameList";

function Home() {
  return (
    <Main>
      <GameList />
      {/*
      <AdminGameList />
      <AdminDashboard />
       */}
    </Main>
  );
}

export default Home;
