import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import Header from "./../components/Header/Header"
import ErroListPage from "./ErroListPage/ErroListPage"
import ErroDetailsPage from "./ErroDetailsPage/ErroDetailsPage"


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={ErroListPage} />
          <Route path='/details' component={ErroDetailsPage} />
        </Switch>
      </div>
    )
  }
}

export default App