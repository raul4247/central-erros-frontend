import React, { Component } from "react"
import './LevelLabel.css'

class LevelLabel extends Component {
  constructor(props) {
    super(props)
    this.state = { log: this.props.log }
    this.levelClass = this.levelClass.bind(this)
  }

  static getDerivedStateFromProps(props) {
    if (props.level !== undefined)
      return { level: props.level }
    return null
  }

  levelClass(level) {
    if (level === "WARNING")
      return "-warning"
    if (level === "DEBUG")
      return "-primary"
    if (level === "ERROR")
      return "-danger"
    if (level === "INFO")
      return "-success"
    return ""
  }

  render() {
    return (
      <div className="col text-center" onClick={this.props.onClick}>
        <p className={"badge badge-pill level-label badge" + this.levelClass(this.state.log.level)}>{this.state.log.level}</p>
      </div>
    )
  }
}

export default LevelLabel
