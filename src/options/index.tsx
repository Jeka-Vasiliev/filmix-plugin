import { h, render } from 'preact'

import { genres } from '../genres'
import App from './App'

const root = document.getElementById('root')
if (root === null) {
  throw new Error('Element with id = "root" not found')
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({ selected: { 2: true } }, ({ selected }) => {
    render(<App names={genres} selected={selected} />, root)
  })
})
