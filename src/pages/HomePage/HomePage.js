import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import Header from "../../components/Header/Header"
import ErroListPage from "../ErroListPage/ErroListPage"
import ErroDetailsPage from "../ErroDetailsPage/ErroDetailsPage"


class HomePage extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/home' component={ErroListPage} />
          <Route exact path='/home/details' component={ErroDetailsPage} />
        </Switch>
      </div>
    )
  }
}

export default HomePage