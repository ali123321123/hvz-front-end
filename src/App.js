import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'

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
        </Switch>
    </Router>
  );
}

export default App;
