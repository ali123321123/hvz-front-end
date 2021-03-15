import Main from "../components/main/Main";
import GameList from "../components/game-list/GameList";
import AdminDashboard from "../components/admin-pages/AdminDashboard";

function Home() {
  return (
    <Main>
      <AdminDashboard />
    </Main>
  );
}

export default Home;
