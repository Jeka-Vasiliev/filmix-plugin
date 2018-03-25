export const defaultGenre = 2

export interface GenresNames {
  [genreId: number]: string
}
export const allAvailableGenres: GenresNames = {
  1: 'Драмы',
  2: 'Ужасы',
  3: 'Боевики',
  4: 'Фэнтези',
  5: 'Мистика',
  6: 'Комедия',
  8: 'Триллеры',
  10: 'Трейлеры',
  12: 'Мелодрама',
  13: 'Фантастика',
  15: 'Документальные',
  16: 'Передачи с ТВ',
  18: 'Детектив',
  20: 'Военный',
  21: 'Аниме',
  71: 'Криминал',
  72: 'Мюзикл',
  73: 'Семейный',
  74: 'Приключения',
  75: 'Исторический',
  76: 'Биография',
  77: 'Спорт',
  79: 'Отечественные',
  80: 'Короткометражка',
  81: 'Вестерн',
  83: 'Оригинал',
  84: 'Детский',
  95: 'Игра',
  96: 'Музыка',
  97: 'Фильм-нуар',
  98: 'Ток-шоу',
  99: 'Реальное ТВ',
  100: 'Для взрослых',
  101: 'Ситком',
  102: 'Дорамы',
  103: 'Новости',
}
