import Main from "../components/main/Main";
import GameList from "../components/game-list/GameList";
import AdminDashboard from "../components/admin-pages/admin-dashboard/AdminDashboard";

function Home() {
  return (
    <Main>
      <AdminDashboard />
      <GameList />
    </Main>
  );
}

export default Home;
