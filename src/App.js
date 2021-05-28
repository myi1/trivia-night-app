import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Categories from "./pages/Categories/Categories";
import Questions from "./pages/Questions/Questions";
import "./App.scss"

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1 className='app__header'>Trivia Night!</h1>
        <Router>
          <Switch>
            <Route exact path='/' component={Categories} />
            <Route path='/category/:id' component={Questions} />
          </Switch>
          <div className="footer">
            <Link className='footer__button' to='/'>
              🏠 Go Back to Category List 🏠
            </Link>
          </div>
        </Router>
      </div>
    );
  }
}
