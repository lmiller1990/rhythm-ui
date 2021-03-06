import {
  Chart,
  EngineConfiguration,
  GameChart,
  GameNote,
  initGameState,
  Input,
  summarizeResults,
  timeOfLastNote,
  updateGameState,
  World,
} from '@lmiller1990/rhythm-engine'
import { Difficulty, Song } from './types'
import { EventEmitter } from 'events'
import { windows } from './constants'

export const emitter = new EventEmitter()

declare global {
  interface Window {
    world: World
  }
}

const config: EngineConfiguration = {
  maxHitWindow: 100,
  timingWindows: [
    {
      name: windows[0],
      windowMs: 50,
    },
    {
      name: windows[1],
      windowMs: 100,
    },
  ],
}

const PRE_SONG_DELAY = 2000
const END_BUFFER = 1000

type Column = '1' | '2' | '3' | '4' | '5' | '6'

type Key = 'KeyA' | 'KeyS' | 'KeyD' | 'KeyF' | 'KeyG' | 'KeyH'

interface UINote {
  id: string
  $el: HTMLDivElement
  ticked: boolean
  drawn: boolean
}

const mapping: Record<Key, Column> = {
  KeyA: '1',
  KeyS: '2',
  KeyD: '3',
  KeyF: '4',
  KeyG: '5',
  KeyH: '6',
}

const NORMALIZE_CONSTANT = 1

const cols = new Map<Column, HTMLDivElement>()
let inputs: Input[] = []

export function applyAnimation($col: HTMLDivElement, className: string) {
  const $el = $col.querySelector<HTMLDivElement>(`[data-game="target-el"]`)!

  $el.classList.remove(className)
  setTimeout(() => {
    $el.classList.add(className)
  }, 0)
}

const handleKeydown =
  (event: KeyboardEvent) => (startTime: number, delay: number) => {
    console.log('Keydown')
    const col = event.code as Key
    const code = mapping[col]
    if (!code) {
      return
    }

    const $col = cols.get(mapping[col])!

    applyAnimation($col, 'target-hit')

    inputs.push({
      ms: event.timeStamp - startTime - delay,
      code,
    })
  }

function initKeydownListener(startTime: number, delay: number) {
  window.addEventListener('keydown', (event) =>
    handleKeydown(event)(startTime, delay)
  )
}

interface GameplayMeta {
  startTime: number
  delay: number
  playing: boolean
  audio: HTMLAudioElement
  notes: Map<string, UINote>
  frameCount: number
}

let framesSinceLastDebugUpdate = 0
const viewportHeight = window.innerHeight

// get current time
// update note UI
// remove stale notes from DOM
// see if we have finished the song
function gameLoop(
  state: World,
  { delay, startTime, playing, audio, notes, frameCount }: GameplayMeta
) {
  const frameTime = performance.now()

  if (!playing && frameTime - startTime > PRE_SONG_DELAY) {
    framesSinceLastDebugUpdate = frameCount
    audio.play()
    playing = true
  }

  const deltaTime = frameTime - state.startTime

  for (const [id, note] of notes) {
    const engineNote = state.chart.notes.get(note.id)!
    const yPos = engineNote.ms - deltaTime + delay
    const yPosConsideringSpeedMod = yPos * NORMALIZE_CONSTANT

    if (yPos < viewportHeight && !engineNote.hitAt) {
      note.$el.style.top = `${yPosConsideringSpeedMod}px`
      if (!note.drawn) {
        cols.get(engineNote.code as Column)!.appendChild(note.$el)
        note.drawn = true
      }
    }

    // if (!note.ticked && yPos < 0) {
    //   playTick()
    //   note.ticked = true;
    // }

    if (engineNote.hitAt || yPos < -200) {
      note.$el.remove()
      notes.delete(id)
    }
  }

  if (notes.size === 0) {
    audio!.pause()
    console.log('Finish')
    return
  }

  // console.log(deltaTime)
  const newState = updateGameState(
    { ...state, time: deltaTime + delay },
    config
  )

  if (newState.previousFrameMeta.judgementResults.length) {
    // some notes were judged on the previous window
    for (const judgement of newState.previousFrameMeta.judgementResults) {
      console.log(judgement)
      const note = newState.chart.notes.get(judgement.noteId)
      if (!note) {
        throw Error(
          `Could not judged note with id ${judgement.noteId}. This should never happen.`
        )
      }
    }
  }

  const newWorld: World = {
    ...state,
    chart: newState.chart,
    time: frameTime,
    inputs: [...inputs],
  }

  if (inputs.length) {
    inputs = []
  }

  window.world = newWorld

  frameCount++

  // console.log(frameCount, framesSinceLastDebugUpdate)
  if (frameCount - framesSinceLastDebugUpdate > 60) {
    const noteCount = document.querySelectorAll('.is-note').length
    document.querySelector<HTMLTableDataCellElement>(
      '#debug-notes'
    )!.textContent = noteCount.toString() || 'N/A'
    framesSinceLastDebugUpdate = framesSinceLastDebugUpdate
  }

  requestAnimationFrame(() =>
    gameLoop(newWorld, { delay, startTime, playing, audio, frameCount, notes })
  )
}

