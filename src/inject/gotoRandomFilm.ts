import { getPagesCountForGenres, getUrlsFromPageForGenres } from './api'
import { randomInt } from './utils'

/**
 * Меняет текущую страницу на случайный фильм из списка жанров
 * @param {string[]} genreIds Список id жанров
 */
export default function gotoRandomFilm(genreIds: string[]) {
  getPagesCountForGenres(genreIds)
    .then(pagesCount => {
      const randomPage = randomInt(0, pagesCount)
      return getUrlsFromPageForGenres(randomPage, genreIds)
    })
    .then(urls => {
      const randomUrlIndex = randomInt(0, urls.length - 1)

      chrome.runtime.sendMessage(`goto: ${urls[randomUrlIndex]}`)

      window.location.assign(urls[randomUrlIndex])
    })
}
