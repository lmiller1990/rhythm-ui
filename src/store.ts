import { Summary } from "@lmiller1990/rhythm-engine";
import { App, inject, reactive, readonly } from "vue";
import { uberRave } from "./resources/uber-rave";
import { songs } from "./songs";
import { Difficulty, Song } from "./types";

interface State {
  /**
   * all the songs in the system, and the id of the currently selected on.
   * it's set on the select song page.
   */
  songs: {
    selectedId: string | undefined;
    ids: string[];
    all: Map<string, Song>;
  };

  /**
   * selected difficulty. it's set from the select song page.
   */
  selectedDifficulty: Difficulty;

  /**
   * summary of the last song that was played.
   * it's populated after the gameplay finishes,
   * but before routing to the /summary route
   */
  gameplaySummary: Summary | undefined;
}

export const sym = Symbol("store");

export function createInitState(): State {
  return {
    songs: {
      selectedId: undefined,
      all: new Map(songs.map((x) => [x.id, x])),
      ids: songs.map((x) => x.id),
    },
    selectedDifficulty: "easy",
    gameplaySummary: undefined,
  };
}

class Store {
  private state: State;

  install(app: App) {
    app.provide(sym, this);
  }

  constructor(initState: State = createInitState()) {
    this.state = reactive(initState)
  }

  getState() {
    return readonly(this.state);
  }

  setCurrentSongId(id: string | undefined) {
    this.state.songs.selectedId = id;
  }

  get selectedSong() {
    return uberRave;

    if (!this.state.songs.selectedId) {
      return;
    }
    return this.state.songs.all.get(this.state.songs.selectedId!);
  }

  get allSongs(): Song[] {
    return this.state.songs.ids.map((id) => this.state.songs.all.get(id)!);
  }

  setSelectedDifficulty(difficulty: Difficulty) {
    this.state.selectedDifficulty = difficulty;
  }
}

export const store = new Store();

export const createStore = (initState?: State) => new Store(initState);

export function useStore(): Store {
  const _store = inject<Store>(sym);
  if (!_store) {
    throw Error(`Did you forget to do app.use(store)`);
  }
  return _store;
}
