import React, { Component } from 'react';

class Questions extends Component {
  render() {
    return (
        <h1 className="title is-bold is-3 has-text-white" style={{display: "block"}}>{this.props.question.question}</h1>
    );
  }
}

export default Questions;
