import React, { Component } from "react"
import axios from 'axios'
import { BACKEND_API } from '../../consts/Consts'
import './CadastroUsuarioPage.css'

class CadastroUsuarioPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accessToken: props.location.state.accessToken,
      history: props.history,
      nome: "",
      senha: "",
      email: "",
      role: "USER"
    }
    this.voltarPagina = this.voltarPagina.bind(this)
  }

  voltarPagina() {
    this.state.history.goBack()
  }

  cadastrarUsuario = () => {
    let usuario = {}
    usuario['nome'] = this.state.nome
    usuario['senha'] = this.state.senha
    usuario['email'] = this.state.email
    usuario['role'] = this.state.role
    usuario['token'] = 'token-' + usuario['nome']

    axios({
      method: "POST",
      url: BACKEND_API.SERVER_URL + '/usuario',
      headers: {
        "authorization": 'Bearer ' + this.state.accessToken,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      data: usuario
    })
      .then(function (response) {
        console.log(response)
        console.log(response.status)
        if (response.status === 201) {
          alert("Sucesso!")
        }
      })
      .catch(function (error) {
        alert("Ocorreu um erro no cadastro")
        console.log(error)
      })
  }

  nomeChange = (event) => {
    this.setState({ nome: event.target.value })
  }

  senhaChange = (event) => {
    this.setState({ senha: event.target.value })
  }

  emailChange = (event) => {
    this.setState({ email: event.target.value })
  }

  roleChange = (event) => {
    let roleState = this.state.role
    if (roleState === "USER")
      roleState = "ADMIN"
    else
      roleState = "USER"

    this.setState({ role: roleState })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-secondary botao-acao" onClick={this.voltarPagina}>Voltar</button>
        <div className="container-fluid d-flex flex-column">
          <div className="card btns-card border-0 shadow details-card my-3">
            <div className="card-body">
              <input type="text" className="form-control input-text" placeholder="Nome" onChange={this.nomeChange} value={this.state.nome} />
              <input type="password" className="form-control input-text" placeholder="Senha" onChange={this.senhaChange} value={this.state.senha} />
              <input type="email" className="form-control input-text" placeholder="Email" onChange={this.emailChange} value={this.state.email} />
              <div>
                <input type="checkbox" onChange={this.roleChange} value={this.state.role} name="role" />
                <label className="label-role" htmlFor="role">Privilégios de Administrator</label>
              </div>
              <button type="button" className="btn btn-success" onClick={this.cadastrarUsuario}>Cadastrar</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CadastroUsuarioPage