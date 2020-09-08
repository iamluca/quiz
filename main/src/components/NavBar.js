import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nav: true
        };
        
        this.nav = this.nav.bind(this);
    };

    nav() {
        this.setState({
            nav: !this.state.nav
        });
    };

    render() {
        if (localStorage.getItem('token')) {
            return(
                <nav class="navbar is-light">
                    <div class="navbar-brand">
                        <Link class="navbar-item" to="/">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
                        </Link>
    
                        <a role="button" onClick={this.nav} class={this.state.nav ? "navbar-burger burger" : "navbar-burger burger is-active"}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        </a>
                    </div>
    
                    <div class={this.state.nav ? "navbar-menu" : "navbar-menu is-active"}>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <Link to="/play" class="button is-info">
                                        <strong>Join Game</strong>
                                    </Link>
                                    <Link to="/me" class="button is-primary">
                                        <strong>Dashboard</strong>
                                    </Link>
                                    <Link to="/logout" class="button is-primary">
                                        <strong>Logout</strong>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            );
        } else {
            return(
                <nav class="navbar is-light">
                    <div class="navbar-brand">
                        <Link class="navbar-item" to="/">
                            <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
                        </Link>
    
                        <a role="button" onClick={this.nav} class={this.state.nav ? "navbar-burger burger" : "navbar-burger burger is-active"}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        </a>
                    </div>
    
                    <div class={this.state.nav ? "navbar-menu" : "navbar-menu is-active"}>
                        <div class="navbar-end">
                            <div class="navbar-item">
                                <div class="buttons">
                                    <Link to="/play" class="button is-info">
                                        <strong>Join Game</strong>
                                    </Link>
                                    <Link to="/signup" class="button is-primary">
                                        <strong>Signup</strong>
                                    </Link>
                                    <Link to="/login" class="button is-primary">
                                        <strong>Login</strong>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            );
        }
    };
};

export default NavBar;
