import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProfilePage from "./pages/ProfilePage";
import GameDetailsPage from "./pages/GameDetailsPage";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/admin-pages/admin-dashboard/AdminDashboard";
import Header from "./components/header/Header";
import { ThemeProvider } from "@material-ui/styles";
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { themeActive } from "./components/shared/themeGameCards";

function App() {
  return (
    <ThemeProvider>
      <MuiThemeProvider theme={themeActive}>
        <CssBaseline />

        <Router>
          <Switch>
            <Route exact path="/">
              {/* <Header /> */}
              <Home />
            </Route>
            <Route path="/login" component={LoginPage}>
              {/* <Header />
          <LoginPage /> */}
            </Route>
            <Route
              path="/admin"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} component={AdminPage} exact />
                  <Route path={`${url}/game/:id`} component={AdminDashboard} />
                </>
              )}
            ></Route>

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
      </MuiThemeProvider>
    </ThemeProvider>
  );
}

export default App;
