import React, { Component } from 'react';
// import './App.css';
import startbutton from '../assets/images/startbutton2.png' // relative path to image 
import consgrabutton from '../assets/images/consgrabutton.png' // relative path to image 

import {ThemeContext} from '../App.js';
class Popup extends Component {

  render() {
    if (!this.props.again) {
      return (
        <div class="popup_start popup" onClick={() => this.props.reset()}>
          <img src={startbutton} alt="startbutton2" class="dis_start" />
        </div>
      );
    } else {
      return (
        <ThemeContext.Consumer>
          {user => (

          <div class="popup_end popup">
            <div class="box_end">
              <p class="result">
                <img src={consgrabutton} alt="consgrabutton" class="dis_end" />
                <span id="show_score">{this.props.result}</span>
              </p>
              {user && (
                  <div className='user-profile'>
                    <img src={user.photoURL} alt="profile" />
                    <span>Max score: {user.score}</span>
                  </div>
                )      
              }
              <p class="again" >
              {user ?
                <span class="action" onClick={() => this.props.logout()}>Sign Out  </span>
              :
                <span class="action" onClick={() => this.props.login()}>&#x261B; Save</span>
              }
                <span onClick={() => this.props.reset()}>Try again</span>
              </p>
            </div>
          </div>

          )}
        </ThemeContext.Consumer>

      );
    }
  }
}

export default Popup;
