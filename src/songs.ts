import { Song } from './types'
import { uberRave } from './resources/uber-rave'

export const songs: Song[] = Array(20).fill(uberRave).map((song, idx) => ({...song, id: (idx + 1).toString() }))