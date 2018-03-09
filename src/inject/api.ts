import { getPagesCount, parseUrls } from './filmixResponseParsers';

const searchUrl = '/engine/ajax/sphinx_search.php';

export function getPagesCountForGenres(genreIds: string[]) {
  return getFilmixSearchHtml(0, genreIds)
    .then(html => getPagesCount(html));
}

export function getUrlsFromPageForGenres(randomPage: number, genreIds: string[]) {
  return getFilmixSearchHtml(randomPage, genreIds)
    .then(html => parseUrls(html));
}

function getFilmixSearchHtml(pageNumber: number, genreIds: string[]) {
  const init: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: buildSearchRequestBody(pageNumber, genreIds),
    credentials: 'same-origin',
  };

  return fetch(searchUrl, init)
    .then(result => result.text());
}

function buildSearchRequestBody(pageNumber: number, genreIds: string[]) {
  const body = new URLSearchParams();
  body.append('search_start', pageNumber.toString());
  genreIds.forEach(id => body.append('ganre[]', id));
  return body.toString();
}
