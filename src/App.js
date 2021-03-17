import React from "react";
import "./App.css";
import Dashboard from "./Containers/Dashboard";
import Globe from "./Containers/Globe";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/globe" component={Globe} />
      </Switch>
    </Router>
  )
}

export default App;
