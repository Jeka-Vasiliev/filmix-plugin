// $.post('/engine/ajax/sphinx_search.php'

fetch('/engine/ajax/sphinx_search.php', { method: 'POST', body: JSON.stringify({ search_start: 1, ganre: [2] }) })
    .then(result => result.text())
    .then(html => {
      const films = []
      const rootNode = document.createElement('div')
      rootNode.innerHTML = html
      const articles = rootNode.getElementsByTagName('article')
      for (let i = 0; i < articles.length; i++) {
        const filmId = articles[i].getAttribute('data-id')
        const playUrl = articles[i].getElementsByClassName('watch')[0].getAttribute('href')
        const allLinks = articles[i].getElementsByTagName('a')
        let url = ''
        for (let j = 0; j < allLinks.length; j++) {
          if (allLinks[j].getAttribute('itemprop') === 'url') {
            url = allLinks[j].getAttribute('href')
            break
          }
        }
        films.push({ filmId, playUrl, url })
      }
      return films
    })
    .then(films => console.log(films))
