chrome.pageAction.onClicked.addListener(({id}) => {
  if (id === undefined) throw new Error("");
  chrome.storage.sync.get({ selected: { '2': true } }, ({ selected }) => {
    const checked = Object.keys(selected).filter(id => selected[id])
    const code = `var genres = ${JSON.stringify(checked)};`
      chrome.tabs.executeScript(id, { code }, () => {
        chrome.tabs.executeScript(id, { file: 'inject.bundle.js' })
      })
  })
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

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([enableOnFilmixRule])
  })
})
