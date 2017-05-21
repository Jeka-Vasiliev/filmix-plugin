$.post('/engine/ajax/sphinx_search.php', {
  ganre: [2],
  search_start: 1
}, (res) => {
  console.log(res);
})