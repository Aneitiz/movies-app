import React, { Component } from 'react'
import './CardList.css'
import { Spin } from 'antd'

import MovieCard from '../MovieCard'
import { OnUnfoundedMovie, noRatedMovies, onErrorAlert } from '../UserMessages/UserMrssages'

interface CardListProps {
  moviesItems: [] | CardListMovies[]
  loading: boolean
  error: boolean
  ratedPage?: boolean

  queryChecker: boolean
}

type CardListMovies = {
  id: number
  title: string
  description: string
  releaseDate: string
  posterPath: string
  voteAverage: number
  tagId: []
  rating: number
}

export default class CardList extends Component<CardListProps, {}> {
  render() {
    let { moviesItems, loading, error, ratedPage, queryChecker } = this.props
    if (!loading && !error && moviesItems && moviesItems.length !== 0 && queryChecker) {
      let tasks = moviesItems.map((movie: CardListMovies) => {
        const { id, title, description, releaseDate, posterPath, voteAverage, tagId, rating } = movie
        return (
          <MovieCard
            id={id}
            key={id}
            title={title}
            description={description}
            releaseDate={releaseDate}
            posterPath={posterPath}
            loading={loading}
            voteAverage={voteAverage}
            tagId={tagId}
            rating={rating}
          />
        )
      })
      return <ul className="card-list ">{tasks}</ul>
    }
    if (loading) {
      return (
        <ul className="card-list">
          <Spin size="large" />
        </ul>
      )
    }
    if (queryChecker && moviesItems.length === 0) {
      return <React.Fragment>{OnUnfoundedMovie()}</React.Fragment>
    }
    if (ratedPage && moviesItems && moviesItems.length === 0) {
      return <React.Fragment>{noRatedMovies()}</React.Fragment>
    }
    if (error) {
      return <React.Fragment>{onErrorAlert()}</React.Fragment>
    }
  }
}
