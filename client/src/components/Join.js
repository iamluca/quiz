import React, { Component } from 'react';

class Join extends Component {
    render() {
        return (
            <section class="hero is-primary is-fullheight">
                <div class="hero-body">
                    <div class="container" style={{textAlign: "center"}}>
                        <div class="box" style={{borderRadius: "5px", maxWidth: 400, margin: "0 auto"}}>
                            <h1 class="title has-text-black is-1" style={{textAlign: "center"}}>Join a Game!</h1>
                            <p style={{textAlign: "center"}} class="subtitle has-text-black">Get the code from the host!</p>
                            <hr/>
                            <input class="input" type="text" onChange={this.props.updateName} style={{textAlign: "center"}} placeholder="Name"/>
                            <br/>
                            <br/>
                            <input class="input" type="text" onChange={this.props.updateCode} style={{textAlign: "center"}} placeholder="Game Code"/>
                            <br/>
                            <br/>
                            <button onClick={this.props.ready} style={{width: "90%"}} class="button is-large is-info">Join Game</button>
                        </div>
                    </div>
                </div>
            </section>
        );
    };
};

export default Join;
