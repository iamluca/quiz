import React, { Component } from 'react';

class Name extends Component {
    render() {
        return (
            <div class="container" style={{paddingTop: 200}}>
                <div class="jumbotron" style={{textAlign: "center"}}>
                    <h1 class="display-4" style={{textAlign: "center"}}>Choose a name!</h1>
                    <hr class="my-4"/>
                    <input type="text" class="form-control" onChange={this.props.updateName} style={{textAlign: "center"}} placeholder="Game Name"/>
                    <br/>
                    <button onClick={this.props.readyName} class="btn btn-primary btn-lg">Continue</button>
                </div>
            </div>
        );
    };
};

export default Name;
