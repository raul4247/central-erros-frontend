import React, { Component } from "react"
import { Navbar, Button } from 'react-bootstrap'
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { nome: 'USUÁRIO', token: 'TOKEN', email: 'EMAIL' }
    this.logout = this.logout.bind(this)
  }

  showPerfilPopUp() {
    console.log('pop up')
  }

  static getDerivedStateFromProps(props) {
    if (props.userData !== undefined)
      return { nome: props.userData.nome, token: props.userData.token, email: props.userData.email }

    return null;
  }

  logout() {
    console.log(this.props)
    this.props.history.replace({
      pathname: '/'
    })
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="true">
          <Navbar.Brand>Bem vindo {this.state.nome}.</Navbar.Brand>
          <Navbar.Brand> Seu token é: {this.state.token}</Navbar.Brand>
          <Navbar.Brand className="justify-content-end">
            <div>
              <div className="dropleft">
                <a href="/#" data-toggle="dropdown">
                  <img
                    src={require('./../../assets/imgs/profile_avatar.png')}
                    width="30"
                    height="30"
                    alt="Perfil"
                  />
                </a>
                <div className="dropdown-menu">
                  <p>Nome: {this.state.nome}</p>
                  <p>Email: {this.state.email}</p>
                  <p>Token: {this.state.token}</p>
                  <Button className="botao-acao" variant="secondary" onClick={this.logout}>Sair</Button>
                </div>
              </div>
            </div>

          </Navbar.Brand>
        </Navbar>
      </div>
    )
  }
}

export default Header
