import { chart } from './uber-rave'
import { Song } from '../../types'

export const uberRave: Song = {
  id: '1',
  displayName: 'Uber Rave',
  name: 'uber-rave',
  bpm: 175,
  offset: 50,
  artist: 'Some artist',
  durationInSec: 110,
  difficulties: [
    {
      name: 'easy',
      level: 3,
      noteCount: 100,
      chart
    },
    {
      name: 'medium',
      level: 5,
      noteCount: 100,
      chart
    },
    {
      name: 'hard',
      level: 8,
      noteCount: 100,
      chart
    }
  ]
}
