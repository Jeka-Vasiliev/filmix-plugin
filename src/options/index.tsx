import { h, render } from 'preact';
import { SelectedGenres, StorageOptions } from '../shared/types';
import App from './App';
import genresJson from './genres.json';

const genres = genresJson as { [id: string]: string };
const root = document.getElementById('root');
if (root === null) {
  throw new Error('Element with id = "root" not found');
}

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get({ selected: { 2: true } }, ({ selected }: StorageOptions) => {
    render(<App names={genres} selected={selected} />, root);
  });
});
