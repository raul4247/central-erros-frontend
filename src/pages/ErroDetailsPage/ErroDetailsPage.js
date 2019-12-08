import React, { Component } from "react"
import { Button, Container, Row, Col } from 'react-bootstrap'
import '../App.css'


class ErroDetailsPage extends Component {
  constructor(props) {
    super(props)

    this.state = { log: props.location.state.log, history: props.history }
    this.voltarPagina = this.voltarPagina.bind(this)

    if (typeof this.state.log === 'undefined')
      this.voltarPagina()
  }

  voltarPagina() {
    this.state.history.goBack()
  }

  render() {
    return (
      <div>
        <Button className="botao-acao" variant="secondary" onClick={this.voltarPagina}>Voltar</Button>
        <Container className="content">
          <h1>{this.state.log.level} no {this.state.log.endereco} em {this.state.log.data}</h1>
          <br />
          <Row>
            <Col>
              <h3>Título</h3>
              <p>{this.state.log.titulo}</p>
              <br />
              <h3>Detalhes</h3>
              <p>{this.state.log.detalhes}</p>
            </Col>
            <Col className="text-center">
              <div className="level-label-container">
                <p className="level-label">{this.state.log.level}</p>
              </div>
              <br />
              <h3>Eventos</h3>
              <p>{this.state.log.eventos}</p>
              <br />
              <h3>Coletado por:</h3>
              <p>{this.state.log.tokenUsuario} (token de usuário)</p>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default ErroDetailsPage