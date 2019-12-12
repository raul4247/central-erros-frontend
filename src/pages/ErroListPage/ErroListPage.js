import React, { Component } from "react"
import axios from 'axios'
import { BACKEND_API } from '../../consts/Consts'
import './ErroListPage.css'
import '../App.css'


class ErroListPage extends Component {
  ambiente = ['Todos', 'Dev', 'Homologação', 'Produção']
  ordenarPor = ['Ordenar por', 'Level', 'Frequência']
  buscarPor = ['Buscar por', 'Level', 'Descrição', 'Origem']
  pageSize = 8

  constructor(props) {
    super(props)

    let selected = Array(this.pageSize).fill(false)
    this.state = { accessToken: this.props.accessToken, logsPagina: [], checkAll: false, selectedCheckBoxes: selected }
    this.carregaErros = this.carregaErros.bind(this)
    this.findLogById = this.findLogById.bind(this)
    this.levelClass = this.levelClass.bind(this)
    this.initSelectedCheckBoxes = this.initSelectedCheckBoxes.bind(this)
    this.updateStatusClick = this.updateStatusClick.bind(this)
    this.erroNaRequisicao = this.erroNaRequisicao.bind(this)

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
        }
      }.bind(this))
      .catch(function (error) {
        this.erroNaRequisicao(error)
      }.bind(this))
  }

  initSelectedCheckBoxes() {
    let selected = Array(this.pageSize).fill(false)
    this.setState({ checkAll: false, selectedCheckBoxes: selected })
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

  getCheckedBoxes() {
    let logIds = this.state.logsPagina.filter((log, index) => {
      return this.state.selectedCheckBoxes[index]
    })
    return logIds.map((log) => log.id)
  }

  updateStatusClick = (statusCode) => {
    let logsIds = this.getCheckedBoxes()
    if (logsIds.length > 0) {
      axios({
        method: "PUT",
        url: BACKEND_API.SERVER_URL + '/erro/updateStatus/' + statusCode,
        headers: {
          "authorization": 'Bearer ' + this.state.accessToken,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },
        data: logsIds
      })
        .then(function (response) {
          if (response.status === 204) {
            this.initSelectedCheckBoxes()
            this.carregaErros()
            alert("Sucesso!")
          }
        }.bind(this))
        .catch(function (error) {
          this.erroNaRequisicao(error)
        }.bind(this))
    }
  }

  checkboxClick = (event) => {
    let value = event.target.value
    if (value === "checkAll") {
      let checked = this.state.checkAll

      if (!checked)
        this.setState({ selectedCheckBoxes: Array(this.pageSize).fill(true), checkAll: true })
      else
        this.setState({ selectedCheckBoxes: Array(this.pageSize).fill(false), checkAll: false })
    }
    else {
      let selectedCheckBoxes = this.state.selectedCheckBoxes
      selectedCheckBoxes[value] = !selectedCheckBoxes[value]
      this.setState({ selectedCheckBoxes: selectedCheckBoxes })
    }
  }

  showDetails = logId => e => {
    this.props.history.push({
      pathname: '/home/details',
      state: { log: this.findLogById(logId) }
    })
  }

  erroNaRequisicao(errorMsg) {
    console.log(errorMsg)
    this.props.history.replace({
      pathname: '/'
    })
    alert("Descupe, ocorreu um erro")
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
          <button type="button" className="btn btn-warning botao-acao" onClick={this.updateStatusClick.bind(this, 'ARQUIVADO')}>Arquivar</button>
          <button type="button" className="btn btn-danger botao-acao" onClick={this.updateStatusClick.bind(this, 'APAGADO')}>Apagar</button>
        </div>
        <div className="container-fluid content">
          <div className="row erros-header">
            <div className="col-1 checkbox">
              <input className="checkbox" type="checkbox" checked={this.state.checkAll} value="checkAll" onChange={this.checkboxClick} />
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
            this.state.logsPagina.map((log, index) => {
              return (
                <div key={log.id}>
                  <div className="row">
                    <div className="col-1 checkbox">
                      <input className="checkbox" type="checkbox" checked={this.state.selectedCheckBoxes[index]} value={index} onChange={this.checkboxClick} />
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