import { loadSelectedGenres } from '../storage'

const defaultSelectedKeys = { selected: { 2: true } }
chrome.pageAction.onClicked.addListener(async ({ id: tabId }) => {
  if (tabId === undefined) {
    throw new Error('No current active tab')
  }
  const selectedGenreIds = await loadSelectedGenres()

  const code = `var genres = ${JSON.stringify(selectedGenreIds)};`
  chrome.tabs.executeScript(tabId, { code }, () => {
    chrome.tabs.executeScript(tabId, { file: 'inject.bundle.js' })
  })
})

chrome.runtime.onMessage.addListener(message => {
  // tslint:disable-next-line:no-console
  console.log(message)
})

const enableOnFilmixRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'filmix.me', schemes: ['http', 'https'] },
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([enableOnFilmixRule])
  })
})
