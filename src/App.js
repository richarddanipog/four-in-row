import React from 'react';
import './App.css';
import Game from './components/game';
import GameMode from './components/game-mode';
import HomePage from './components/home-page';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/game-mode" component={GameMode} />
          <Route path="/game" component={Game} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;