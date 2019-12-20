import React, { Component } from "react"
import axios from 'axios'
import { BACKEND_API } from '../../consts/Consts'
import LevelLabel from '../../components/LevelLabel/LevelLabel'
import './ErroListPage.css'

class ErroListPage extends Component {
  status = ['ATIVO', 'ARQUIVADO']
  ambiente = ['Todos', 'DEV', 'HOMOLOGACAO', 'PRODUCAO']
  ordenarPor = ['Ordenar por', 'level', 'frequencia']
  buscarPor = ['Buscar por', 'Level', 'Descrição', 'Origem']
  pageSize = 8

  constructor(props) {
    super(props)

    this.state = {
      accessToken: this.props.accessToken,
      userData: this.props.userData,
      logsPagina: [],
      checkAll: false,
      selectedCheckBoxes: Array(this.pageSize).fill(false),
      status: "ATIVO",
      ambiente: "Todos",
      ordenarPor: 'Ordenar por',
      selectedPages: [],
      totalPages: 0,
      activePage: 0
    }
    this.carregaErros()
  }

  static getDerivedStateFromProps(props) {
    if (props.userData !== undefined)
      return { userData: props.userData }

    return null
  }

  filtroEndpoint = () => {
    let url = ""
    let status = this.state.status
    let ambiente = this.state.ambiente
    let ordenarPor = this.state.ordenarPor
    let pageNumber = this.state.activePage

    if (ambiente !== 'Todos')
      url += '/ambiente/' + ambiente

    url += '?page=' + pageNumber

    url += '&status=' + status

    if (ordenarPor !== 'Ordenar por')
      url += '&sort=' + ordenarPor + ',asc'

    return url
  }

  criarArrayDeSelecaoDePagina = (size, active) => {
    let arr = Array(size).fill("")
    arr[active] = "active"
    return arr
  }

  carregaErros = () => {
    axios({
      method: "GET",
      url: BACKEND_API.SERVER_URL + '/erro' + this.filtroEndpoint(),
      headers: {
        "authorization": 'Bearer ' + this.state.accessToken,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data"
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          let selectedPages = this.criarArrayDeSelecaoDePagina(response.data.totalPages, response.data.number)
          this.setState({
            logsPagina: response.data.content,
            totalPages: response.data.totalPages,
            selectedPages: selectedPages,
            activePage: response.data.number
          })
        }
      }.bind(this))
      .catch(function (error) {
        this.erroNaRequisicao(error)
      }.bind(this))
  }

  initSelectedCheckBoxes = () => {
    let selected = Array(this.pageSize).fill(false)
    this.setState({ checkAll: false, selectedCheckBoxes: selected })
  }

  setSelectedCheckBox = (state) => {
    this.setState({ selectedCheckBoxes: Array(this.pageSize).fill(state), checkAll: state })
  }

  statusChange = (event) => {
    this.setState({ status: event.target.value, activePage: 0 }, () => {
      this.setSelectedCheckBox(false)
      this.carregaErros()
    })
  }

  ambienteChange = (event) => {
    this.setState({ ambiente: event.target.value, activePage: 0 }, () => {
      this.setSelectedCheckBox(false)
      this.carregaErros()
    })
  }

  ordenarPorChange = (event) => {
    this.setState({ ordenarPor: event.target.value, activePage: 0 }, () => {
      this.setSelectedCheckBox(false)
      this.carregaErros()
    })
  }

  buscarPorChange = (event) => {
    console.log(event.target.value)
  }

  getCheckedBoxes = () => {
    let logIds = this.state.logsPagina.filter((log, index) => {
      return this.state.selectedCheckBoxes[index]
    })
    return logIds.map((log) => log.id)
  }

  showDetails = logId => e => {
    let log = this.state.logsPagina.find(log => log.id === logId)

    this.props.history.push({
      pathname: '/home/details',
      state: { log: log }
    })
  }

