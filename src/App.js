import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/admin-pages/admin-dashboard/AdminDashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/edit">
          <AdminDashboard />
        </Route>
        <Route path="/profile/:id">
          <ProfilePage />
        </Route>
        <Route path="/game/:id">
          <GameDetailsPage />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
