import { chart } from './uber-rave'
import { Song } from '../../types'

export const uberRave: Song = {
  id: '1',
  name: 'Uber Rave',
  bpm: 175,
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