// https://stackoverflow.com/questions/35497243/how-to-make-a-short-beep-in-javascript-that-can-be-called-repeatedly-on-a-page
const a = new AudioContext()
function k(gain: number, hz: number, ms: number) {
  const v = a.createOscillator()
  const u = a.createGain()
  v.connect(u)
  v.frequency.value = hz
  v.type = 'square'
  u.connect(a.destination)
  u.gain.value = gain * 0.01
  v.start(a.currentTime)
  v.stop(a.currentTime + ms * 0.0001)
}

function playTick() {
  // k(5, 1000, 200);
}

export function initializeAudio(
  song: Song,
  onCanPlayThrough?: (audio: HTMLAudioElement) => void
) {
  const audio = document.createElement('audio')
  audio.pause()
  audio.volume = 0.2
  audio.currentTime = 0
  if (onCanPlayThrough) {
    audio.addEventListener('canplaythrough', () => {
      console.log('Can play through')
      onCanPlayThrough(audio)
    })
  }
  audio.src = `http://localhost:5000/resources/${song.name}/song.mp3`
}

function startGame({
  chart,
  song,
  gameChart,
  delay,
  audio,
  notes,
}: {
  song: Song
  chart: Chart<string>
  gameChart: GameChart
  delay: number
  audio: HTMLAudioElement
  notes: Map<string, UINote>
}) {
  if (!audio) {
    throw Error('audio element not found. Did you forget to initialize it?')
  }

  const endTime =
    timeOfLastNote(chart) + song.offset + END_BUFFER + PRE_SONG_DELAY

  setTimeout(() => {
    audio!.pause()
    window.removeEventListener('keydown', handleKeydown)
    const summary = summarizeResults(window.world, windows)
    emitter.emit('gameplay:done', { summary })
  }, endTime)

  // audio.play();
  const startTime = performance.now()
  const world: World = {
    inputs: [],
    startTime,
    time: startTime,
    chart: gameChart,
  }
  initKeydownListener(startTime, delay)
  window.requestAnimationFrame(() =>
    gameLoop(world, {
      delay,
      startTime,
      playing: false,
      audio,
      frameCount: 0,
      notes,
    })
  )
}

export const noteClassBase = `rounded-md is-note`
export const noteClass = `absolute ${noteClassBase}`
export const targetClass = `is-target`

export function init({
  song,
  difficulty,
}: {
  song: Song
  difficulty: Difficulty
}) {
  const notes = new Map<string, UINote>()

  const chart = song.difficulties.find((x) => x.name === difficulty)!.chart
  const gameChart = initGameState({
    ...chart,
    notes: chart.notes.map((x) => {
      return {
        ...x,
        ms: x.ms + PRE_SONG_DELAY,
      }
    }),
  })

  const gameNotes = Array.from(gameChart.notes).reduce<GameNote[]>(
    (acc, curr) => [...acc, curr[1]],
    []
  )

  const getCol = (col: Column) =>
    document.querySelector<HTMLDivElement>(`[data-game=col-${col}]`)!

  cols.set('1', getCol('1'))
  cols.set('2', getCol('2'))
  cols.set('3', getCol('3'))
  cols.set('4', getCol('4'))
  cols.set('5', getCol('5'))
  cols.set('6', getCol('6'))

  for (const gameNote of gameNotes) {
    const $note = document.createElement('div')
    $note.className = `${noteClass} is-note-${gameNote.code}`
    // cols.get(gameNote.code as Column)!.appendChild($note);
    const note: UINote = {
      id: gameNote.id,
      $el: $note,
      drawn: false,
      ticked: false,
    }
    notes.set(gameNote.id, note)
  }

  initializeAudio(song, (audio: HTMLAudioElement) => {
    startGame({
      song,
      gameChart,
      chart,
      delay: song.offset,
      audio,
      notes,
    })
  })
}
