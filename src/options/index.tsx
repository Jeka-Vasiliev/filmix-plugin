import { h, render } from 'preact'

import { allAvailableGenres } from '../genres'
import App from './App'
import genresJson from './genres.json'

const root = document.getElementById('root')
if (root === null) {
  throw new Error('Element with id = "root" not found')
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({ selected: { 2: true } }, ({ selected }) => {
    render(<App genreNames={allAvailableGenres} selected={selected} />, root)
  })
})
