import React, { Component } from "react"
import axios from 'axios'
import { BACKEND_API } from '../../consts/Consts'
import FormDataSend from '../../api/FormDataSend'
import './LoginPage.css'

class LoginPage extends Component {
  constructor(props) {
    super(props)
    this.state = { username: "teste1@squad6.com.br", password: "senha de teste" }

    this.login = this.login.bind(this)
    this.usernameChange = this.usernameChange.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
  }

  usernameChange(event) {
    this.setState({ username: event.target.value })
  }

  passwordChange(event) {
    this.setState({ password: event.target.value })
  }

  login() {
    let form = FormDataSend.buildForm({
      'grant_type': 'password',
      'username': this.state.username,
      'password': this.state.password
    })

    axios({
      method: "POST",
      url: BACKEND_API.SERVER_URL + '/oauth/token',
      headers: {
        "authorization": BACKEND_API.BASIC_AUTH,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      },
      data: form
    })
      .then(function (response) {
        console.log(response)
        if (response.status === 200) {
          this.props.history.push({
            pathname: '/home',
            state: { access_token: response.data.access_token, email: this.state.username }
          })
        }
      }.bind(this))
      .catch(function (error) {
        alert("Não foi possível fazer o Login")
        console.log(error)
      })
  }

  esqueciSenha() {
    alert("???")
  }

  render() {
    return (
      <div className="login-container container-fluid d-flex flex-column">
        <div className="card border-0 shadow login-card my-5">
          <div className="card-body">
            <h1 className="font-weight-light text-center">Central de Erros</h1>
            <p className="lead text-center">Bem vindo a central de erros do Squad 6!</p>
            <p className="lead text-center">AceleraDev JAVA - Codenation</p>
            <div className="input-box-container">
              <input className="form-control text-center input-box" type="text" placeholder="Email" value={this.state.username} onChange={this.usernameChange} />
              <input className="form-control text-center input-box" type="password" value={this.state.password} onChange={this.passwordChange} />
            </div>
            <div className="btn-login-container">
              <button type="button" className="btn btn-outline-success btn-login" onClick={this.login}>Login</button>
              <br />
              <button type="button" className="btn btn-link" onClick={this.esqueciSenha}>Esqueci minha senha</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage