import { defaultGenreId } from './genres'

const defaultSelectedGenreIds = { selectedGenreIds: [defaultGenreId] }

export function loadSelectedGenres() {
  return new Promise<number[]>(resolve =>
    chrome.storage.sync.get(defaultSelectedGenreIds, ({ selectedGenreIds }) => {
      resolve(selectedGenreIds)
    }),
  )
}

export function saveSelectedGenres(selectedGenreIds: number[]) {
  return new Promise<void>(resolve => chrome.storage.sync.set({ selectedGenreIds }, resolve))
}
