import React from 'react';
import Dashboard from './Containers/Dashboard';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoadingPage } from './Components/Loading';
import './App.css';

const LazyGlobe = React.lazy(() => import('./Containers/Globe'));

const App = () => {
  return (
    <React.Suspense>
      <Router>
        <Switch>
          <Route exact path="/globe" component={LazyGlobe} />
          <Route path="/" component={Dashboard} />
        </Switch>
      </Router>
    </React.Suspense>
  );
};

export default App;
