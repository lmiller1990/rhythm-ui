import { Song } from './types'
import { uberRave } from './resources/uber-rave'
import { drums } from './resources/100-bpm-drums'
import { feelingTheBest } from './resources/feeling-the-best'

const createFiller = (num: number): Song[] =>
  Array(num)
    .fill(uberRave)
    .map<Song>((song, idx) => ({
      ...song,
      name: 'N/A',
      displayName: 'N/A',
      id: (Math.random() * 10000).toFixed(0),
    }))

export const songs: Song[] = [
  ...createFiller(5),
  uberRave,
  drums,
  feelingTheBest,
  ...createFiller(17),
]
