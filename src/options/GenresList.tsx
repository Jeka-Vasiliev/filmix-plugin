import { h } from 'preact'

import { allAvailableGenres } from '../genres'
import { SelectedGenres } from '../shared/types'
import { Genre } from './Genre'

interface GenresListProps {
  selected: SelectedGenres
  onSwitchGenre: (genreId: number) => void
}
export function GenresList({ selected, onSwitchGenre }: GenresListProps) {
  const genreIds = Object.keys(allAvailableGenres).map(Number)
  return <div>
    <span>Поиск по фильмам, имеющим <b>все</b> выбранные жанры</span>
    {genreIds.map(genreId =>
      <Genre
        key={genreId.toString()}
        genreId={genreId}
        checked={selected[genreId]}
        onSwitchGenre={onSwitchGenre}
      />)
    }
  </div>
}
