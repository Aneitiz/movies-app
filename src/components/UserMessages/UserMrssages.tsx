import React from 'react'
import './UserMessages.css'
import { Spin, Alert } from 'antd'

export const ImageLoadingSpinner = () => {
  return (
    <div className="image-loading-spinner">
      <Spin size="large" style={{ marginTop: 'auto', marginBottom: 'auto' }} />
    </div>
  )
}

export const OnUnfoundedMovie = () => {
  return (
    <div className="alerts-block">
      <Alert message="No movies Founded." description="Please, check your request" type="warning" showIcon />
    </div>
  )
}

export const onOffline = () => {
  return (
    <div className="alerts-block">
      <Alert
        message="Please, check your internet connection. Or use vpn"
        description="Please, try again with VPN"
        type="warning"
        showIcon
      />
    </div>
  )
}
export const noRatedMovies = () => {
  return (
    <div className="alerts-block">
      <Alert
        message="No rated movies"
        description="Here's no rated movies yet, you can change it, just send your scores, for any movie"
        type="warning"
        showIcon
      />
    </div>
  )
}

export const onErrorAlert = () => {
  return (
    <div className="alerts-block">
      <Alert
        message="Oh, no, everything is broken"
        description="We already trying to fix it, please try again"
        type="warning"
        showIcon
      />
    </div>
  )
}
