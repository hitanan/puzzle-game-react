import React, { Component } from 'react';
// import './App.css';
import {  getRandomItems, playAudio } from "../Helper.js";
import JQuery from 'jquery';
import Popup from './Popup.js';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import {
  withRouter
} from 'react-router-dom'

class Game1 extends Component {
  constructor(props) {
    super(props);
    this.progressBar = React.createRef();

    this.timeTotal = 5;
    this.size = 20;
    this.state = {
      randomArray: [],
      randomItem: '',
      result: 0,
      playing:false,
      time: 0,
      again:false
    };
    this.progInterval = null;
  }

  componentDidMount(){
    document.title = "Game 1 - React"
  }

  reDraw() {
    var randomArray = getRandomItems(this.size);
    var randomIndex = Math.floor(Math.random()*this.size);
    playAudio(randomArray[randomIndex]);
    this.setState((prevState) => 
      ({
        randomArray: randomArray,
        randomItem: randomArray[randomIndex],
        result: prevState.result + 1
      })
    );
  }

  checkCurrent() {
    if (this.progressBar.current != null) {
      var barWidth = (this.state.time * this.progressBar.current.clientWidth / this.timeTotal) +'px';
      // console.log(this.progressBar.current);
      var el = ReactDOM.findDOMNode(this);
      JQuery(el).find('#progressBar > div').animate({ width: barWidth }, 1000,'linear');
    }
    if (this.state.time <= 0) {
      clearInterval(this.progInterval);
      this.setState({
        playing:false,
        again:true
      });

      if (!this.props.user) {
        return;
      }
      this.props.saveScore({game: 'game1', score:this.state.result});
    }

  }
 
  close() {
    this.setState({
      playing:true,
    });
    this.props.history.push('/');

  }
  reset() {
    var randomArray = getRandomItems(this.size);
    var randomIndex = Math.floor(Math.random()*this.size);
    playAudio(randomArray[randomIndex]);
    this.setState({
      randomArray: randomArray,
      randomItem: randomArray[randomIndex],
      result: 0,
      playing:true,
      time: this.timeTotal,
      again:false
    });

    this.progInterval = setInterval( () =>  {
      this.setState((prevState) => ({ time: prevState.time - 1}), this.checkCurrent);
    }, 1000);
  }


  select(item) {
    if (item === this.state.randomItem) {
      this.reDraw();
    } else {
      playAudio(item);
    }
  };

  render() {
    let timeStamp = Math.floor(this.state.time/60) + ':' + this.state.time % 60;
    return (
      <div id="wrapper">
        {this.state && this.state.playing &&
        <div class="main" id="content">
            <div class="container box_shadow">
                <div class="head-letter-infor txt-center" >
                    <div class="col-w30 letter-above" id="lt-first"><p id="letter">{this.state.randomItem}</p></div>
                    <div class="col-w70 load-time">
                        <div id="progressBar" ref={this.progressBar}><div class="bar">
                          <span>{timeStamp}</span>
                          </div></div>
                        <div class="number-pair">
                            <p>Pairs Matched : <span id="result">{this.state.result}</span></p>
                        </div>
                    </div>
                </div>
                <div class="list-letter txt-center mgt50">
                    <div class="e_row">
                    { this.state.randomArray.map(item => {
                      return (
                        <div key={item} class="letter" onClick={() => this.select(item)}>
                          <p>{item}</p>
                        </div>
                      );
                    }) }
                    </div>
                </div>
            </div>
        </div>
        }
        {this.state && !this.state.playing &&
         <Popup 
            game="game1"
            again={this.state.again} 
            result={this.state.result}  
            reset={() => this.reset()}
            close={() => this.close()}
          />
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
} 

function mapDispatchToProps(dispatch) {
  return bindActionCreators(userActions, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game1));