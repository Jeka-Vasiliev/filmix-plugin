import { h, render } from 'preact'
import App from './App'
import genresJson from './genres.json'

const genres = genresJson as { [id: string]: string };

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({ selected: { '2': true } }, ({ selected }) => {
    render(<App genres={ genres } selected= { selected } />, document.getElementById('root'))
  })
})
