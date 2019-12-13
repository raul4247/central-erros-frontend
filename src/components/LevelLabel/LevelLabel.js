import React, { Component } from "react"
import './LevelLabel.css'

class LevelLabel extends Component {
  constructor(props) {
    super(props)
    this.state = { log: this.props.log }
    this.levelClass = this.levelClass.bind(this)
    this.showDetails = this.showDetails.bind(this)
  }

  static getDerivedStateFromProps(props) {
    if (props.level !== undefined)
      return { level: props.level }
    return null
  }

  showDetails() {
      this.props.history.push({
      pathname: '/home/details',
      state: { log: this.state.log }
    })
  }

  levelClass(level) {
    if (level === "WARNING")
      return "-warning"
    if (level === "DEBUG")
      return "-primary"
    if (level === "ERROR")
      return "-danger"
    return ""
  }

  render() {
    return (
      <div className="col text-center" onClick={this.showDetails.bind(this)}>
        <p className={"badge badge-pill level-label badge" + this.levelClass(this.state.log.level)}>{this.state.log.level}</p>
      </div>
    )
  }
}

export default LevelLabel
