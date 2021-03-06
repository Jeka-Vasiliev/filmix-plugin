import { GenresNames } from '../genres'
import { initializeState } from './App'

describe('initializeState', () => {
    it('should return inital state with all genres', () => {
        const testGenres: GenresNames = {
            1: 'one',
            2: 'two',
            3: 'three',
        }

        const res = initializeState(testGenres, [])

        expect(res).toEqual({
            1: false,
            2: false,
            3: false,
        })
    })

    it('should return initial state with true for previously selected genres', () => {
        const testGenres: GenresNames = {
            1: 'one',
            2: 'two',
            3: 'three',
        }
        const selectedGenres = [2]

        const res = initializeState(testGenres, selectedGenres)

        expect(res).toEqual({
            1: false,
            2: true,
            3: false,
        })
    })
})
