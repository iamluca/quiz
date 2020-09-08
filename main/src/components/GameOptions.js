import React, { Component } from 'react';

class GameOptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 10,
            pointsRace: 250000,
            pointsAll: 5000000
        };

        this.updateTime = this.updateTime.bind(this);
        this.updateRace = this.updateRace.bind(this);
        this.updateAll = this.updateAll.bind(this);
    };

    updateTime(e) {
        this.setState({
            time: e.target.value
        });
    };

    updateRace(e) {
        this.setState({
            pointsRace: e.target.value
        });
    };

    updateAll(e) {
        this.setState({
            pointsAll: e.target.value
        });
    };

    render() {
        let modeName = "No Mode";
        if (this.props.mode) {
            if (this.props.mode == "firstToMoney") {
                modeName = "Race";
            } else if (this.props.mode == "timeLimit") {
                modeName = "Time";
            } else if (this.props.mode == "totalMoneyEarned") {
                modeName = "All In";
            };
        };


        return(
            <section class="hero is-fullheight is-info">
                <div class="hero-body" style={{paddingLeft: "30%", paddingRight: "30%"}}>
                    <div class="container has-text-centered">
                        <div className="box" style={{maxWidth: 800}}>
                            <h1 className="title is-bold is-1 has-text-black">{this.props.title}</h1>
                            <h1 className="subtitle is-bold is-2 has-text-black">{this.props.questions} Questions</h1>
                            <h1 className="subtitle is-bold is-2 has-text-black">Current Mode: {modeName}</h1>
                            <button className="button is-success is-large" onClick={this.props.setGameOptions.bind(null, this.state)}>Continue</button>
                            <br/>
                            <br/>
                            <div className="box">
                                <h1 className="title is-bold has-text-black is-2" style={{textAlign: "left"}}>🕹️ Gamemode</h1>
                                <div className="columns">
                                    <div className="column is-one-fifth">
                                        <div className="box has-text-centered">
                                            <button className="button is-primary" onClick={this.props.updateGameMode.bind(null, "timeLimit")}>Time</button>
                                            <br/>
                                            <button className="button is-primary" onClick={this.props.updateGameMode.bind(null, "firstToMoney")}>Race</button>
                                            <br/>
                                            <button className="button is-primary" onClick={this.props.updateGameMode.bind(null, "totalMoneyEarned")}>All In</button>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="box has-text-centered" style={{height: "100%"}}>
                                            {this.props.mode == "timeLimit" ? "Earn the most amount of money possible in the time limit." : null}
                                            {this.props.mode == "firstToMoney" ? "The first person to the specified amount wins." : null}
                                            {this.props.mode == "totalMoneyEarned" ? "Total amount of money need to be earned between all of your players." : null}
                                        </div>
                                    </div>
                                    <div className="column is-two-fifth">
                                        <div className="box has-text-centered" style={{height: "100%"}}>
                                            {this.props.mode == "timeLimit" ? <input type="text" className="input" placeholder={this.state.time + " Minutes"} onChange={this.updateTime}/> : null}
                                            {this.props.mode == "firstToMoney" ? <input type="text" className="input" placeholder={this.state.pointsRace + " Points"} onChange={this.updateRace}/> : null}
                                            {this.props.mode == "totalMoneyEarned" ? <input type="text" className="input" placeholder={this.state.pointsAll + " Points"} onChange={this.updateAll}/> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
  };
}

export default GameOptions;
