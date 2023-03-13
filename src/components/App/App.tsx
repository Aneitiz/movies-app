import React, { Component } from 'react'

import './App.css'
import MovieServices from 'Services/MovieServices'
import { TagProvider } from 'context/TagProvider/TagProvider'

import TabBar from '../TabBar'
import SearchPage from '../SearchPage'
import { TabNames } from '../../constants'
import RatedPage from '../RatedPage'
import { onErrorAlert } from '../UserMessages/UserMrssages'

interface AppState {
  tags: [] | null
  selectedTab: string
}

type Tags = { tags: [] | null; selectedTab: string }

export default class App extends Component<{}, AppState> {
  movieService = new MovieServices()

  state = {
    tags: null,
    selectedTab: 'searchPage',
  }

  componentDidMount() {
    this.setGuestSession()
    this.getTextContext()
  }

  onChangeTab = (tabName: string) => {
    try {
      this.setState({
        selectedTab: tabName,
      })
    } catch (error) {
      return onErrorAlert()
    }
  }

  setGuestSession = () => {
    if (!localStorage.getItem('GuestId')) {
      this.movieService.setGuestSession().then((res) => {
        localStorage.setItem('GuestId', res)
      })
    }
  }

  getTextContext = () => {
    this.movieService.getTags().then((res) => {
      this.setState({ tags: res.genres })
    })
  }

  render() {
    const { tags, selectedTab }: Tags = this.state
    const content = (selectedTab: string) => {
      if (selectedTab === TabNames.ratedTab) return <RatedPage />
      return <SearchPage />
    }
    return (
      <section className="app">
        <TabBar onChangeTab={this.onChangeTab} />
        <TagProvider value={tags}>{content(selectedTab)}</TagProvider>
      </section>
    )
  }
}
