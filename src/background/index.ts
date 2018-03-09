const defaultSelectedKeys = { selected: { 2: true } }
chrome.pageAction.onClicked.addListener(({ id: tabId }) => {
  if (tabId === undefined) {
    throw new Error('No current active tab')
  }
  chrome.storage.sync.get(defaultSelectedKeys, ({ selected }) => {
    const checked = Object.keys(selected).filter( id => selected[id])
    const code = `var genres = ${JSON.stringify(checked)};`
    chrome.tabs.executeScript(tabId, { code }, () => {
      chrome.tabs.executeScript(tabId, { file: 'inject.bundle.js' })
    })
  })
})

chrome.runtime.onMessage.addListener( message => {
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
