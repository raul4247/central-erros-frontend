import React, { Component } from "react"
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
      return { nome: props.userData.nome, token: props.userData.token }

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
        <nav class="navbar navbar-expand-md bg-light">
          <ul class="navbar-nav nav-fill w-100 flex-md-row">
            <li class="nav-item nome-item">
              <p class="nome">Bem vindo {this.state.nome}</p>
            </li>
            <li class="nav-item token-item">
              <p class="token"><span class="bold-label">Token:</span> {this.state.token}</p>
            </li>
            <li class="nav-item logout-item">
              <button type="button" class="btn btn-link btn-logout" onClick={this.logout}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header
