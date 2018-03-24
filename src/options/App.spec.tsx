import { Genres } from '../genres'
import { initializeState } from './App'

describe('initializeState', () => {
    it('should return inital state with all genres', () => {
        const testGenres: Genres = {
            1: 'one',
            2: 'two',
            3: 'three',
        }

        const res = initializeState(testGenres)

        expect(res).toEqual({
            1: false,
            2: false,
            3: false,
        })
    })
})
