import React, { Component } from 'react';

class NewQuestion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            question: null,
            answerOne: null,
            answerTwo: null,
            answerThree: null,
            answerFour: null
        };

        this.updateQuestion = this.updateQuestion.bind(this);
        this.updateAnswerOne = this.updateAnswerOne.bind(this);
        this.updateAnswerTwo = this.updateAnswerTwo.bind(this);
        this.updateAnswerThree = this.updateAnswerThree.bind(this);
        this.updateAnswerFour = this.updateAnswerFour.bind(this);
        this.create = this.create.bind(this);
    };

    updateQuestion(e) {
        if (!e.target.value == "") {
            this.setState({
                question: e.target.value
            });
        };
    };

    updateAnswerOne(e) {
        if (!e.target.value == "") {
            this.setState({
                answerOne: e.target.value
            });
        };
    };

    updateAnswerTwo(e) {
        if (!e.target.value == "") {
            this.setState({
                answerTwo: e.target.value
            });
        };
    };

    updateAnswerThree(e) {
        if (!e.target.value == "") {
            this.setState({
                answerThree: e.target.value
            });
        };
    };

    updateAnswerFour(e) {
        if (!e.target.value == "") {
            this.setState({
                answerFour: e.target.value
            });
        };
    };

    create() {
        let data = {};

        if (!this.state.question) {
            return;
        } else if (!this.state.answerOne) {
            return;
        } else if (!this.state.answerTwo) {
            return;
        } else if (!this.state.answerThree) {
            return;
        } else if (!this.state.answerFour) {
            return;
        } else {
            data.question = this.state.question;
            data.answers = [{text: this.state.answerOne, correct: true}, {text: this.state.answerTwo, correct: false}, {text: this.state.answerThree, correct: false}, {text: this.state.answerFour, correct: false}];
            this.props.addQuestion(data);
        };
    };

    render() {
        return(
            <div class={this.props.isOpen ? "modal is-active" : "modal"}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Create Question</p>
                        <button class="delete" onClick={this.props.closeOpen} aria-label="close"></button>
                    </header>
                    <section class="modal-card-body has-text-centered">
                        <label className="label">Question</label>
                        <input style={{maxWidth: 200, textAlign: "center"}} type="text" className="input" placeholder="Question" onChange={this.updateQuestion}/>
                        <br/>
                        <br/>
                        <label className="label">Answers</label>
                        <input style={{maxWidth: 200, textAlign: "center"}} type="text" className="input is-success" placeholder="Question" onChange={this.updateAnswerOne}/>
                        <br/>
                        <br/>
                        <input style={{maxWidth: 200, textAlign: "center"}} type="text" className="input is-danger" placeholder="Question" onChange={this.updateAnswerTwo}/>
                        <br/>
                        <br/>
                        <input style={{maxWidth: 200, textAlign: "center"}} type="text" className="input is-danger" placeholder="Question" onChange={this.updateAnswerThree}/>
                        <br/>
                        <br/>
                        <input style={{maxWidth: 200, textAlign: "center"}} type="text" className="input is-danger" placeholder="Question" onChange={this.updateAnswerFour}/>
                        <br/>
                        <br/>
                        <button onClick={this.create} className="button is-success is-large">Create</button>
                    </section>
                </div>
            </div>
        );
    };
};

export default NewQuestion;