import { defaultGenre } from './genres'

const defaultSelectedKeys = { selectedKeys: [defaultGenre] }

export function readFromStorage() {
  return new Promise<number[]>(resolve =>
    chrome.storage.sync.get(defaultSelectedKeys, ({ selectedKeys }) => {
      resolve(selectedKeys)
    }),
  )
}

export function saveToStorage(selectedKeys: number[]) {
  return new Promise<void>(resolve => chrome.storage.sync.set({ selectedKeys }, resolve))
}
