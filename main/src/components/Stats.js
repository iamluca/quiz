import React, { Component } from 'react';
import { Chart } from "react-charts";

class Stats extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lobby: false,
            score: 0,
            data: [],
            count: 0
        }
    }

    componentDidMount() {
        this.props.socket.on('updateScores', data => {
            let total = 0;
            let interval = this.state.count
            data.map(p => total = total + p.gameData.score);
            if (this.props.playerCount.map(p => this.state.score + p.gameData.score) != total) {
                interval = interval + 1 
                let stats = this.state.data;
                const number = data.map(p => this.state.score + p.gameData.score);
                stats.push([interval, number[0]]);
                this.setState({data: stats, count: interval});
            };
            this.setState({score: total});
        });
    };

    render() {
        let size;
        let totalMoney = 0;

        if (this.props.playerCount) {
            size = this.props.playerCount.length
            this.props.playerCount.map(p => totalMoney + p.gameData.score);
        } else {
            size = 0;
            totalMoney = 0;
        };

        return(
            <div style={{height: "100%", width: "100%"}}>
                <section class="hero is-info" style={{height: "50%", width: "100%"}}>
                    <div class="hero-body" style={{height: "100%", width: "100%"}}>
                    <Chart style={{
                                    width: "100%",
                                    height: 375
                                }} data={[
                                {
                                    label: "Points",
                                    data: this.state.data
                                }]}
                                axes={[
                                { primary: true, type: "linear", position: "bottom" },
                                { type: "linear", position: "left" }
                                ]}
                            />
                    </div>
                </section>
                <br/>
                <section class="hero is-info" style={{height: "47%"}}>
                    <div class="hero-body">
                        <div class="container">
                            <h1 class="title is-bold is-1">
                                Online Players: {size}
                            </h1>
                            <h2 class="title is-bold is-1">
                                Code: {this.props.code || "No Code"}
                            </h2>
                        </div>
                    </div>
                </section>
            </div>
        );
    };
};

export default Stats;
