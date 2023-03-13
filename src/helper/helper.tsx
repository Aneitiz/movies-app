import { format } from 'date-fns'

interface Data {
  adult: boolean
  backdrop_path: string
  genre_ids: []
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  rating: number
}

const apiPosters = 'https://image.tmdb.org/t/p/original'

const sliceText = (text: string) => {
  const maxSymbolsLength = 145
  if (text.length < maxSymbolsLength) {
    return text
  }
  let cutText: string = text.slice(0, maxSymbolsLength)
  cutText = cutText.slice(0, cutText.lastIndexOf(''))
  return cutText + '...'
}
export const transformData = (data: Data) => {
  return {
    title: data.title,
    id: data.id,
    //eslint-ignore-line
    releaseDate: data.release_date ? format(new Date(data.release_date), "MMMM d',' y") : null, // eslint-disable-line
    description: sliceText(data.overview),
    voteAverage: data.vote_average,
    tagId: data.genre_ids,
    posterPath: data.poster_path ? `${apiPosters}${data.poster_path}` : null,
  }
}

export const transformRatedData = (data: Data) => {
  return {
    title: data.title,
    id: data.id,
    releaseDate: data.release_date ? format(new Date(data.release_date), "MMMM d',' y") : null, // eslint-disable-line
    description: sliceText(data.overview),
    voteAverage: data.vote_average,
    tagId: data.genre_ids,
    posterPath: data.poster_path ? `${apiPosters}${data.poster_path}` : null,
    rating: data.rating,
  }
}
