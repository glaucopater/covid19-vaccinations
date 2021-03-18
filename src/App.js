import React from "react";
import "./App.css";
import Dashboard from "./Containers/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const LazyGlobe = React.lazy(() => import('./Containers/Globe'));

const App = () => {
  return (
    <React.Suspense fallback={<span>Loading...</span>}>
      <Router>
        <Switch>
          <Route exact path="/globe" component={LazyGlobe} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </React.Suspense>
  )
}

export default App;
