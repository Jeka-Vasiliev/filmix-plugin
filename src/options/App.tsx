import { Component, h } from 'preact'

import { allAvailableGenres, GenresNames } from '../genres'
import { SelectedGenres } from '../shared/types'
import { GenresList } from './GenresList'
import { saveSelectedGenres } from '../storage';

interface AppProps {
  selected: SelectedGenres
}
interface AppState {
  selected: SelectedGenres
}

export const initialState = (prevState: AppState, { selected }: AppProps) =>
  ({ selected })

export const saveToStorage = (selected: SelectedGenres) => {
  const genreIds = Object.keys(selected).filter(id => selected[id]).map(Number)
  return saveSelectedGenres(genreIds)
}

export default class App extends Component<AppProps, AppState> {
  public componentWillMount() {
    this.setState(initialState)
  }
  public handleChange = (genreId: number) => {
    this.setState(switchGenreSelectetion(genreId), () => saveToStorage(this.state.selected))
  }
  public render(_: AppProps, { selected }: AppState) {
    return <GenresList selected={selected} onSwitchGenre={this.handleChange} />
  }
}

function switchGenreSelectetion(genreId: number) {
  return ({ selected }: AppState) => ({
    selected: { ...selected, [genreId]: !selected[genreId] },
  })
}

export function initializeState(allAvailableGenres: GenresNames, selectedGenres: number[]) {
  return Object.keys(allAvailableGenres).reduce((acc, key) => {
    const genreId = Number(key)
    acc[genreId] = selectedGenres.includes(genreId)
    return acc
  }, {} as { [id: number]: boolean })
}
