import {
  EngineConfiguration,
  GameNote,
  initGameState,
  updateGameState,
  World,
} from "@lmiller1990/rhythm-engine";
import { Difficulty, Song } from "./types";

const config: EngineConfiguration = {
  maxHitWindow: 100,
  timingWindows: [],
};

type Column = "1" | "2" | "3" | "4" | "5" | "6";

let notes: UINote[] = [];
let lastUpdate: number;

function gameLoop(state: World) {
  const frameTime = performance.now();

  const temp = [...notes]
  // console.log(notes.length)
  for (let i = 0; i < notes.length; i++) {
    const note = notes[i]
    const engineNote = state.chart.notes.get(note.id)!

    const stale = engineNote.ms < state.time
    if (stale) {
      const removed = temp.shift()
      if (!removed) {
        throw Error('Expected to find UINote but did not get one')
      }
      removed.$el.remove()
    }

    const yPos = engineNote.ms - state.time
    note.$el.style.top = `${yPos * NORMALIZE_CONSTANT}px`
  }

  notes = temp

  if (!notes.length) {
    console.log('Finish')
    return
  }

  const newState = updateGameState(state, config);

  const newWorld: World = {
    chart: newState.chart,
    time: frameTime,
    inputs: [],
  };


  if (frameTime - lastUpdate > 200) {
    // console.log(newWorld)
    lastUpdate = frameTime;
  }

  requestAnimationFrame(() => gameLoop(newWorld));
}

interface ActiveSong {
  song: Song;
  difficulty: Difficulty;
}

interface UINote {
  id: string;
  $el: HTMLDivElement;
}

const NORMALIZE_CONSTANT = 1;

export function init({
  song,
  difficulty,
}: {
  song: Song;
  difficulty: Difficulty;
}) {
  const startTime = performance.now();
  console.log("init");

  const chart = song.difficulties.find((x) => x.name === difficulty)!.chart;
  const gameChart = initGameState(chart);

  const world: World = {
    inputs: [],
    time: startTime,
    chart: gameChart,
  };

  const getCol = (col: Column) =>
    document.querySelector<HTMLDivElement>(`[data-game=col-${col}]`)!;

  const cols = new Map<Column, HTMLDivElement>([
    ["1", getCol("1")],
    ["2", getCol("2")],
    ["3", getCol("3")],
    ["4", getCol("4")],
    ["5", getCol("5")],
    ["6", getCol("6")],
  ]);

  const gameNotes = Array.from(gameChart.notes).reduce<GameNote[]>(
    (acc, curr) => [...acc, curr[1]],
    []
  );

  for (const gameNote of gameNotes) {
    const $note = document.createElement("div");
    $note.className = `bg-red-400 h-4 absolute note`;
    $note.style.top = `${gameNote.ms / NORMALIZE_CONSTANT}px`;
    cols.get(gameNote.code as Column)!.appendChild($note);
    notes.push({
      id: gameNote.id,
      $el: $note,
    });
  }

  console.log(notes);

  lastUpdate = startTime;

  window.requestAnimationFrame(() => gameLoop(world));
}
