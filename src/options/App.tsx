import { h, Component } from 'preact'
import Genre from './Genre'
import { SelectedGenres, GenresNames } from '../shared/types'

type AppProps = {
  names: GenresNames,
  selected: SelectedGenres
}
type AppState = {
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
  componentWillMount() {
    this.setState(initialState)
  }
  handleChange = (event: Event) => {
    const checkbox = event.target as HTMLInputElement;
    const id = checkbox.value
    const isChecked = checkbox.checked
    this.setState(check(id, isChecked), () => saveToStorage(this.state.selected))
  }
  render({ names }: AppProps, { selected }: AppState) {
    return (
      <div>
        <span>Поиск по фильмам, имеющим <b>все</b> выбранные жанры</span>
        {Object.keys(names).map(id =>
          <Genre key={id}
            id={id}
            text={names[id]}
            checked={selected[id]}
            onChange={this.handleChange} />
        )}
      </div>
    )
  }
}
