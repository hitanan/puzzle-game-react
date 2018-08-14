import React, { Component } from 'react';
// import './App.css';
import startbutton from '../assets/images/startbutton2.png' // relative path to image 
import consgrabutton from '../assets/images/consgrabutton.png' // relative path to image 

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';

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
          <div class="popup_end popup">
            <div class="box_end">
              <p class="result">
                <img src={consgrabutton} alt="consgrabutton" class="dis_end" />
                <span id="show_score">{this.props.result}</span>
              </p>
              {this.props.user && (
                  <div className='user-profile'>
                    <img src={this.props.user.photoURL} alt="profile" />
                    <span>Max score: {this.props.user.scores[this.props.game]}</span>
                  </div>
                )      
              }
              <p class="again" >
              {this.props.user ?
                <span class="action" onClick={() => this.props.logoutUser()}>Sign Out</span>
              :
                <span class="action" onClick={() => this.props.loginUser({game: this.props.game, score:this.props.result})}>&#x261B; Save</span>
              }
                <span onClick={() => this.props.reset()}>Try again || </span>
                <span onClick={() => this.props.close()}>Close</span>
              </p>
            </div>
          </div>

      );
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActions, dispatch);
  // return { actions: bindActionCreators(userActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
