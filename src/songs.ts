import { Song } from './types'

export const songs: Song[] = Array(20).fill(undefined).map((x, idx) => ({
  id: (idx + 1).toString(),
  noteCount: 100,
  bpm: 175,
  artist: 'Some artist',
  durationInSec: 110,
  name: `Song ${idx + 1}`,
  difficulties: Array(3).fill(undefined).map((x, idx) => ({
    level: idx === 0 ? 3 : idx === 1 ? 6 : 10,
    name: idx === 0 ? 'easy' : idx === 1 ? 'medium' : 'hard'
  }))
}))