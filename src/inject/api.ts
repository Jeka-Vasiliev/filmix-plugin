import { getPagesCount, parseUrls } from './filmixResponseParsers'

export const searchUrl = '/engine/ajax/sphinx_search.php'

/**
 * Возвращает html с результатами поиска
 * @param {number} pageNumber Номер страницы
 * @param {number[]} genreIds Id жанров
 */
export function getFilmixSearchHtml (pageNumber, genreIds) {
  const body = new URLSearchParams()
  body.append('search_start', pageNumber)
  for (let id in genreIds) {
    body.append('ganre[]', genreIds[id])
  }

  const init = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    body
  }

  return fetch(searchUrl, init)
    .then(result => result.text())
}

export function getPagesCountForGenres (genreIds) {
  return getFilmixSearchHtml(0, genreIds)
    .then(html => getPagesCount(html))
}

export function getUrlsFromPageForGenres (randomPage, genreIds) {
  return getFilmixSearchHtml(randomPage, genreIds)
    .then(html => parseUrls(html))
}
