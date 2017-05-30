import { h, Component } from 'preact'
import Genre from './Genre'

/**
 * Переключает выбор жанра
 * @param {number} id Id жанра
 * @param {boolean} checked Выбран ли
 */
export const check = (id, isChecked) => ({ selected }) => ({ selected: { ...selected, [id]: isChecked } })

/**
 * Начальное состояние из props
 */
export const initialState = (_, { selected }) => ({ selected })

/**
 * Сохранение выбранных в хранилище
 */
export const saveToStorage = (selected) => chrome.storage.sync.set({ selected })

export default class App extends Component {
  componentWillMount () {
    this.setState(initialState)
  }
  handleChange = (event) => {
    const id = event.target.value
    const isChecked = event.target.checked
    this.setState(check(id, isChecked), () => saveToStorage(this.state.selected))
  }
  render ({ genres }, { selected }) {
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
