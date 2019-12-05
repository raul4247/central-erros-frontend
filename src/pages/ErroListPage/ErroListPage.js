import React, { Component } from "react"
import { Nav, ButtonToolbar, Button, Row, Col } from 'react-bootstrap'
import './ErroListPage.css'


class ErroListPage extends Component {
  ambiente = ['Dev', 'Homologação', 'Produção']
  ordenarPor = ['Ordenar por', 'Level', 'Frequência']
  buscarPor = ['Buscar por', 'Level', 'Descrição', 'Origem']
  logsMock = [
    { id: 1, level: 'Error', titulo: 'Null Pointer Exception', endereco: '10.0.1.1', data: '21/05/2019 09:43:18', eventos: 150 },
    { id: 5, level: 'Error', titulo: 'Array Out of Bounds Exception', endereco: '10.0.1.1', data: '21/05/2019 09:43:18', eventos: 2 },
    { id: 6, level: 'Debug', titulo: 'Debug log', endereco: '10.0.1.1', data: '21/05/2019 09:43:18', eventos: 50 },
    { id: 98, level: 'Warning', titulo: 'Warning: lorem ipsum', endereco: '10.0.1.1', data: '21/05/2019 09:43:18', eventos: 350 }
  ]


  ambienteChange = (event) => {
    console.log(event.target.value)
  }

  ordenarPorChange = (event) => {
    console.log(event.target.value)
  }

  buscarPorChange = (event) => {
    console.log(event.target.value)
  }


  buscaInputChange = (event) => {
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


  render() {
    return (
      <div>
        <div>
          <Nav>
            <Nav.Item className="nav-input-item">
              <select onChange={this.ambienteChange}>
                {
                  this.ambiente.map((i) =>
                    <option key={i} value={i}>{i}</option>
                  )
                }
              </select>
            </Nav.Item>
            <Nav.Item className="nav-input-item">
              <select onChange={this.ordenarPorChange}>
                {
                  this.ordenarPor.map((i) =>
                    <option key={i} value={i}>{i}</option>
                  )
                }
              </select>
            </Nav.Item>
            <Nav.Item className="nav-input-item">
              <select onChange={this.buscarPorChange}>
                {
                  this.buscarPor.map((i) =>
                    <option key={i} value={i}>{i}</option>
                  )
                }
              </select>
            </Nav.Item>
            <Nav.Item className="nav-input-item">
              <input type="text" name="busca" onChange={this.buscaInputChange} placeholder="Busca" />
            </Nav.Item>
          </Nav>
        </div>
        <div>
          <ButtonToolbar>
            <Button className="botao-acao" variant="secondary" onClick={this.arquivarClick}>Arquivar</Button>
            <Button className="botao-acao" variant="secondary" onClick={this.apagarClick}>Apagar</Button>
          </ButtonToolbar>
        </div>
        <div>
          <Row className="erros-header">
            <Col md={1} sm={1} xs={1}>
              <input className="checkbox" type="checkbox" value="checkAll" onChange={this.checkboxClick} />
            </Col>
            <Col>
              <p className="text-center">Level</p>
            </Col>
            <Col>
              <p className="text-center">Log</p>
            </Col>
            <Col>
              <p className="text-center">Eventos</p>
            </Col>
          </Row>
          <hr />
          {
            this.logsMock.map((log) => {
              return (
                <div key={log.id}>
                  <Row>
                    <Col md={1} sm={1} xs={1}>
                      <input className="checkbox" type="checkbox" value={log.id} onChange={this.checkboxClick} />
                    </Col>
                    <Col className="level-label-container">
                      <p className="level-label">{log.level}</p>
                    </Col>
                    <Col className="text-center">
                      <p className="text-center">{log.titulo}</p>
                      <p className="text-center">{log.endereco}</p>
                      <p className="text-center">{log.data}</p>
                    </Col>
                    <Col>
                      <p className="text-center">{log.eventos}</p>
                    </Col>
                  </Row>
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