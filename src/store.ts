import { App, inject, reactive, readonly } from 'vue'
import { songs } from './songs'
import { Song } from './types'

interface State {
  songs: {
    selectedId: string | undefined
    ids: string[]
    all: Map<string, Song>
  }
}

const sym = Symbol('store')

class Store {
  private state: State

  install(app: App) {
    app.provide(sym, this)
  }

  constructor() {
    this.state = reactive({
      songs: {
        selectedId: undefined,
        all: new Map(songs.map(x => [x.id, x])),
        ids: songs.map(x => x.id)
      }
    })
  }

  getState() {
    return readonly(this.state)
  }

  setCurrentSongId(id: string | undefined) {
    this.state.songs.selectedId = id
  }

  get selectedSong() {
    if (!this.state.songs.selectedId) {
      return
    }
    return this.state.songs.all.get(this.state.songs.selectedId)
  }

  get allSongs(): Song[] {
    return this.state.songs.ids.map(id => this.state.songs.all.get(id)!)
  }
}

export const store = new Store()

export function useStore(): Store {
  const _store = inject<Store>(sym)
  if (!_store) {
    throw Error(`Did you forget to do app.use(store)`)
  }
  return _store
}
