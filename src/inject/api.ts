import { getPagesCount, parseUrls } from './filmixResponseParsers';

export const searchUrl = '/engine/ajax/sphinx_search.php';

/**
 * Возвращает html с результатами поиска
 * @param {number} pageNumber Номер страницы
 * @param {string[]} genreIds Id жанров
 */
export function getFilmixSearchHtml(pageNumber: number, genreIds: string[]) {
  const body = new URLSearchParams();
  body.append('search_start', pageNumber.toString());
  genreIds.forEach(id => body.append('ganre[]', id));

  const init: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },
    body,
  };

  return fetch(searchUrl, init)
    .then(result => result.text());
}

export function getPagesCountForGenres(genreIds: string[]) {
  return getFilmixSearchHtml(0, genreIds)
    .then(html => getPagesCount(html));
}

export function getUrlsFromPageForGenres(randomPage: number, genreIds: string[]) {
  return getFilmixSearchHtml(randomPage, genreIds)
    .then(html => parseUrls(html));
}
