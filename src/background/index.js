chrome.pageAction.onClicked.addListener((tab) => {
  chrome.tabs.executeScript(tab.id, { file: 'inject.bundle.js' })
})

chrome.runtime.onMessage.addListener((message) => {
  console.log(message)
})

const enableOnFilmixRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'filmix.me', schemes: ['http', 'https'] }
    })
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()]
}

chrome.runtime.onInstalled.addListener((details) => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([enableOnFilmixRule])
  })
})
