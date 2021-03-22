import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import NotFound from "./pages/NotFound";
import Header from "./components/header/Header";

function App() {
  return (
    <Router>
      <Switch> 
        <Route exact path="/">
          <Header />
          <Home />
        </Route>
        <Route path="/login">
          <Header />
          <LoginPage />
        </Route>
        <Route path="/admin">
          <Header />
          <AdminPage />
        </Route>
        <Route path="/profile/:id">
          <Header />
          <ProfilePage />
        </Route>
        <Route path="/game/:id">
          <Header />
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
