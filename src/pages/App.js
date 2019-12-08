import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import HomePage from "./HomePage/HomePage"
import LoginPage from "./LoginPage/LoginPage"


class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/home' component={HomePage} />
        </Switch>
      </div>
    )
  }
}

export default App