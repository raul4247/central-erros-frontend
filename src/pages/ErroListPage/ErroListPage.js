import React, { Component } from "react"
import { Nav, ButtonToolbar, Button, Row, Col } from 'react-bootstrap'
import './ErroListPage.css'
import '../App.css'


class ErroListPage extends Component {
  ambiente = ['Dev', 'Homologação', 'Produção']
  ordenarPor = ['Ordenar por', 'Level', 'Frequência']
  buscarPor = ['Buscar por', 'Level', 'Descrição', 'Origem']
  logsMock = [
    { id: 1, level: 'Error', titulo: 'Null Pointer Exception', endereco: '10.0.1.1', detalhes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', data: '21/05/2019 09:43:18', eventos: 150, tokenUsuario: 'a1yd2bwsj1dswj' },
    { id: 5, level: 'Error', titulo: 'Array Out of Bounds Exception', endereco: '10.0.1.1', detalhes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', data: '21/05/2019 09:43:18', eventos: 2, tokenUsuario: '1n23bgcr12eh' },
    { id: 6, level: 'Debug', titulo: 'Debug log', endereco: '10.0.1.1', detalhes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', data: '21/05/2019 09:43:18', eventos: 50, tokenUsuario: 'xtndfb91v2' },
    { id: 98, level: 'Warning', titulo: 'Warning: lorem ipsum', endereco: '10.0.1.1', detalhes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', data: '21/05/2019 09:43:18', eventos: 350, tokenUsuario: 'sfg0246nk25i' }
  ]

  findLogById(id) {
    return this.logsMock.find(log => log.id === id)
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
            <Col className="text-center">
              <p>Level</p>
            </Col>
            <Col className="text-center">
              <p>Log</p>
            </Col>
            <Col className="text-center">
              <p>Eventos</p>
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
                    <Col className="level-label-container" onClick={this.showDetails(log.id)}>
                      <p className="level-label">{log.level}</p>
                    </Col>
                    <Col className="text-center">
                      <p>{log.titulo}</p>
                      <p>{log.endereco}</p>
                      <p>{log.data}</p>
                    </Col>
                    <Col className="text-center">
                      <p>{log.eventos}</p>
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