import { getPagesCountForGenres, getUrlsFromPageForGenres } from './api'
import { randomInt } from './utils'

/**
 * Меняет текущую страницу на случайный фильм из списка жанров
 * @param {number[]} genreIds Список id жанров
 */
export default function gotoRandomFilm (genreIds) {
  getPagesCountForGenres(genreIds)
    .then(pagesCount => {
      const randomPage = randomInt(0, pagesCount)
      return getUrlsFromPageForGenres(randomPage, genreIds)
    })
    .then(urls => {
      const randomUrlIndex = randomInt(0, urls.length)
      chrome.runtime.sendMessage(`goto: ${urls[randomUrlIndex]}`)
      window.location.assign(urls[randomUrlIndex])
    })
}
