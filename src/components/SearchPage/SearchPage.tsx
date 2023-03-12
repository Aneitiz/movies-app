import React, { Component } from 'react'
import { Offline, Online } from 'react-detect-offline'
import { Pagination } from 'antd'

import MovieServices from '../Services/MovieServices'
import SearchPanel from '../SearchPanel'
import CardList from '../CardList'
import { onOffline } from '../UserMessages/UserMrssages'

type MovieData = [] | null

interface SearchPageState {
  movieData: MovieData
  totalResults: number
  loading: boolean
  currentPage: number
  error: boolean | Error
  query: string
}

export default class SearchPage extends Component<{}, SearchPageState> {
  state = {
    movieData: null,
    totalResults: 0,
    loading: false,
    currentPage: 1,
    error: false,
    query: '',
  }

  movieService = new MovieServices()

  componentDidMount() {
    if (localStorage.getItem('searchPage')) {
      // @ts-ignore
      this.setState(JSON.parse(localStorage.getItem('searchPage')))
    } else {
      localStorage.removeItem('searchPage')
    }
  }

  componentDidUpdate(prevProps: {}, prevState: SearchPageState) {
    if (this.state.query !== prevState.query) {
      this.reloadState()
      this.addMovies(this.state.query, this.state.currentPage)
    }
    if (this.state.currentPage !== prevState.currentPage) {
      this.reloadState()
      this.addMovies(this.state.query, this.state.currentPage)
    }
  }

  componentWillUnmount() {
    localStorage.setItem('searchPage', JSON.stringify(this.state))
  }

  reloadState = () => {
    const { query, currentPage } = this.state
    this.setState(() => {
      return {
        movieData: [],
        totalResults: 0,
        loading: true,
        currentPage: currentPage,
        error: false,
        query: query,
      }
    })
  }

  onError = () => {
    this.setState(() => {
      return {
        error: true,
        loading: false,
      }
    })
  }

  addMovies(text: string, page: number) {
    this.movieService
      .getSearchMovie(text, page)
      .then((movies) => {
        this.setState(() => {
          return {
            totalResults: movies.totalResults,
            movieData: movies.results,
            currentPage: movies.page,
            loading: false,
          }
        })
      })
      .catch(this.onError)
  }

  onSearch = (text: string) => {
    this.setState({
      query: text,
      loading: true,
    })
  }

  onPageChange = (currentPage: number) => {
    this.setState(() => {
      return {
        currentPage: currentPage,
      }
    })
  }

  render() {
    const { movieData, totalResults, currentPage, loading, error } = this.state
    return (
      <React.Fragment>
        <Online>
          <React.Fragment>
            <SearchPanel onSearch={this.onSearch} />
            <main className="main">
              <CardList moviesItems={movieData} loading={loading} error={error} />
              <Pagination
                onChange={this.onPageChange}
                total={totalResults}
                pageSize={20}
                current={currentPage}
                defaultCurrent={1}
                showSizeChanger={false}
                hideOnSinglePage
              />
            </main>
          </React.Fragment>
        </Online>
        <Offline>{onOffline()}</Offline>
      </React.Fragment>
    )
  }
}
