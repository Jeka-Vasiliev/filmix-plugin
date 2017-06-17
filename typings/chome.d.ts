// недостающие классы
declare namespace chrome.declarativeContent {
  interface PageStateMatcherParams extends chrome.declarativeContent.PageStateMatcher{}
  class PageStateMatcher {
    constructor(params: PageStateMatcherParams)
  }
  class ShowPageAction { }
  const onPageChanged: chrome.events.Event<() => void>
}