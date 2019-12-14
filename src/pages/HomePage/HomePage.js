import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import Header from "../../components/Header/Header"
import axios from 'axios'
import { BACKEND_API } from '../../consts/Consts'
import ErroListPage from "../ErroListPage/ErroListPage"
import ErroDetailsPage from "../ErroDetailsPage/ErroDetailsPage"
import './HomePage.css'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = { accessToken: props.location.state.access_token, email: props.location.state.email }
    this.carregarUserData = this.carregarUserData.bind(this)

    this.carregarUserData()
  }

  carregarUserData() {
    axios({
      method: "GET",
      url: BACKEND_API.SERVER_URL + '/usuario/email/' + this.state.email,
      headers: {
        "authorization": 'Bearer ' + this.state.accessToken,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(function (response) {
        if (response.status === 200)
          this.setState({ userData: response.data })
      }.bind(this))
      .catch(function (error) {
        console.log(error)
        this.props.history.replace({
          pathname: '/central-erros-frontend'
        })
        alert("Descupe, ocorreu um erro")
      }.bind(this))
  }

  render() {
    return (
      <div>
        <Header userData={this.state.userData} history={this.props.history} />
        <div className="homepage-container">
          <Switch>
            <Route exact path='/central-erros-frontend/home' render={(props) => <ErroListPage {...props} accessToken={this.state.accessToken} />} />
            <Route exact path='/central-erros-frontend/home/details' component={ErroDetailsPage} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default HomePage