import React, { Component } from "react"
import axios from 'axios'
import { BACKEND_API } from '../../consts/Consts'
import FormDataSend from '../../api/FormDataSend'
import { Button } from 'react-bootstrap'


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
      url: 'http://localhost:8080/oauth/token',
      headers: {
        "authorization": BACKEND_API.BASIC_AUTH,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      },
      data: form
    })
      .then(function (response) {
        if (response.status === 200) {
          this.props.history.replace({
            pathname: '/home',
            state: { access_token: response.data.access_token }
          })
        }
      }.bind(this))
      .catch(function (error) {
        alert("Não foi possível fazer o Login")
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <p>LOGIN</p>
        <input type="text" value={this.state.username} onChange={this.usernameChange} />
        <input type="password" value={this.state.password} onChange={this.passwordChange} />
        <Button className="botao-acao" variant="secondary" onClick={this.login}>Login</Button>
      </div>
    )
  }
}

export default LoginPage