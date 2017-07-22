import { h, Component } from 'preact'
import Genre from './Genre'

type AppProps = {
  genres?: { [id: string]: string },
  selected?: { [id: string]: boolean }
}
type AppState = {
  selected: { [id: string]: boolean }
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
export const saveToStorage = (selected: { [id: string]: boolean }) => {
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
  render({ genres }: AppProps, { selected }: AppState) {
    if (genres === undefined) {
      return <p>Произошла ошибка!</p>;
    }

    return (
      <div>
        <span>Поиск по фильмам, имеющим <b>все</b> выбранные жанры</span>
        {Object.keys(genres).map(id =>
          <Genre key={id}
            id={id}
            text={genres[id]}
            checked={selected[id]}
            onChange={this.handleChange} />
        )}
      </div>
    )
  }
}
