import React, { Component } from 'react';
import Leaderboard from './Leaderboard';
import GameNav from './GameNav';
import Stats from './Stats';
import GameOptions from './GameOptions';
import io from 'socket.io-client';

class Host extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lobby: true,
            code: null,
            type: "timeLimit",
            ready: false,
            gameData: null,
            title: null,
            endGame: false
        };

        this.startGame = this.startGame.bind(this);
        this.updateGameMode = this.updateGameMode.bind(this);
        this.setGameOptions = this.setGameOptions.bind(this);
        this.endGame = this.endGame.bind(this);

        this.audio = new Audio("/theme.mp3");
    };

    componentDidMount() {

        const urlParams = new URLSearchParams(this.props.location.search);
        const key = urlParams.get('id');

        this.socket = io('http://192.168.1.103:3002');

        this.socket.on('connect', () => {
            console.log('Connected to backend.');
            this.socket.emit('host-join', key);
        });

        this.socket.on('updatePlayerLobby', data => {
            this.setState({
                players: data
            });
        });

        this.socket.on('gameData', data => {
            this.setState({
                code: data.code,
                title: data.gameData.quizData.title
            });
        });

        this.socket.on('updateScores', data => {
            this.setState({
                players: data
            });
        });

        this.socket.on('endGame', () => {
            this.setState({
                endGame: true
            });
        });
    };

    startGame() {
        if (this.state.players) {
            this.audio.loop = true;
            this.audio.play();
            this.socket.emit('startGame'); 
            this.setState({lobby: false});
        };
    };

    renderClient(client) {
        return(
            <div className="column is-one-quarter">
                <h1 className="title">{client.name}</h1>
            </div>
        );
    };

    setGameOptions(options) {
        this.setState({
            gameData: options,
            ready: true
        });
    };

    updateGameMode(mode) {
        this.setState({
            type: mode
        });
    };

    endGame() {
        this.setState({
            endGame: true
        });
    };

    render() {
        let renderedClients = [];
        let totalMoney = 0;

        if (this.state.players) {
            this.state.players.map(p => renderedClients.push(this.renderClient(p)));
        };

        if (!this.state.lobby) {
            if (this.state.type == "totalMoneyEarned") {
                if (this.state.gameData.pointsAll <= this.state.players.map(p => totalMoney = totalMoney + p.gameData.score)) {
                    this.socket.emit('endGame');
                };
            } else if (this.state.type == "timeLimit") {
                setTimeout(() => this.socket.emit('endGame'), this.state.gameData.time * 60000);
            } else if (this.state.type == "firstToMoney") {
                this.state.players.map(p => {
                    if (p.gameData.score >= this.state.gameData.pointsRace) {
                        this.socket.emit('endGame');
                    };
                });
            };
        };

        if (this.state.lobby) {
            if (this.state.ready) {
                return(
                    <div>
                        <section class="hero is-link has-text-centered">
                            <div class="hero-body">
                                <div class="container">
                                    <h1 class="title">
                                        Go to play.domain.com and enter code
                                    </h1>
                                    <h2 class="title is-bold is-1">
                                        {this.state.code || "No Code"}
                                    </h2>
                                    <button className="button is-success is-medium" onClick={this.startGame}>Start Game</button>
                                </div>
                            </div>
                        </section>
                        <section class="hero is-fullheight is-info has-text-centered">
                            <div className="columns is-multiline" style={{paddingTop: 10}}>
                                {renderedClients}
                            </div>
                        </section>
                    </div>
                );
            } else {
                return(
                    <GameOptions title={this.state.title} setGameOptions={this.setGameOptions} updateGameMode={this.updateGameMode} mode={this.state.type} questions={10}/>
                );
            };
        } else {
            return (
                <div>
                    <GameNav type={this.state.type} gameData={this.state.gameData} endGame={this.state.endGame} time={this.state.gameData.time * 60000}/>
                    <div class="columns has-background-link">
                        <div class="column is-one-fourth">
                            <Leaderboard players={this.state.players}/>
                        </div>
                        <div class="column is-three-fourths">
                            <Stats socket={this.socket} code={this.state.code} playerCount={this.state.players}/>
                        </div>
                    </div>
                </div>
            );
        };
    };
};

export default Host;
