import React, { Component } from 'react';
import NavBar from './NavBar';

class Home extends Component {
  render() {
    return(
        <div>
            <NavBar/>
            <section class="hero is-light is-fullheight-with-navbar is-bold">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div className="columns">
                            <div className="column">
                                <h1 class="title">
                                    The live learning game your students will beg to play
                                </h1>
                                <hr/>
                                <h2 class="subtitle">
                                    QuizGame is a game show for the classroom that requires knowledge, collaboration, and strategy to win.
                                </h2>
                            </div>
                            <div className="column">
                                <img src="/ZHLmQfM8VD.png"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
  }
}

export default Home;
