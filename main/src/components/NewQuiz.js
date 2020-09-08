import React, { Component } from 'react';
import NavBar from './NavBar';
import NewQuestion from './NewQuestion';

class NewQuiz extends Component {
    constructor(props) {
        super(props);

        this.state = {
            questions: [],
            title: null,
            ready: false,
            showNewQuestion: false
        };

        this.updateTitle = this.updateTitle.bind(this);
        this.continue = this.continue.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.newQuestion = this.newQuestion.bind(this);
        this.saveGame = this.saveGame.bind(this);
    };

    updateTitle(e) {
        this.setState({
            title: e.target.value
        });
    };

    continue() {
        this.setState({
            ready: !this.state.ready
        });
    };

    newQuestion() {
        this.setState({
            showNewQuestion: !this.state.showNewQuestion
        });
    };

    addQuestion(data) {
        let questions_before = this.state.questions;
        questions_before.push(data);
        this.setState({
            questions: questions_before,
            showNewQuestion: false
        });
    };

    saveGame() {
        fetch('http://192.168.1.103:3002/api/quiz/new', {
            headers: { "Authorization": `Bearer ${localStorage.getItem('token')}`, "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({quizData: {questions: this.state.questions, title: this.state.title}})
        }).then(res => res.json()).then(r => {
            window.location.href = `/host?id=${r._id}`
        });
    }

    renderAnswer(answer) {
        return(
            <button className={answer.correct ? "button is-success" : "button is-danger"}>{answer.text}</button>
        );
    };

    renderQuestion(question, interval) {
        let answers = [];

        question.answers.map(a => answers.push(this.renderAnswer(a)));

        return(
            <div className="box">
                <h1 className="title is-bold is-2">{interval + 1}. {question.question}</h1>
                <h1 className="title is-bold is-4">Answers:</h1>
                {answers}
            </div>
        );
    };

    render() {
        let renderedQuestions = [];
        if (this.state.questions) {
            this.state.questions.map((q, i) => renderedQuestions.push(this.renderQuestion(q, i)));
        };
        //{question: "no u", answers: [{text: "testing", correct: true}, {text: "testing", correct: false}, {text: "testing", correct: false}, {text: "testing", correct: false}]}
        if (this.state.ready) {
            return(
                <div>
                    <NavBar/>
                    <section class="hero is-light is-fullheight-with-navbar is-bold">
                        <NewQuestion closeOpen={this.newQuestion} addQuestion={this.addQuestion} isOpen={this.state.showNewQuestion}/>
                        <div class="hero-body">
                            <div class="container">
                                <div className="box">
                                    <div className="columns">
                                        {!this.state.questions.length == 0 ? <div className="column">{renderedQuestions}</div> : null}
                                        <div className={!this.state.questions.length == 0  ? "column" : "column has-text-centered"}>
                                            {this.state.questions.length === 0 ? <h1 class="title is-bold is-1">No Questions Added!</h1> : null}
                                            {this.state.questions.length === 0 ? <h1 class="subtitle">Why don't you create one!</h1> : null}
                                            <button onClick={this.newQuestion} className="button is-success is-large">Create Question</button>&nbsp;
                                            {!this.state.questions.length == 0 ? <button onClick={this.saveGame} className="button is-success is-large">Save Quiz</button> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        } else {
            return(
                <div>
                    <NavBar/>
                    <section class="hero is-light is-fullheight-with-navbar is-bold">
                        <div class="hero-body">
                            <div class="container has-text-centered">
                                <div className="box">
                                    <h1 class="title is-bold is-1">Add a title!</h1>
                                    <input style={{maxWidth: 400, textAlign: "center"}} type="text" className="input" placeholder="Title" onChange={this.updateTitle}/>
                                    <br/>
                                    <br/>
                                    <button onClick={this.continue} className="button is-success is-large">Continue</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        };
    };
};

export default NewQuiz;