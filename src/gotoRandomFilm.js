import { getPagesCountForGenres, getUrlsFromPageForGenres } from './api'
import { randomInt } from './utils'

/**
 * Меняет текущую страницу на случайный фильм из списка жанров
 * @param {number[]} genreIds Список id жанров
 */
export default async function gotoRandomFilm(genreIds) {
  const pagesCount = await getPagesCountForGenres(genreIds);
  const randomPage = randomInt(0, pagesCount);
  const urls = await getUrlsFromPageForGenres(randomPage, genreIds);
  const randomUrlIndex = randomInt(0, urls.length);
  window.location.assign(urls[randomUrlIndex]);
}
