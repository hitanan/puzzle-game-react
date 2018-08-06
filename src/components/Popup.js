import React, { Component } from 'react';
// import './App.css';
import startbutton from '../assets/images/startbutton2.png' // relative path to image 
import consgrabutton from '../assets/images/consgrabutton.png' // relative path to image 


class Popup extends Component {
  render() {
    if (!this.props.again) {
      return (
        <div class="popup_start popup" onClick={() => this.props.onClick()}>
          <img src={startbutton} alt="startbutton2" class="dis_start" />
        </div>
      );
    } else {
      return (
        <div class="popup_end popup">
          <div class="box_end">
            <p><img src={consgrabutton} alt="consgrabutton" class="dis_end" /><span id="show_score">{this.props.result}</span></p>
            <p class="again" onClick={() => this.props.onClick()}><span>Try again</span></p>
          </div>
        </div>
      );
    }
  }
}

export default Popup;
