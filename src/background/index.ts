import { SelectedGenres, StorageOptions } from '../shared/types';

chrome.pageAction.onClicked.addListener(({ id: typeId }) => {
  if (typeId === undefined) {
    throw new Error('No current active tab');
  }
  chrome.storage.sync.get({ selected: { 2: true } }, ({ selected }: StorageOptions) => {
    const checked = Object.keys(selected).filter( id => selected[id]);
    const code = `var genres = ${JSON.stringify(checked)};`;
    chrome.tabs.executeScript(typeId, { code }, () => {
      chrome.tabs.executeScript(typeId, { file: 'inject.bundle.js' });
    });
  });
});

chrome.runtime.onMessage.addListener( message => {
  // tslint:disable-next-line:no-console
  console.log(message);
});

const enableOnFilmixRule = {
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { hostEquals: 'filmix.me', schemes: ['http', 'https'] },
    }),
  ],
  actions: [new chrome.declarativeContent.ShowPageAction()],
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([enableOnFilmixRule]);
  });
});
