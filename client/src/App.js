import React, { Component } from 'react';
import Question from './components/Questions';
import Answers from './components/Answers';
import Shop from './components/Shop';
import Join from './components/Join';
import SideBar from './components/SideBar';
import RightWrong from './components/RightWrongText';
import io from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      upgradeIsOpen: false,
      points: 0,
      pointsPerCorrect: 5,
      pointsPerIncorrect: 1,
      multiplier: 1,
      questions: null,
      order: null,
      questionNumber: 1,
      showEnd: false,
      code: null,
      ready: false,
      name: null,
      sideBar: false,
      showStuff: true,
      showRightWrong: false,
      showRightWrongData: null
    };

    this.openUpgrades = this.openUpgrades.bind(this);
    this.setPoints = this.setPoints.bind(this);
    this.setCorrect = this.setCorrect.bind(this);
    this.setMultiplier = this.setMultiplier.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.updateCode = this.updateCode.bind(this);
    this.ready = this.ready.bind(this);
    this.updateName = this.updateName.bind(this);
    this.sideBar = this.sideBar.bind(this);
    this.openShop = this.openShop.bind(this);
    this.openQuestions = this.openQuestions.bind(this);
    this.showRightWrong = this.showRightWrong.bind(this);
    this.continueRightWrong = this.continueRightWrong.bind(this);
    this.endGame = this.endGame.bind(this);
  };

  shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    };

    return array;
  };

  componentDidMount() {
    this.socket = io('http://192.168.1.103:3002');

    this.socket.on('gameStarted', (data) => {
      this.setState({
        questions: data
      });
      this.setState({
        order: this.shuffle(this.state.questions)
      });
    });
    
    this.socket.on('noGameFound', () => {
      this.setState({ready: false});
    });

    this.socket.on('endGame', () => {
      this.endGame();
    });

    this.url = "/woosh.wav";
    this.audio = new Audio(this.url);
  };

  setCorrect(points) {
    this.setState({
      pointsPerCorrect: points,
      pointsPerIncorrect: points
    });
  };

  setMultiplier(points) {
    this.setState({
      multiplier: points
    });
  };

  openUpgrades() {
    this.setState({
      upgradeIsOpen: !this.state.upgradeIsOpen
    })
  };

  setPoints(number) {
    this.setState({
      points: number
    });
    this.socket.emit('updateScore', number);
  };

  showRightWrong(correct) {
    this.setState({
      showStuff: false,
      showRightWrong: true,
      showRightWrongData: correct
    });
    this.nextQuestion();
  };

  nextQuestion() {
    if (this.state.order[this.state.questionNumber]) {
      this.setState({
        questionNumber: this.state.questionNumber + 1
      });
    } else {
      this.setState({
        questionNumber: 1
      });
    };
  };

  endGame() {
    this.setState({
      order: null,
      showEnd: true
    });
  };

  updateCode(e) {
    this.setState({
        code: e.target.value
    });
  };

  updateName(e) {
    this.setState({
        name: e.target.value
    });
  };

  ready() {
    if (this.state.name) {
      this.socket.emit('player-join', {name:  this.state.name, code: this.state.code});
      this.setState({
        ready: !this.state.ready
      });
    };
  };
  
  sideBar() {
    this.audio.play();
    this.setState({
      sideBar: !this.state.sideBar,
    });
  };

  openShop() {
    this.setState({
      sideBar: false,
      upgradeIsOpen: true
    });
  };

  openQuestions() {
    this.setState({
      sideBar: false,
      upgradeIsOpen: false
    });
  };

  continueRightWrong() {
    this.setState({
      showRightWrong: !this.state.showRightWrong,
      showStuff: true
    });
  };

  render() {
    if (!this.state.ready) {
      return(<Join updateName={this.updateName} socket={this.socket} ready={this.ready} updateCode={this.updateCode}/>)
    } else {
      if (this.state.order) {
        if (!this.state.lobby) {
          return (
            <div style={{height: "100%", width: "100%", display: "flex", flexFlow: "column"}}>
              <div style={{width: "100%", flex: "0 1 auto"}}>
                <header class="jss10 jss16 jss1 jss5 jss8">
                  <div class="jss37 jss39 jss38" style={{paddingLeft: 8, paddingRight: 10}}>
                      <button onClick={this.sideBar} tabindex="0" class="jss47 jss41 jss42" type="button" aria-label="Menu">
                        <span class="jss46">
                            <svg class="jss50" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
                            </svg>
                        </span>
                        <span class="jss59"></span>
                        <div style={{width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <h2 class="jss66 jss72 jss86" style={{fontWeight: 900}}></h2>
                        <h2 class="jss66 jss72 jss86" style={{fontWeight: 900}}>Points: {this.state.points}</h2>
                      </div>
                      </button>
                      <div style={{display: "flex"}}></div>
                  </div>
                </header>
              </div>
              {this.state.showRightWrong ? <RightWrong pointsPerCorrect={this.state.pointsPerCorrect} pointsPerIncorrect={this.state.pointsPerIncorrect} multiplier={this.state.multiplier} RightWrongData={this.state.showRightWrongData} continue={this.continueRightWrong}/> : null}
              <div style={{width: "100%", height: "95%", display: "flex", fontFamily: "\"Product Sans\", sans-serif", userSelect: "none", flexFlow: "column"}}>
                <div style={{height: 0, display: "flex", flexDirection: "column", flex: "1 1 auto"}}>
                  <div style={{height: "100%", width: "100%"}}>
                    <div style={{height: "35%", display: "flex", "-webkit-box-pack": "center", justifyContent: "center", "-webkit-box-align": "center", alignItems: "center"}}>
                      <div className="has-background-primary" style={{height: "100%", width: "100%", fontWeight: 900, boxSizing: "border-box", padding: "6%", display: "inline-block"}}>
                      {this.state.showStuff ? <Question style={{display: "inline-block"}} question={this.state.order[this.state.questionNumber - 1]}/> : null}
                      </div>
                    </div>
                    {this.state.showStuff ? <Answers showRightWrong={this.showRightWrong} nextQuestion={this.nextQuestion} questions={this.state.order[this.state.questionNumber - 1].answers} multiplier={this.state.multiplier} pointsPerIncorrect={this.state.pointsPerIncorrect} pointsPerCorrect={this.state.pointsPerCorrect} points={this.state.points} setNewPoints={this.setPoints}/> : null}
                  </div>
                  <div class="Toastify"></div>
                </div>
              </div>
              {this.state.sideBar ? <SideBar openShop={this.openShop} openQuestions={this.openQuestions}/> : null}
              <div className={!this.state.upgradeIsOpen == "hide"}>
                <Shop setMultiplier={this.setMultiplier} pointsPerCorrect={this.state.pointsPerCorrect} setCorrect={this.setCorrect} setNewPoints={this.setPoints} setIncorrect={this.setIncorrect} isOpen={this.state.upgradeIsOpen} toggle={this.openUpgrades} points={this.state.points}/>
              </div>
            </div>
          );
        } else {
          return(
            <h1>Please wait for the game to start.</h1>
          );
        }
      } else {
        if (this.state.showEnd) {
          return(
            <section class="hero is-primary is-fullheight">
              <div class="hero-body">
                <div class="container has-text-centered">
                  <h1 class="title is-bold is-1">
                    All finished! Check the leaderboard to view your rank!
                  </h1>
                </div>
              </div>
            </section>
          );
        } else {
          return(
            <section class="hero is-primary is-fullheight">
              <div class="hero-body">
                <div class="container has-text-centered">
                  <h1 class="title is-bold is-1">
                    Please wait for the game to start!
                  </h1>
                </div>
              </div>
            </section>
          );
        };
      };
    };
  };
};

export default App;