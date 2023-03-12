import React, { Component } from 'react'
import './SearchPanel.css'
import { Input } from 'antd'
import { debounce } from 'lodash'

interface SearchPanelProps {
  onSearch: Function
}

interface SearchPanelState {
  inputValue: string
}

export default class SearchPanel extends Component<SearchPanelProps, SearchPanelState> {
  state = {
    inputValue: '',
  }

  onChangeInputValue = (e: { target: HTMLInputElement }) => {
    this.setState({
      inputValue: e.target.value,
    })

    this.sendQuery()
  }

  sendQuery = debounce(() => {
    if (this.state.inputValue.trim() !== '') {
      this.props.onSearch(this.state.inputValue)
    }
  }, 1500)

  onFocus = () => {
    this.setState(() => {
      return {
        inputValue: '',
      }
    })
  }

  render(): React.ReactElement {
    const { inputValue } = this.state
    return (
      <Input
        className="search-panel"
        placeholder="Type to search..."
        onFocus={this.onFocus}
        onChange={this.onChangeInputValue}
        value={inputValue}
      />
    )
  }
}
