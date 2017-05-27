/**
 * Возвращает общее количество страниц из html ответа
 * @param {string} html 
 * @returns number
 */
export function getPagesCount(html) {
  const films = []
  const rootNode = document.createElement('div')
  rootNode.innerHTML = html
  const [navigationBar] = rootNode.getElementsByClassName('navigation');
  const clickableSpans = navigationBar.getElementsByClassName('click');
  // предположение, что последняя ссылка ведет на последнюю страницу
  const lastSpan = clickableSpans[clickableSpans.length - 1];
  return Number(lastSpan.innerHTML);
}

/**
 * Возвращает массив url из html ответа
 * @param {string} html 
 */
export function parseUrls (html) {
  const films = []
  const rootNode = document.createElement('div')
  rootNode.innerHTML = html
  const articles = rootNode.getElementsByTagName('article')
  for (let i = 0; i < articles.length; i++) {
    const allLinks = articles[i].getElementsByTagName('a')
    let url = ''
    for (let j = 0; j < allLinks.length; j++) {
      if (allLinks[j].getAttribute('itemprop') === 'url') {
        url = allLinks[j].getAttribute('href')
        break
      }
    }
    films.push(url)
  }
  return films
}
