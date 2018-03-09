/**
 * Возвращает общее количество страниц из html ответа
 * @param {string} html
 * @returns number
 */
export function getPagesCount(html: string) {
  const rootNode = document.createElement('div')
  rootNode.innerHTML = html
  const navigationBar = rootNode.getElementsByClassName('navigation').item(0)
  const clickableSpans = navigationBar.getElementsByClassName('click')
  // предположение, что последняя ссылка ведет на последнюю страницу
  const lastSpan = clickableSpans[clickableSpans.length - 1]
  return Number(lastSpan.innerHTML)
}

/**
 * Возвращает массив url из html ответа
 * @param {string} html
 */
export function parseUrls(html: string) {
  const htmlParser = document.createElement('div')
  htmlParser.innerHTML = html
  const articles = Array.from(htmlParser.getElementsByTagName('article'))
  return articles
    .map(article => {
      const allLinks = Array.from(article.getElementsByTagName('a'))
      const urlLink = allLinks.find(link => link.getAttribute('itemprop') === 'url') || ''
      return urlLink && urlLink.getAttribute('href') || ''
    })
    .filter(url => url !== '')
}
