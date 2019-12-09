import React, { Component } from "react"
import axios from 'axios'
import { BACKEND_API } from '../../consts/Consts'
import './ErroListPage.css'
import '../App.css'


class ErroListPage extends Component {
  ambiente = ['Todos', 'Dev', 'Homologação', 'Produção']
  ordenarPor = ['Ordenar por', 'Level', 'Frequência']
  buscarPor = ['Buscar por', 'Level', 'Descrição', 'Origem']

  constructor(props) {
    super(props)
    this.state = { accessToken: this.props.accessToken, logsPagina: [] }
    this.carregaErros = this.carregaErros.bind(this)
    this.findLogById = this.findLogById.bind(this)
    this.levelClass = this.levelClass.bind(this)

    this.carregaErros()
  }

  carregaErros() {
    axios({
      method: "GET",
      url: BACKEND_API.SERVER_URL + '/erro',
      headers: {
        "authorization": 'Bearer ' + this.state.accessToken,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          this.setState({ logsPagina: response.data.content })
          console.log(this.state)
        }
      }.bind(this))
      .catch(function (error) {
        alert("ERRO!")
        console.log(error)
      })
  }

  levelClass(level) {
    if (level === "WARNING")
      return "-warning"
    if (level === "DEBUG")
      return "-primary"
    if (level === "ERROR")
      return "-danger"
    return ""
  }

  findLogById(id) {
    console.log(this.state)
    return this.state.logsPagina.find(log => log.id === id)
  }

  ambienteChange = (event) => {
    console.log(event.target.value)
  }

  ordenarPorChange = (event) => {
    console.log(event.target.value)
  }

  buscarPorChange = (event) => {
    console.log(event.target.value)
  }

  arquivarClick = () => {
    console.log("Botão Arquivar")
  }

  apagarClick = () => {
    console.log("Botão Apagar")
  }

  checkboxClick = (event) => {
    console.log(event.target.value)
  }

  showDetails = logId => e => {
    this.props.history.push({
      pathname: '/home/details',
      state: { log: this.findLogById(logId) }
    })
  }

  render() {
    return (
      <div>
        <div>
          <ul className="nav nav-select">
            <li className="nav-item">
              <div className="input-group mb-3">
                <select className="custom-select" onChange={this.ambienteChange}>
                  {
                    this.ambiente.map((i) =>
                      <option key={i} value={i}>{i}</option>
                    )
                  }
                </select>
                <select className="custom-select" onChange={this.ordenarPorChange}>
                  {
                    this.ordenarPor.map((i) =>
                      <option key={i} value={i}>{i}</option>
                    )
                  }
                </select>
                <select className="custom-select" onChange={this.buscarPorChange}>
                  {
                    this.buscarPor.map((i) =>
                      <option key={i} value={i}>{i}</option>
                    )
                  }
                </select>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <button type="button" className="btn btn-warning botao-acao" onClick={this.arquivarClick}>Arquivar</button>
          <button type="button" className="btn btn-danger botao-acao" onClick={this.apagarClick}>Apagar</button>
        </div>
        <div className="container-fluid content">
          <div className="row erros-header">
            <div className="col-1 checkbox">
              <input className="checkbox" type="checkbox" value="checkAll" onChange={this.checkboxClick} />
            </div>
            <div className="col text-center">
              <p className="erros-header-label">Level</p>
            </div>
            <div className="col text-center">
              <p className="erros-header-label">Log</p>
            </div>
            <div className="col text-center">
              <p className="erros-header-label">Eventos</p>
            </div>
          </div>
          <hr />
          {
            this.state.logsPagina.map((log) => {
              return (
                <div key={log.id}>
                  <div className="row">
                    <div className="col-1 checkbox">
                      <input className="checkbox" type="checkbox" value={log.id} onChange={this.checkboxClick} />
                    </div>
                    <div className="col level-label-container" onClick={this.showDetails(log.id)}>
                      <p className={"badge badge-pill level-label badge" + this.levelClass(log.level)}>{log.level}</p>
                    </div>
                    <div className="col text-center">
                      <p className="log">{log.titulo}</p>
                      <p className="log">{log.endereco}</p>
                      <p className="log">{log.data}</p>
                    </div>
                    <div className="col text-center">
                      <p className="log">{log.eventos}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default ErroListPage