import React, { Component } from 'react';
import Game1 from './components/Game1.js';
// import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";



class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/game1">Game1</Link>
            <Link to="/game2">Game2</Link>
          </nav>
          <Route path="/game1" component={Game1} />
          <Route path="/game2" component={Game1} />
        </div>
      </Router>
    );
  }
}

export default App;
