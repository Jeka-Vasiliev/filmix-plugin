import { h, render } from 'preact'

import App from './App'

const root = document.getElementById('root')
if (root === null) {
  throw new Error('Element with id = "root" not found')
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({ selected: { 2: true } }, ({ selected }) => {
    render(<App selected={selected} />, root)
  })
})
