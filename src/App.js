import React from "react";
import Dashboard from "./Containers/Dashboard";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import "./App.css";
const LazyGlobe = React.lazy(() => import('./Containers/Globe'));

export const LoadingPage = () =>
  <div className="loadingPage">
    <span>Loading...</span>
  </div>

const App = () => {
  return (
    <React.Suspense fallback={<LoadingPage />}>
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
