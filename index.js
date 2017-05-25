
function changeCurrentUrl (newUrl) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tab) => {
    chrome.tabs.update(tab.id, { url: newUrl })
  })
}

function setButtonHandler () {
  const button = document.getElementById('goto-button')
  button.addEventListener('click', () => changeCurrentUrl('https://www.google.ru/'))
}

function main () {
  setButtonHandler()
}

document.addEventListener('DOMContentLoaded', main)
