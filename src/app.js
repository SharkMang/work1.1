import React from "react";
import ReactDOM from "react-dom";
import {Route, Router} from "react-router";
import '../build/styles.css';
import browserHistory from 'history';

import Login from '../pages/login.js';
import Home from '../pages/home.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.conteiner = document.getElementById(props.conteiner);
  }



  render() {
    this.conteiner.innerHTML = '';

    if (localStorage.getItem('isAuthenticated') === 'true') {
      return <Home EventEmitter={this.eventEmitter}/>;
    } else {
      return <Login EventEmitter={this.eventEmitter}/>;
    }
  }
}




ReactDOM.render(
  // <Router history={browserHistory}>
  //   <Route path='/' render={
  //     () => {
  //       if (localStorage.getItem('isAuthenticated') === 'true') {
  //         return <Redirect to="/home"/>;
  //       } else {
  //         return <Login/>;
  //       }
  //     }
  //   }/>

  //   <Route path='/home' render={
  //     () => {
  //       if (localStorage.getItem('isAuthenticated') === 'true') {
  //         return <Home EventEmitter={EventEmitter}/>;
  //       } else {
  //         return <Login/>;
  //       }
  //     }
  //   }/>
  // </Router>
  <App conteiner='root'/>  
  ,document.getElementById("root")
)