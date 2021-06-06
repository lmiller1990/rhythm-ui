import {
  EngineConfiguration,
  GameNote,
  initGameState,
  Input,
  updateGameState,
  World,
} from "@lmiller1990/rhythm-engine";
import { Difficulty, Song } from "./types";

const config: EngineConfiguration = {
  maxHitWindow: 100,
  timingWindows: [],
};

type Column = "1" | "2" | "3" | "4" | "5" | "6";

type Key = "KeyA" | "KeyS" | "KeyD" | "KeyL" | "Semicolon" | "Quote";

const mapping: Record<Key, Column> = {
  KeyA: "1",
  KeyS: "2",
  KeyD: "3",
  KeyL: "4",
  Semicolon: "5",
  Quote: "6",
};

const NORMALIZE_CONSTANT = 1;
const START_DELAY = 1000;
const SONG_OFFSET = 100;

let notes: UINote[] = [];
let playing = false;
let lastUpdate: number;

const cols = new Map<Column, HTMLDivElement>()

let inputs: Input[] = [];

function initKeydownListener(offset: number) {
  window.addEventListener("keydown", (event: KeyboardEvent) => {
    const col = event.code as Key
    const code = mapping[col];
    if (!code) {
      return;
    }

    const $col = cols.get(mapping[col])!
    $col.classList.remove('lane-flash')
    setTimeout(() => {
      $col.classList.add('lane-flash')
    }, 0)
    // const $target = selectTargetByColumn(code)
    // targetFlash($target)

    inputs.push({
      ms: event.timeStamp - offset - START_DELAY - SONG_OFFSET,
      code,
    });
  });
}

function gameLoop(state: World) {
  const frameTime = performance.now();

  if (!playing && frameTime - startTime > START_DELAY) {
    audio.play();
    playing = true;
  }

  // if (state.time > 2400) {
  //   return
  // }

  const temp = [...notes];

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const engineNote = state.chart.notes.get(note.id)!;

    const stale = engineNote.ms + START_DELAY + SONG_OFFSET < state.time;
    if (stale) {
      playTick();
      const removed = temp.shift();
      if (!removed) {
        throw Error("Expected to find UINote but did not get one");
      }
      removed.$el.remove();
    }

    const yPos = engineNote.ms + START_DELAY + SONG_OFFSET - state.time;
    note.$el.style.top = `${yPos * NORMALIZE_CONSTANT}px`;
  }

  notes = temp;

  if (!notes.length) {
    audio.pause();
    console.log("Finish");
    return;
  }

  const newState = updateGameState(state, config);

  const newWorld: World = {
    chart: newState.chart,
    time: frameTime,
    inputs,
  };

  if (frameTime - lastUpdate > 200) {
    console.log(newWorld)
    lastUpdate = frameTime;
  }

  if (inputs.length) {
    inputs = [];
  }
  requestAnimationFrame(() => gameLoop(newWorld));
}

interface UINote {
  id: string;
  $el: HTMLDivElement;
}

let audio: HTMLAudioElement;

// https://stackoverflow.com/questions/35497243/how-to-make-a-short-beep-in-javascript-that-can-be-called-repeatedly-on-a-page
const a = new AudioContext();
function k(gain: number, hz: number, ms: number) {
  const v = a.createOscillator();
  const u = a.createGain();
  v.connect(u);
  v.frequency.value = hz;
  v.type = "square";
  u.connect(a.destination);
  u.gain.value = gain * 0.01;
  v.start(a.currentTime);
  v.stop(a.currentTime + ms * 0.0001);
}

let startTime: number;

function playTick() {
  k(5, 1000, 200);
}

export function initializeAudio(song: Song, onCanPlayThrough?: () => void) {
  audio = document.createElement("audio");
  if (onCanPlayThrough) {
    audio.addEventListener("canplaythrough", onCanPlayThrough);
  }
  playing = false;
  audio.pause();
  audio.volume = 0.2;
  audio.currentTime = 0;
  audio.src = `http://localhost:5000/resources/${song.name}/song.mp3`;
}

export function init({
  song,
  difficulty,
}: {
  song: Song;
  difficulty: Difficulty;
}) {
  startTime = performance.now();

  const chart = song.difficulties.find((x) => x.name === difficulty)!.chart;
  const gameChart = initGameState(chart);

  const world: World = {
    inputs: [],
    time: startTime,
    chart: gameChart,
  };

  const gameNotes = Array.from(gameChart.notes).reduce<GameNote[]>(
    (acc, curr) => [...acc, curr[1]],
    []
  );


  const getCol = (col: Column) =>
    document.querySelector<HTMLDivElement>(`[data-game=col-${col}]`)!;

  cols.set("1", getCol("1"))
  cols.set("2", getCol("2"))
  cols.set("3", getCol("3"))
  cols.set("4", getCol("4"))
  cols.set("5", getCol("5"))
  cols.set("6", getCol("6"))

  for (const gameNote of gameNotes) {
    const $note = document.createElement("div");
    $note.className = `bg-gray-300 absolute note`;
    $note.style.height = `calc(100vh / 25)`
    $note.style.top = `${
      (gameNote.ms + START_DELAY + SONG_OFFSET) / NORMALIZE_CONSTANT
    }px`;
    cols.get(gameNote.code as Column)!.appendChild($note);
    notes.push({
      id: gameNote.id,
      $el: $note,
    });
  }

  lastUpdate = startTime;

  initKeydownListener(startTime);

  initializeAudio(song, () => {
    window.requestAnimationFrame(() => gameLoop(world));
  });
}
