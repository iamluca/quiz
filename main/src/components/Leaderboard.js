import React, { Component } from 'react';

class Leaderboard extends Component {
    constructor(props) {
        super(props);

    };

    renderPlayer(interval, player) {
        return(
            <div class="box has-background-primary">
                <article class="media">
                    <div class="media-left">
                        <h1 className="title is-bold is-3 has-text-white">{interval + 1}. {player.name}</h1>
                    </div>
                    <div class="media-content">
                        <div class="content" style={{alignItems: "center", display: "inline"}}>
                            <p style={{textAlign: "right"}} className="title is-bold is-3 has-text-white">Pts: {player.gameData.score.toLocaleString()}</p>
                        </div>
                    </div>
                </article>
            </div>
        );
    };
  render() {
    let renderedPlayers = [];
    if (this.props.players) {
        const byScore = this.props.players.slice(0);
        byScore.sort(function(a,b) {
            return a.points - b.points;
        });
        byScore.reverse();
        byScore.map((i, p) => renderedPlayers.push(this.renderPlayer(p, i)));
    };

    return (
        <section class="hero is-info is-fullheight-with-navbar">
            <div class="box has-background-link">
                <h1 className="title is-bold is-3 has-text-centered">Leaderboard</h1>
                {renderedPlayers}
            </div>
        </section>
    );
  }
}

export default Leaderboard;
