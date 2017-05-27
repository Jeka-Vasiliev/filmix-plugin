import { getPagesCount, parseUrls } from './filmixResponseParsers'

export const searchUrl = '/engine/ajax/sphinx_search.php'

export async function getPagesCountForGenres (genreIds) {
  const body = new URLSearchParams()
  body.append('search_start', 0)
  body.append('ganre[]', genreIds)

  const result = await fetch(searchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body
  })

  const html = await result.text()
  return getPagesCount(html)
}

export async function getUrlsFromPageForGenres (randomPage, genreIds) {
  const body = new URLSearchParams()
  body.append('search_start', 0)
  body.append('ganre[]', genreIds)

  const result = await fetch(searchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    body
  })

  const html = await result.text()
  return parseUrls(html)
}
