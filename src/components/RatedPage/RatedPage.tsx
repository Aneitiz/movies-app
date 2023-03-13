import React, { Component } from 'react'
import './RatedPage.css'
import { Pagination } from 'antd'

import MovieServices from 'Services/MovieServices'

import CardList from '../CardList'

type MovieDataObject = {
  id: number
  title: string
  description: string
  releaseDate: string
  posterPath: string
  voteAverage: number
  tagId: []
  rating: number
}
interface RatedPageState {
  ratedMovieData: [] | MovieDataObject[]
  error: null | boolean
  loading: boolean
  totalResults: null | number
  currentPage: number
  rating: number | null
  ratedPage: boolean | null
}

export default class RatedPage extends Component<{}, RatedPageState> {
  movieService = new MovieServices()

  state = {
    ratedMovieData: [],
    error: null,
    loading: false,
    totalResults: 0,
    currentPage: 1,
    rating: 0,
    ratedPage: true,
  }

  componentDidMount() {
    this.setState({ loading: true })
    this.addRatedMovies()
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.state.currentPage !== prevState.currentPage) {
      this.reloadState()
      this.addRatedMovies()
    }
    if (this.state.totalResults !== prevState.totalResults) {
      this.addRatedMovies()
    }
  }

  addRatedMovies() {
    this.movieService
      .getRatedMovies(this.state.currentPage)
      .then((movies: any) => {
        this.setState(() => {
          return {
            ratedMovieData: movies.results,
            currentPage: movies.page,
            totalResults: movies.totalResults,
            loading: false,
            rating: movies.rating,
          }
        })
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  onPageChange = (currentPage: number) => {
    this.setState(() => {
      return {
        currentPage: currentPage,
      }
    })
  }

  reloadState = () => {
    const { currentPage } = this.state
    this.setState(() => {
      return {
        ratedMovieData: [],
        error: false,
        loading: false,
        totalResults: 0,
        currentPage: currentPage,
        rating: 0,
        ratedPage: true,
      }
    })
  }

  render() {
    const { ratedMovieData, loading, currentPage, totalResults, error, ratedPage } = this.state
    const queryChecker = true
    return (
      <React.Fragment>
        <main className="main">
          <CardList
            queryChecker={queryChecker}
            moviesItems={ratedMovieData}
            loading={loading}
            // @ts-ignore
            error={error}
            ratedPage={ratedPage}
          />
          <Pagination
            onChange={this.onPageChange}
            total={totalResults}
            pageSize={20}
            current={currentPage}
            defaultCurrent={1}
          />
        </main>
      </React.Fragment>
    )
  }
}
