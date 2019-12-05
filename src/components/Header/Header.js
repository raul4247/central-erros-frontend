import React, { Component } from "react"
import { Navbar } from 'react-bootstrap'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { username: 'USUÁRIO', token: 'TOKEN' }
  }

  showPerfilPopUp() {
    console.log('pop up')
  }

  render() {
    return (
      <div>
        <Navbar bg="light" expand="true">
          <Navbar.Brand>Bem vindo {this.state.username}.</Navbar.Brand>
          <Navbar.Brand> Seu token é: {this.state.token}</Navbar.Brand>
          <Navbar.Brand className="justify-content-end">
            <img
              src={require('./../../assets/imgs/profile_avatar.png')}
              width="30"
              height="30"
              onClick={this.showPerfilPopUp}
              alt="Perfil"
            />
          </Navbar.Brand>
        </Navbar>
      </div>
    )
  }
}

export default Header
