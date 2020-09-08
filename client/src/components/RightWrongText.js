import React, { Component } from 'react';

class RightWrongText extends Component {
  constructor(props) {
    super(props);

    this.incorrect = new Audio("/incorrect.mp3");
    this.correct = new Audio("/correct.mp3");

    this.state = {
      change: 0
    };
  };

  componentDidMount() {
    this.props.RightWrongData ? this.correct.play() : this.incorrect.play();

    this.setState({
      change: this.props.RightWrongData ? this.props.pointsPerCorrect * this.props.multiplier : this.props.pointsPerIncorrect
    });
  };

  render() {
      return (
          <section class={this.props.RightWrongData ? "hero is-fullheight is-success" : "hero is-fullheight is-danger"}>
            <div class="hero-body">
              <div class="container has-text-centered">
                  <h1 className="title is-1 is-bold" style={{fontWeight: 900, fontSize: 80}}>{this.props.RightWrongData ? "+" : "-"}{this.state.change}</h1>
                  {this.props.RightWrongData ? <h1 className="title is-bold is-2" style={{fontWeight: 900}}>Correct!</h1> : <h1 className="title is-bold is-2" style={{fontWeight: 900}}>Wrong!</h1>}
                  <button className="button is-info is-large" onClick={this.props.continue}>Continue</button>
              </div>
            </div>
          </section>
      );
  };
};

export default RightWrongText;
