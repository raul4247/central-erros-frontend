import React, { Component } from "react"
import axios from 'axios'
import { BACKEND_API } from '../../consts/Consts'
import './CriarErroPage.css'

class CriarErroPage extends Component {
  level = ["INFO", "WARNING", "ERROR", "DEBUG"]
  ambiente = ["DEV", "HOMOLOGACAO", "PRODUCAO"]
  status = ["ATIVO", "ARQUIVADO"]

  errosMock = [
    {
      botao: "Null Pointer",
      erroData: {
        titulo: "Null Pointer Exception",
        detalhes: 'Exception in thread "main" java.lang.NullPointerException at Main.main(Main.java: 11)',
      }
    },
    {
      botao: "Array Out Of Bounds",
      erroData: {
        titulo: "ArrayIndexOutOfBounds",
        detalhes: 'Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 4 at Main.main(Main.java:23)',
      }
    },
  ]
  constructor(props) {
    super(props)
    this.state = {
      accessToken: props.location.state.accessToken, userData: props.location.state.userData, history: props.history, level: "INFO", ambiente: "DEV", status: "ATIVO", endereco: "192.168.0.1"
    }
    this.voltarPagina = this.voltarPagina.bind(this)
    this.criarErro = this.criarErro.bind(this)
  }

  static getDerivedStateFromProps(props) {
    if (props.userData !== undefined)
      return { userData: props.userData }

    return null
  }


  voltarPagina() {
    this.state.history.goBack()
  }

  levelChange = (event) => {
    this.setState({ level: event.target.value })
  }

  ambienteChange = (event) => {
    this.setState({ ambiente: event.target.value })
  }

  statusChange = (event) => {
    this.setState({ status: event.target.value })
  }

  enderecoChange = (event) => {
    this.setState({ endereco: event.target.value })
  }

  criarErro(index) {
    let erro = this.errosMock[index]
    erro.erroData['usuario'] = { id: this.state.userData.id }
    erro.erroData['endereco'] = this.state.endereco
    erro.erroData['data'] = new Date().toISOString()
    erro.erroData['level'] = this.state.level
    erro.erroData['ambiente'] = this.state.ambiente
    erro.erroData['status'] = this.state.status

    console.log(erro.erroData['usuario_id'])

    axios({
      method: "POST",
      url: BACKEND_API.SERVER_URL + '/erro',
      headers: {
        "authorization": 'Bearer ' + this.state.accessToken,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      data: erro.erroData
    })
      .then(function (response) {
        console.log(response)
        console.log(response.status)
        if (response.status === 200) {
          alert("Sucesso!")
        }
      })
      .catch(function (error) {
        alert("Ocorreu um erro no envio")
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-secondary botao-acao" onClick={this.voltarPagina}>Voltar</button>
        <div className="container-fluid d-flex flex-column">
          <div className="card btns-card border-0 shadow details-card my-3">
            <div className="card-body">
              <div className="input-group mb-3">
                <select className="custom-select" onChange={this.levelChange}>
                  {
                    this.level.map((i) =>
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
                <select className="custom-select" onChange={this.statusChange}>
                  {
                    this.status.map((i) =>
                      <option key={i} value={i}>{i}</option>
                    )
                  }
                </select>
              </div>
              <input type="text" className="form-control endereco-input" placeholder="Endereço" onChange={this.enderecoChange} value={this.state.endereco} />
              {
                this.errosMock.map((erro, index) => {
                  return (
                    <div className="btn-criar-erro text-center" key={erro.botao}>
                      <button type="button" className="btn btn-danger" onClick={this.criarErro.bind(this, index)}>{erro.botao}</button>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CriarErroPage