  arquivarClick = () => {
    let logsIds = this.getCheckedBoxes()
    if (logsIds.length > 0) {
      axios({
        method: "PUT",
        url: BACKEND_API.SERVER_URL + '/erro/updateStatus/ARQUIVADO',
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

  erroNaRequisicao = (errorMsg) => {
    this.props.history.replace({
      pathname: '/'
    })
    alert("Descupe, ocorreu um erro")
    console.log(errorMsg)
  }

  criarErros = () => {
    this.props.history.push({
      pathname: '/home/criar',
      state: { userData: this.state.userData, accessToken: this.state.accessToken }
    })
  }

  cadastrarUsuario = () => {
    this.props.history.push({
      pathname: '/home/cadastrar',
      state: { userData: this.state.userData, accessToken: this.state.accessToken }
    })
  }

  paginationChange = (index) => {
    let selectedPages = this.criarArrayDeSelecaoDePagina(this.state.totalPages, index)
    this.setState({
      selectedPages: selectedPages,
      activePage: index
    }, () =>
      this.carregaErros())
  }

  render() {
    return (
      <div>
        <div>
          <ul className="nav nav-select">
            <li className="nav-item">
              <div className="input-group mb-3">
                <select className="custom-select" onChange={this.statusChange}>
                  {
                    this.status.map((i) =>
                      <option key={i} value={i}>{i}</option>
                    )
                  }
                </select>

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
                {/* <select className="custom-select" onChange={this.buscarPorChange}>
                  {
                    this.buscarPor.map((i) =>
                      <option key={i} value={i}>{i}</option>
                    )
                  }
                </select> */}
              </div>
            </li>
          </ul>
        </div>
        <div>
          <button type="button" className="btn btn-warning botao-acao" onClick={this.arquivarClick}>Arquivar</button>
          <button type="button" className="btn btn-success botao-acao" onClick={this.criarErros}>Inserir Novos Erros</button>
          {
            this.state.userData !== undefined && this.state.userData.role === "ADMIN" &&
            <button type="button" className="btn btn-primary botao-acao" onClick={this.cadastrarUsuario}>Criar usuários</button>
          }
        </div>
        <div className="container-fluid content">
          {
            this.state.logsPagina.length > 0 &&
            <div>
              <div className="row erros-header">
                <div className="col-1 text-center">
                  <input type="checkbox" className="checkbox checkbox-header" checked={this.state.checkAll} value="checkAll" onChange={this.checkboxClick} />
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
            </div>
          }
          {
            this.state.logsPagina.map((log, index) => {
              return (
                <div key={log.id}>
                  <div className="row">
                    <div className="col-1 text-center">
                      <input type="checkbox" className="checkbox" checked={this.state.selectedCheckBoxes[index]} value={index} onChange={this.checkboxClick} />
                    </div>
                    <LevelLabel log={log} history={this.props.history} onClick={this.showDetails(log.id)} />
                    <div className="col text-center" onClick={this.showDetails(log.id)}>
                      <p className="log log-titulo">{log.titulo}</p>
                      <p className="log">{log.endereco}</p>
                      <p className="log">{log.data}</p>
                    </div>
                    <div className="col text-center" onClick={this.showDetails(log.id)} >
                      <p className="log log-frequencia">{log.frequencia}</p>
                    </div>
                  </div>
                  <hr />
                </div>
              )
            })
          }
          {
            (this.state.logsPagina.length === 0) &&
            <div className="container-fluid content nenhum-erro">
              <h1 className="font-weight-light text-center">Não foram encontrados nenhum erro!</h1>
            </div>
          }
        </div>
        <nav>
          <ul className="pagination justify-content-center paginacao">
            {
              this.state.selectedPages.map((value, index) => {
                return (
                  <li key={index + 1} className={"page-item " + this.state.selectedPages[index]}><button className="page-link" onClick={this.paginationChange.bind(this, index)}>{index + 1}</button></li>
                )
              })
            }
          </ul>
        </nav>
      </div>
    )
  }
}

export default ErroListPage