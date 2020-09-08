import React, { Component } from 'react';

class GameNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      time: 0,
      formatted: 0
    };

    this.millisToMinutesAndSeconds = this.millisToMinutesAndSeconds.bind(this);
  };

  millisToMinutesAndSeconds(millis) {
    if (!this.props.endGame) {
      const minutes = Math.floor(millis / 60000);
      const seconds = ((millis % 60000) / 1000).toFixed(0);
      const done = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
      this.setState({formatted: done});
    };
  };

  componentDidMount() {
    this.setState({
      time: this.props.time,
      formatted: "10:00"
    });

    if (this.props.type == "timeLimit") {
      this.interval = setInterval(() => {this.setState({time: this.state.time - 1000}); this.millisToMinutesAndSeconds(this.state.time) }, 1000);
    } else if (this.props.type == "firstToMoney") {
      this.setState({
        formatted: `First to reach ${this.props.gameData.pointsRace.toLocaleString()} points!`
      });
    } else if (this.props.type == "totalMoneyEarned") {
      this.setState({
        formatted: `Reach ${this.props.gameData.pointsAll.toLocaleString()} points in total!`
      });
    };
  }

  render() {
    return(
        <div class="is-link" style={{height: "100%", backgroundColor: "rgb(50, 115, 220)"}}>
          <h1 className="title" style={{textAlign: "center"}}>{this.state.formatted}</h1>
        </div>
    );
  }
}

export default GameNav;
