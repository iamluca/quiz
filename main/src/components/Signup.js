import React, { Component } from 'react';
import NavBar from './NavBar';

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            email: null,
            password: null
        };

        this.updateEmail = this.updateEmail.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.updateName = this.updateName.bind(this);
    };

    updateEmail(e) {
        this.setState({
            email: e.target.value
        });
    };

    updatePassword(e) {
        this.setState({
            password: e.target.value
        });
    };

    updateName(e) {
        this.setState({
            name: e.target.value
        });
    };

    createAccount() {
        if (!this.state.email) {
            return;
        } else if (!this.state.password) {
            return;
        } else if (!this.state.name) {
            return;
        } else {
            fetch('http://192.168.1.103:3002/api/users/new', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email: this.state.email, name: this.state.name, password: this.state.password})
            }).then(res => res.json()).then(r => {
                localStorage.setItem('token', r.token);
                window.location.href = '/me';
            });
        };
    };

  render() {
    return(
        <div>
            <NavBar/>
            <section class="hero is-light is-fullheight-with-navbar is-bold">
                <div class="hero-body">
                    <div class="container" style={{textAlign: "center"}}>
                        <div class="box" style={{borderRadius: "5px", maxWidth: 400, margin: "0 auto"}}>
                            <h1 class="title has-text-black is-1" style={{textAlign: "center"}}>Signup</h1>
                            <input class="input" type="text" onChange={this.updateName} style={{textAlign: "center"}} placeholder="Name"/>
                            <br/>
                            <br/>
                            <input class="input" type="email" onChange={this.updateEmail} style={{textAlign: "center"}} placeholder="Email"/>
                            <br/>
                            <br/>
                            <input class="input" type="password" onChange={this.updatePassword} style={{textAlign: "center"}} placeholder="Password"/>
                            <br/>
                            <br/>
                            <button onClick={this.createAccount} style={{width: "90%"}} class="button is-large is-info">Signup</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
  }
}

export default SignUp;
