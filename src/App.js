import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { themeActive } from "./components/shared/themeGameCards";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import GameChatPage from "./pages/GameChatPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/admin-pages/admin-dashboard/AdminDashboard";
import Header from "./components/header/Header";
import RegisterPage from "./pages/RegisterPage";
import RulesPage from "./pages/RulesPage";

function App() {
  return (
    <MuiThemeProvider theme={themeActive}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/rules" component={RulesPage} />
          <Route path="/login" component={LoginPage} />

          <Route path="/register" component={RegisterPage} />
          <Route
            path="/admin"
            render={({ match: { url } }) => (
              <>
                <Route path={`${url}/`} component={AdminPage} exact />
                <Route path={`${url}/game/:id`} component={AdminDashboard} />
              </>
            )}
          ></Route>

          <Route path="/profile/">
            <ProfilePage />
          </Route>
          <Route path="/game/:id/chat">
            <GameChatPage />
          </Route>
          <Route path="/game/:id">
            <GameDetailsPage />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
