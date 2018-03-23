import { Component, h } from 'preact'
import { genres } from '../genres'
import { GenresNames, SelectedGenres } from '../shared/types'
import { saveToStorage } from '../storage'
import Genre from './Genre'

interface AppProps {
  initialSelectedGenres: number[]
}
interface AppState {
  genreCheckboxes: {
    [id: number]: boolean;
  }
}

export const check = (id: string, isChecked: boolean) => ({ genreCheckboxes }: AppState) =>
  ({ selected: { ...selected, [id]: isChecked } })
export function enableGenre(id: string) {
  return ({ selectedGenres }: AppState) => ({ selectedGenres: 123 })
}

export default class App extends Component<AppProps, AppState> {
  public componentWillMount() {
    this.setState(initializeState)
  }
  public handleChange = (event: Event) => {
    const checkbox = event.target as HTMLInputElement
    const id = checkbox.value
    const isChecked = checkbox.checked
    this.setState(check(id, isChecked), () => saveToStorage(this.state.selected))
  }
  public render(_: AppProps, { genreCheckboxes }: AppState) {
    return (
      <div>
        <span>Поиск по фильмам, имеющим <b>все</b> выбранные жанры</span>
        {Object.keys(genreCheckboxes).map(id =>
          <Genre key={id}
            id={id}
            text={genreCheckboxes[id]}
            checked={selected[id]}
            onChange={this.handleChange} />,
        )}
      </div>
    )
  }
}

export function initializeState(_: AppState, { initialSelectedGenres }: AppProps): Partial<AppState> {
  return {
    genreCheckboxes: Object.keys(genres).reduce<AppState['genreCheckboxes']>((acc, id) => {
      acc[Number(id)] = false
      return acc
    }, {}),
  }
}
