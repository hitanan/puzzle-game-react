import React, { Component } from 'react';
import Game1 from './components/Game1.js';
// import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase, { auth, provider } from './firebase.js';

export const ThemeContext = React.createContext(null);

const TableDB = 'users';
const usersRef = firebase.database().ref(TableDB);

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  logout() {
    auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }
  login(score) {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({user}, ()=> {
          // Save score.
          this.save(score);
        });

        
      });
  }

  updateState(score) {
    var newUser = this.state.user;
    newUser.score = score;
    this.setState({
      user : newUser
    });
  }

  updateDatabase(score, users) {
    //local
    this.updateState(score);

    //server
    if (!users) {
      usersRef.on('value', (snapshot) => {
        let users = snapshot.val();
        this.updateDataItem(score, users);
      });
    } else {
      this.updateDataItem(score, users);
    }

  }

  updateDataItem(score, users) {
    for (let item in users) {
      if (users[item].uid === this.state.user.uid) {
        firebase.database().ref(TableDB +'/' +item).update({score: score}, function(error) {
          if (error) {
            // The write failed...
          } else {
            // Data saved successfully!
          }
        });
        break;
      }
    }
  }

  save(score) {
    if (!this.state.user) {
      return;
    }
    
    if (this.state.user.score) {
      if (score > this.state.user.score) {
        this.updateDatabase(score);
      }
    } else  {
      // get user score in the first time after login.
      usersRef.on('value', (snapshot) => {
        let users = snapshot.val();
        let found = false;

          for (let item in users) {
            if (users[item].uid === this.state.user.uid) {
              if (score > users[item].score) {
                this.updateDatabase(score, users);
              } else {
                this.updateState(users[item].score);
              }

              found = true;
              break;
            }
          }
          if (!found) {
            // save new
            const item = {
              uid : this.state.user.uid, 
              name: this.state.user.displayName,
              score: score
            }
            usersRef.push(item);
            this.updateState(score);
          }
        
      });
    }

  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.user}>
        <Router>
          <div className="App">
            <nav>
              <Link to="/">Home</Link>
              <Link to="/game1">Game1</Link>
              <Link to="/game2">Game2</Link>
            </nav>
            <Route path="/game1" component={() => <Game1 login={(s) => this.login(s)} logout={() => this.logout()} save={(s) => this.save(s)} />} />
            <Route path="/game2" component={() => <Game1 login={(s) => this.login(s)} logout={() => this.logout()} save={(s) => this.save(s)} />} />
          </div>
        </Router>
      </ThemeContext.Provider>
    );
  }
}

export default App;
