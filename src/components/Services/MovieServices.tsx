import { transformData, transformRatedData } from '../../helper/helper'

const apiMovies = 'https://api.themoviedb.org/3/'
const apiKey = 'd7089144e10b9bed5441f8e478ee7bbf'

export default class MovieServices {
  async getSearchMovie(query: string, page: number) {
    let request = await fetch(`${apiMovies}search/movie?api_key=${apiKey}&query=${query}&page=${page}`)
    if (!request.ok) {
      throw new Error(`Something went wrong, ${request.status}`)
    }
    const res = await request.json()
    return {
      results: res.results.map(transformData),
      page: res.page,
      totalResults: res.total_results,
    }
  }

  async getTags() {
    const request = await fetch(`${apiMovies}genre/movie/list?api_key=${apiKey}&language=en-US`)
    if (!request.ok) {
      throw new Error(`Tags getting troubles, ${request.status}`)
    }
    return request.json()
  }

  async setGuestSession() {
    const request = await fetch(`${apiMovies}authentication/guest_session/new?api_key=${apiKey}`)
    if (!request.ok) {
      throw new Error(`Failed to set guest session request, ${request.status}`)
    }
    const res = await request.json()
    return res.guest_session_id
  }

  async rateMovie(movieId: string | number, rating: number) {
    const GuestId = localStorage.getItem('GuestId')
    const body = {
      value: rating,
    }
    const rateRequest = await fetch(
      `${apiMovies}movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${GuestId}`,
      {
        method: 'POST',
        headers: {
          'Content-type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(body),
      }
    )
    return rateRequest.json()
  }

  async getRatedMovies(page: number) {
    const GuestId = localStorage.getItem('GuestId')
    let request
    request = await fetch(
      `${apiMovies}guest_session/${GuestId}/rated/movies?api_key=${apiKey}&page=${page}&language=en-US`
    )
    const res = await request.json()
    return {
      results: res.results.map(transformRatedData),
      page: res.page,
      totalResults: res.total_results,
      rating: res.rating,
    }
  }
}
