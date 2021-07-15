<template>
  <div class="relative flex flex-col items-center">
    <div class="w-screen-md">
      <panel>
        <div class="h-30">
          {{ song.name }} TODO: Some cool banner
        </div>
      </panel>

      <panel>
        <ul>
          <li>Artist: {{ song.artist }}</li>
          <li>BPM: {{ song.bpm }}</li>
          <li>Length: {{ song.durationInSec }}</li>
        </ul>
      </panel>

      <div class="flex justify-between difficulties">
        <div
          v-for="diff of song.difficulties"
          :key="diff.name"
          :style="{ background: difficulties[diff.name] }"
          class="w-100 difficulty p-4"
        >
          <div class="flex justify-between">
            <div>
              {{ diff.name }}: {{ diff.level }} 
            </div>
            <div v-if="diff.name === selected">✅</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 my-4">
        <song-modifiers />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, FunctionalComponent, h, PropType, ref } from 'vue'
import { Song } from '../types'
import { difficulties, colors } from '../style'
import { useMenuState } from '../components/useMenuState'
import { useStore } from '../store'
import { Padding } from '../components/Padding'
import SongModifiers from './SongModifiers.vue'

const Panel: FunctionalComponent = (props, { slots }) => h('div', { class: 'bg-blue-300 my-4 p-4' }, slots)

export default defineComponent({
  props: {
    song: {
      type: Object as PropType<Song>,
      required: true
    }
  },

  components: {
    Panel,
    SongModifiers,
    Padding,
  },

  setup() {
    const menuState = useMenuState()
    const store = useStore()

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (menuState.focused.value !== 'song-wheel') {
        return
      }

      if (['ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }

      if (e.code === 'ArrowLeft') {
        if (store.getState().selectedDifficulty === 'medium') {
          store.setSelectedDifficulty('easy')
        } else if (store.getState().selectedDifficulty === 'hard') {
          store.setSelectedDifficulty('medium')
        }
      }

      if (e.code === 'ArrowRight') {
        if (store.getState().selectedDifficulty === 'easy') {
          store.setSelectedDifficulty('medium')
        } else if (store.getState().selectedDifficulty === 'medium') {
          store.setSelectedDifficulty('hard')
        }
      }
    })

    return {
      selected: computed(() => store.getState().selectedDifficulty),
      difficulties,
    }
  }
})
</script>

<style>
.difficulty {
  margin: 0 0.5rem;
}

.difficulty:first-child, .difficulty:last-child {
  margin: 0;
}
</style>
