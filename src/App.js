import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
        <Switch>
            <Route exact path="/">
                <Header />
                <Home />
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
