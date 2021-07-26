import { chart } from './feeling-the-best'
import { Song } from '../../types'

export const feelingTheBest: Song = {
  id: '3',
  displayName: 'Feeling the Best',
  name: 'feeling-the-best',
  bpm: 125,
  offset: 1325,
  artist: 'David Renda',
  durationInSec: 15,
  difficulties: [
    {
      name: 'easy',
      level: 3,
      noteCount: 100,
      chart,
    },
    {
      name: 'medium',
      level: 5,
      noteCount: 100,
      chart,
    },
    {
      name: 'hard',
      level: 8,
      noteCount: 100,
      chart,
    },
  ],
}
