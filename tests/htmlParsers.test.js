import fs from 'fs'
import { getPagesCount, parseUrls } from '../src/inject/filmixResponseParsers'

const html = fs.readFileSync('tests/response-example.html.txt', 'utf-8')

test('getPagesCount', () => {
  expect(getPagesCount(html)).toBe(4316)
})

test('parseFilmixResponse', () => {
  const expected = [
    'https://filmix.me/mistika/5819-hrupkost-fragile-2005.html',
    'https://filmix.me/sport/45823-evro-2012-chempionat-evropy-match-ukraina-shveciya-2012.html',
    'https://filmix.me/sport/33750-vitaliy-klichko-vs-derek-chisora-2012.html',
    'https://filmix.me/mistika/6143-smotret-onlajn-omen-666-2006.html',
    'https://filmix.me/anime/18871-ohotnik-na-vampirov-di-zhazhda-krovi-vampire-hunter-d-bloodlust.html',
    'https://filmix.me/sport/21883-boks-boy-za-titul-chempiona-mira-vladimir-klichko-devid-hey-2011.html',
    'https://filmix.me/tv/25526-mihail-zadornov-ya-lyublyu-ameriku-2011.html',
    'https://filmix.me/multserialy/71949-vremya-priklyucheniy-adventure-timhttp-filmix.net-adminmodeditnewsactioneditnewsid71949e-with-finn-jake-multserial-2010-.html',
    'https://filmix.me/sport/34511-vladimir-klichko-vs-zhan-mark-mormek-2012.html',
    'https://filmix.me/tv/28718-kvn-50-let-yubileynyy-vypusk-2011.html',
    'https://filmix.me/tv/34673-uralskie-pelmeni-krasota-spaset-mymr-2012.html',
    'https://filmix.me/tv/56533-koncert-pavla-voli-konec-sveta-2012.html',
    'https://filmix.me/tv/31127-mihail-zadornov-smeh-skvoz-hohot-2012.html',
    'https://filmix.me/sport/45723-evro-2012-chempionat-evropy-match-rossiya-chehiya-2012.html',
    'https://filmix.me/tv/25616-nerealnaya-istoriya-2011.html'
  ]

  expect(parseUrls(html)).toEqual(expected)
})
