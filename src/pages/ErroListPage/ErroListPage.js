import React, { Component } from "react"
import { Nav, ButtonToolbar, Button, Container, Row, Col } from 'react-bootstrap'
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
        console.log(response)
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
        <Container className="content">
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
            this.state.logsPagina.map((log) => {
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
        </Container>
      </div>
    )
  }
}

export default ErroListPage