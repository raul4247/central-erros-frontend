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
    {
      botao: "Unauthorized Request",
      erroData: {
        titulo: "UnauthorizedRequestException",
        detalhes: 'Exception in thread "appMain" br.codenation.app.central.Exception: 182 at UserController.main(UserController.java:182)',
      }
    },
    {
      botao: "Number Format",
      erroData: {
        titulo: "NumberFormatException",
        detalhes: 'Exception in thread "main" java.lang.NumberFormatException: For input string: "10,00" at sun.misc.FloatingDecimal.readJavaFormatString(FloatingDecimal.java:1224) at java.lang.Double.valueOf(Double.java:475) at java.lang.Double.<init>(Double.java:567) at model.analises.AcidezVolatil.calculaAcidezVolatil(AcidezVolatil.java:251) at model.analises.AcidezVolatil.main(AcidezVolatil.java:295)',
      }
    },
    {
      botao: "Illegal Exception",
      erroData: {
        titulo: "IllegalStateException",
        detalhes: 'java.lang.IllegalStateException: Form too large214053>200000 at org.mortbay.jetty.Request.extractParameters(Request.java:1560) at org.mortbay.jetty.Request.getParameter(Request.java:858) at br.com.stenovoice.filter.SessionFilter.doFilter(SessionFilter.java:63) at org.mortbay.jetty.servlet.ServletHandler$CachedChain.doFilter(ServletHandler.java:1157) at org.mortbay.jetty.servlet.ServletHandler.handle(ServletHandler.java:388) at org.mortbay.jetty.security.SecurityHandler.handle(SecurityHandler.java:216) at org.mortbay.jetty.servlet.SessionHandler.handle(SessionHandler.java:182) at org.mortbay.jetty.handler.ContextHandler.handle(ContextHandler.java:765) at org.mortbay.jetty.webapp.WebAppContext.handle(WebAppContext.java:418) at org.mortbay.jetty.handler.ContextHandlerCollection.handle(ContextHandlerCollection.java:230) at org.mortbay.jetty.handler.HandlerCollection.handle(HandlerCollection.java:114) at org.mortbay.jetty.handler.HandlerWrapper.handle(HandlerWrapper.java:152) at org.mortbay.jetty.Server.handle(Server.java:326) at org.mortbay.jetty.HttpConnection.handleRequest(HttpConnection.java:542) at org.mortbay.jetty.HttpConnection$RequestHandler.content(HttpConnection.java:938) at org.mortbay.jetty.HttpParser.parseNext(HttpParser.java:755) at org.mortbay.jetty.HttpParser.parseAvailable(HttpParser.java:212) at org.mortbay.jetty.HttpConnection.handle(HttpConnection.java:404) at org.mortbay.io.nio.SelectChannelEndPoint.run(SelectChannelEndPoint.java:409) at org.mortbay.thread.QueuedThreadPool$PoolThread.run(QueuedThreadPool.java:582)',
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
        if (response.status === 201) {
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