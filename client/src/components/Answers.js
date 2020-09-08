import React, { Component } from 'react';

class Answers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            streak: 1
        };
        
        this.checkAnswer = this.checkAnswer.bind(this);

        this.audio = new Audio("/click.wav");
    };

    checkAnswer(a) {
        this.audio.play();
        const answer = this.props.questions.filter(q => q.text === a)[0];
        if (answer.correct) {
            this.props.showRightWrong(true);
            if (this.state.streak != 2) {
                this.setState({
                    streak: this.state.streak + 1
                });
            };
            if (this.state.streak == 2) {
                const new_points = this.props.points + ((this.props.pointsPerCorrect * this.props.multiplier) * 3);
                this.props.setNewPoints(new_points);
            } else {
                const new_points = this.props.points + (this.props.pointsPerCorrect * this.props.multiplier);
                this.props.setNewPoints(new_points);
            };
        } else {
            this.props.showRightWrong(false);
            const new_points = this.props.points - this.props.pointsPerIncorrect;
            this.props.setNewPoints(new_points);
            this.setState({
                streak: 1
            });
        };
    };
    

    render() {
        const shuffle = (array) => {
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

        const shuffled_questions = shuffle(this.props.questions);
        return (
            <div style={{height: "65%", width: "100%", flexWrap: "wrap", justifyContent: "center", display: "inline-block", "-webkit-box-align": "center", "-webkit-box-pack": "center"}}>
                <div style={{opacity: 1, transform: "none", width: "100%", height: "25%"}} class="has-background-danger" onClick={this.checkAnswer.bind(null, shuffled_questions[0].text)}>
                    <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", fontWeight: 900, fontSize: 25}}>
                        <h1 className="subtitle is-3 is-bold has-text-white">{shuffled_questions[0].text}</h1>
                    </div>
                </div>
                <div style={{opacity: 1, transform: "none", width: "100%", height: "25%"}} class="has-background-warning" onClick={this.checkAnswer.bind(null, shuffled_questions[1].text)}>
                    <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", fontWeight: 900, fontSize: 25}}>
                        <h1 className="subtitle is-3 is-bold has-text-white">{shuffled_questions[1].text}</h1>
                    </div>
                </div>
                <div style={{opacity: 1, transform: "none", width: "100%", height: "25%"}} class="has-background-success" onClick={this.checkAnswer.bind(null, shuffled_questions[2].text)}>
                    <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", fontWeight: 900, fontSize: 25}}>
                        <h1 className="subtitle is-3 is-bold has-text-white">{shuffled_questions[2].text}</h1>
                    </div>
                </div>
                <div style={{opacity: 1, transform: "none", width: "100%", height: "25%"}} class="has-background-info" onClick={this.checkAnswer.bind(null, shuffled_questions[3].text)}>
                    <div style={{height: "100%", display: "flex", justifyContent: "center", alignItems: "center", boxSizing: "border-box", fontWeight: 900, fontSize: 25}}>
                        <h1 className="subtitle is-3 is-bold has-text-white">{shuffled_questions[3].text}</h1>
                    </div>
                </div>
            </div>
        );
    };
};

export default Answers;
