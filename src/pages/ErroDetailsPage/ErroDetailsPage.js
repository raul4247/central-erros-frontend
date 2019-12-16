import React, { Component } from "react"
import LevelLabel from '../../components/LevelLabel/LevelLabel'
import './ErroDetailsPage.css'


class ErroDetailsPage extends Component {
  constructor(props) {
    super(props)

    this.state = { log: props.location.state.log, history: props.history }

    if (typeof this.state.log === 'undefined')
      this.voltarPagina()
  }

  voltarPagina = () => {
    this.state.history.goBack()
  }

  render() {
    return (
      <div>
        <button type="button" className="btn btn-secondary botao-acao" onClick={this.voltarPagina}>Voltar</button>
        <div className="container-fluid d-flex flex-column details-card-container">
          <div className="card border-0 shadow details-card my-3">
            <div className="card-body">
              <h1 className="font-weight-light text-center">{this.state.log.level} no {this.state.log.endereco} em {this.state.log.data}</h1>
              <LevelLabel log={this.state.log} />
              <div className="row">
                <div className="col text-center">
                  <h3 className="font-weight-normal">Título</h3>
                  <p className="lead">{this.state.log.titulo}</p>
                  <br />
                  <h3 className="font-weight-normal">Detalhes</h3>
                  <p className="lead">{this.state.log.detalhes}</p>
                </div>
                <div className="col text-center" >
                  <h3 className="font-weight-normal">Eventos</h3>
                  <p className="lead">{this.state.log.eventos}</p>
                  <br />
                  <h3 className="font-weight-normal">Coletado por:</h3>
                  <p className="lead">{this.state.log.tokenUsuario} (token de usuário)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ErroDetailsPage