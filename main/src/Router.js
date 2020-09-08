import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Host from './components/Host';
import Login from './components/Login';
import SignUp from './components/Signup';
import Dashboard from './components/Dashboard';
import NewQuiz from './components/NewQuiz';


class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/host" component={Host}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/play" render={() => window.location = "http://192.168.1.103:3000"}/>
            <Route exact path="/logout" render={() => {localStorage.removeItem('token'); window.location.href = "/"}}/>
            <Route exact path="/me" component={Dashboard}/>
            <Route exact path="/me/new" component={NewQuiz}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;