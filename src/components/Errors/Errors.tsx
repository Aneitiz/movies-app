import React, { Component } from 'react'
import './Errors.css'
import { AlertFilled } from '@ant-design/icons'

export default class Errors extends Component {
  render() {
    return (
      <div className="error">
        <AlertFilled size={3} />
        <span>Oh, something went wrong, we already try to fix this thing</span>
      </div>
    )
  }
}
