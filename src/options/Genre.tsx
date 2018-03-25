import { h } from 'preact'
import { allAvailableGenres } from '../genres'

interface GenreProps {
  key: string
  genreId: number
  checked: boolean
  onSwitchGenre: (genreId: number) => void
}

export function Genre({ genreId, checked = false, onSwitchGenre }: GenreProps) {
  const text = allAvailableGenres[genreId]
  return <div>
    <input
      type="checkbox"
      value={genreId.toString()}
      checked={checked}
      onChange={() => onSwitchGenre(genreId)}
    />
    {text}
  </div>
}
