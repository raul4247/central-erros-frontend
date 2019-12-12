import React, { Component } from "react"
import './Header.css'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { nome: 'USUÁRIO', token: 'TOKEN', email: 'EMAIL' }
    this.logout = this.logout.bind(this)
  }

  static getDerivedStateFromProps(props) {
    if (props.userData !== undefined)
      return { nome: props.userData.nome, token: props.userData.token }

    return null;
  }

  logout() {
    this.props.history.replace({
      pathname: '/'
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-md bg-light">
          <ul className="navbar-nav nav-fill w-100 flex-md-row">
            <li className="nav-item nome-item">
              <p className="nome font-weight-light">Bem vindo {this.state.nome}</p>
            </li>
            <li className="nav-item token-item">
              <p className="token"><span className="bold-label">Token:</span> {this.state.token}</p>
            </li>
            <li className="nav-item logout-item">
              <button type="button" className="btn btn-link btn-logout" onClick={this.logout}>Logout</button>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header
