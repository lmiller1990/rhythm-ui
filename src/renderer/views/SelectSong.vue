<template>
  <div class="absolute" :style="style">
    <pulse 
      :style="currentSongStyle" 
      class="absolute bg-gray-100 opacity-20"
      :pulse="focused"
      ref="currentSongRef" 
    />

    <transition-group name="cell" tag="div">
      <div 
        v-for="(song, idx) of songList"
        :key="song.id"
        class="bg-gray-800 text-white p-4 relative"
        :style="{ zIndex: idx === songList.length - 1 ? 1 : 10  }"
        ref="songItemRef"
      >
        <label class="text-3xl">
          {{ song.name }}
        </label>
        <div class="flex justify-between">
          <p class="text-xl">Easy Lv 1</p>
          <p class="text-xl">100%</p>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref, watchEffect } from 'vue'
import { Song } from '../types'
import { useStore } from '../store'
import { songSelectWidth } from '../style'
import { useMenuState } from '../components/useMenuState'
import Pulse from '../components/Pulse.vue'
import { useRouter } from 'vue-router'

export function reorderList<T>(
  list: T[],
  { direction }: { direction: 'next' | 'prev' }
) {
  const newList: T[] = []

  for (let i = 0; i < list.length; i++) {
    const next = direction === 'next' ? list[i + 1] : list[i - 1]

    if (next) {
      newList.push(next)
    } else {
      newList.push(list[list.length - i - 1])
    }
  }

  return newList
}

export default defineComponent({
  components: {
    Pulse
  },

  setup() {
    // current song is N songs from the start of the song list
    // eg songs[selectedSongOffset]
    const selectedSongOffset = 5

    const store = useStore()
    const songList = ref<Song[]>(store.allSongs)
    const songItemRef = ref<HTMLDivElement>()
    const currentSongRef = ref<HTMLDivElement>()
    const menuState = useMenuState()
    const router = useRouter()

    const focused = computed(() => {
      return menuState.focused.value === 'song-wheel'
    })


    watchEffect(() => {
      const currentSong = songList.value[selectedSongOffset]
      store.setCurrentSongId(currentSong.id)
    })

    const currentSongStyle = computed(() => {
      if (!currentSongRef.value || !songItemRef.value) {
        return
      }
      
      const songRect = songItemRef.value.getBoundingClientRect()

      return {
        top: `${songRect.height * selectedSongOffset}px`,
        height: `${songRect.height}px`,
        width: `${songSelectWidth}px`,
        zIndex: 100
      }
    })

    const style = computed(() => {
      if (!songItemRef.value) {
        return
      }

      return {
        top: `-${songItemRef.value.getBoundingClientRect().height}px`,
        width: `${songSelectWidth}px`
      }
    })

    const changeSong = (direction: 'prev' | 'next') => {
      songList.value = reorderList(songList.value, { direction })
    }

    const next = () => changeSong('next')
    const prev = () => changeSong('prev')

    const keyListener = (e: KeyboardEvent) => {
      if (menuState.focused.value !== 'song-wheel') {
        return
      }

      if (['ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault()
      }

      if (e.code === 'ArrowUp') {
        changeSong('prev')
      }

      if (e.code === 'ArrowDown') {
        changeSong('next')
      }

      if (e.code === 'Enter') {
        router.push('/gameplay')
      }
    }

    window.addEventListener('keydown', keyListener)
    onUnmounted(() => {
      window.removeEventListener('keydown', keyListener)
    })

    return {
      songItemRef,
      currentSongRef,
      currentSongStyle,
      style,
      songList,
      next,
      prev,
      focused
    }
  }
})
</script>

<style scoped>
.cell-move {
  transition: transform 0.2s ease;
} 
</style>
