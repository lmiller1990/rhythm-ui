import { chart } from './100-bpm-drums'
import { Song } from '../../types'

export const drums: Song = {
  id: '2',
  displayName: '100 BPM Drums',
  name: '100-bpm-drums',
  bpm: 100,
  offset: 5250,
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
