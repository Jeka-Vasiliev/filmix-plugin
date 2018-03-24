import { Component, h } from 'preact'

import { Genres } from '../genres'
import { GenresNames, SelectedGenres } from '../shared/types'
import Genre from './Genre'

interface AppProps {
  names: GenresNames
  selected: SelectedGenres
}
interface AppState {
  selected: SelectedGenres
}

/**
 * Переключает выбор жанра
 * @param {string} id Id жанра
 * @param {boolean} checked Выбран ли
 */
export const check = (id: string, isChecked: boolean) => ({ selected }: AppState) =>
  ({ selected: { ...selected, [id]: isChecked } })

/**
 * Начальное состояние из props
 */
export const initialState = (prevState: AppState, { selected }: AppProps) =>
  ({ selected })

/**
 * Сохранение выбранных в хранилище
 */
export const saveToStorage = (selected: SelectedGenres) => {
  chrome.storage.sync.set({ selected })
}

export default class App extends Component<AppProps, AppState> {
  public componentWillMount() {
    this.setState(initialState)
  }
  public handleChange = (event: Event) => {
    const checkbox = event.target as HTMLInputElement
    const id = checkbox.value
    const isChecked = checkbox.checked
    this.setState(check(id, isChecked), () => saveToStorage(this.state.selected))
  }
  public render({ names }: AppProps, { selected }: AppState) {
    return (
      <div>
        <span>Поиск по фильмам, имеющим <b>все</b> выбранные жанры</span>
        {Object.keys(names).map(id =>
          <Genre key={id}
            id={id}
            text={names[id]}
            checked={selected[id]}
            onChange={this.handleChange} />,
        )}
      </div>
    )
  }
}

export function initializeState(allAvailableGenres: Genres, selectedGenres: number[]) {
  return Object.keys(allAvailableGenres).reduce((acc, key) => {
    const genreId = Number(key)
    acc[genreId] = selectedGenres.includes(genreId)
    return acc
  }, {} as { [id: number]: boolean })
}
