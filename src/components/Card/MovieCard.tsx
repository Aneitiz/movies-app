import React, { Component } from 'react'
import './MovieCard.css'
import { Typography, Card, Rate, Badge, Tag, Image, notification } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'

import { ImageLoadingSpinner } from '../UserMessages/UserMrssages'
import MovieServices from '../Services/MovieServices'
import { TagConsumer } from '../../TagProvider/TagProvider'

// @ts-ignore
import image from './SuperHackerEasterEgg.jpg'

interface CardProps {
  id: number
  key: number
  title: string | undefined
  releaseDate: string
  loading: boolean
  posterPath: string | undefined
  description: string | null
  voteAverage: number
  tagId: []
  rating: number
}

export default class MovieCard extends Component<CardProps, { ratingValue: null | number }> {
  state = {
    ratingValue: null,
  }

  movies = new MovieServices()

  voteAverageColors(vote: number) {
    let fixedVote: number = Number(vote.toFixed(2))
    if (fixedVote <= 3) return '#E90000'
    if (fixedVote <= 5) return '#E97E00'
    if (fixedVote <= 7) return '#E9D100'
    return '#66E900'
  }

  onRateMovie = (value: number) => {
    const openNotification = (text: string, success: boolean) => {
      notification.open({
        message: 'We saved your score on this movie',
        description: text,
        icon: success ? (
          <CheckCircleOutlined style={{ color: 'red' }} />
        ) : (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ),
      })
    }
    this.movies
      .rateMovie(this.props.id, value)
      .catch(() => {
        openNotification('Sorry, we cant save your score on this movie', true)
      })
      .then(() => {
        openNotification('We·saved·your·score·on·this·movie,·you·can·check·it·on·Rated·page', false)
        this.setState({ ratingValue: value })
      })
  }

  createTags = (tagIdsArray: [], tagNames: any) => {
    const res = tagIdsArray.map((id: number) => {
      const tag: any = tagNames.filter((item: any) => item.id === id).at(0)
      return tag.name
    })

    const tagList = res.map((item: string) => {
      return (
        <Tag key={Math.random() * 100000} className="movie-card__tag tag" color="purple">
          {item}
        </Tag>
      )
    })

    return <React.Fragment>{tagList}</React.Fragment>
  }

  render() {
    const { Title, Paragraph } = Typography
    const { title, releaseDate, posterPath, description, voteAverage, tagId, rating } = this.props
    const { ratingValue } = this.state
    let fixedVote = Number(voteAverage.toFixed(2))
    return (
      <li className="card-item">
        <Badge className="card__badge" count={fixedVote} color={this.voteAverageColors(voteAverage)}>
          <Card
            className="card"
            hoverable
            cover={
              <Image
                placeholder={ImageLoadingSpinner()}
                src={posterPath ? posterPath : image}
                className="card__image"
                alt={title}
              />
            }
          >
            <Title className="card__title" level={5}>
              {title}
            </Title>
            <Paragraph>{releaseDate}</Paragraph>
            <Paragraph>
              <TagConsumer>{(value) => this.createTags(tagId, value)}</TagConsumer>
            </Paragraph>
            <Paragraph>{description}</Paragraph>
            <Rate
              onChange={this.onRateMovie}
              allowHalf
              count={10}
              style={{ fontSize: '16px' }}
              // @ts-ignore
              value={rating ? rating : ratingValue}
            />
          </Card>
        </Badge>
      </li>
    )
  }
}
