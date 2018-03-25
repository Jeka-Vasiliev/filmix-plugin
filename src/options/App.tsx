import { Component, h } from 'preact'

import { GenresNames } from '../genres'
import { SelectedGenres } from '../shared/types'
import Genre from './Genre'

interface AppProps {
  genreNames: GenresNames
  selected: SelectedGenres
}
interface AppState {
  selected: SelectedGenres
}

export const check = (id: string, isChecked: boolean) => ({ selected }: AppState) =>
  ({ selected: { ...selected, [id]: isChecked } })

export const initialState = (prevState: AppState, { selected }: AppProps) =>
  ({ selected })

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
  public render({ genreNames }: AppProps, { selected }: AppState) {
    return (
      <div>
        <span>Поиск по фильмам, имеющим <b>все</b> выбранные жанры</span>
        {Object.keys(genreNames).map(id =>
          <Genre key={id}
            id={id}
            text={genreNames[Number(id)]}
            checked={selected[id]}
            onChange={this.handleChange} />,
        )}
      </div>
    )
  }
}

export function initializeState(allAvailableGenres: GenresNames, selectedGenres: number[]) {
  return Object.keys(allAvailableGenres).reduce((acc, key) => {
    const genreId = Number(key)
    acc[genreId] = selectedGenres.includes(genreId)
    return acc
  }, {} as { [id: number]: boolean })
}
