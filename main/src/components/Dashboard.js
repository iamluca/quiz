import React, { Component } from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quizzes: []
        };
    };

    renderQuiz(quiz) {
        return(
            <div className="column is-one-fifth">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            {quiz.quizData.title}
                        </p>
                    </header>
                    <div class="card-content">
                        <div class="content">
                            Questions: {quiz.quizData.questions.length}
                        </div>
                    </div>
                    <footer class="card-footer">
                        <Link to={`/host?id=${quiz._id}`} class="card-footer-item">Play</Link>
                        <a class="card-footer-item">Delete</a>
                    </footer>
                </div>
            </div>
        );
    };

    componentDidMount() {
        if (localStorage.getItem('token')) {
            fetch('http://192.168.1.103:3002/api/quiz', {
                headers: { "Authorization": `Bearer ${localStorage.getItem('token')}` },
            }).then(res => res.json()).then(r => {
                this.setState({
                    quizzes: r
                })
            });
        }
    }

    render() {
        let renderedQuizzes = [];
        this.state.quizzes.map(q => renderedQuizzes.push(this.renderQuiz(q)));

        return(
            <div>
                <NavBar/>
                <section class="hero is-light is-bold">
                    <div class="hero-body">
                        <div class="container has-text-centered">
                            <h1 class="title is-bold is-1">
                                To begin creating a quiz click the button!
                            </h1>
                            <Link to="/me/new" className="button is-success is-large">Create Quiz</Link>
                        </div>
                    </div>
                </section>
                <section class="hero is-light is-fullheight is-bold">
                    <div class="hero-body">
                        <div class="container has-text-centered is-multiline">
                            {!this.state.quizzes ? <h1 class="title is-bold is-1">No Quizzes!</h1> : null}
                            {!this.state.quizzes ? <h1 class="subtitle">Why don't you create one!</h1> : null}
                            <div className="columns is-multiline">
                                {renderedQuizzes}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    };
};

export default Dashboard;
