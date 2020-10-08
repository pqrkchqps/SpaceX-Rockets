import React from 'react';
import './App.scss';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import RocketPageContainer from './containers/RocketPageContainer'
import RocketCardContainer from './containers/RocketCardContainer'

function App() {

  return (
    <Router>
      <div className="App">
        {/*header links back to root of the site*/}
        <header className="App-header">
          <Link to="/"><h1 className="App-title">SpaceX Rockets</h1></Link>
        </header>
        <Switch>
          {/*RocketPageContainer uses the id embeded in the url*/}
          <Route path='/rocket/:id'>
            <RocketPageContainer />
          </Route>
          {/*if it is not a RocketPage load root of site RocketCardContainer*/}
          <Route path='/'>
            <RocketCardContainer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
