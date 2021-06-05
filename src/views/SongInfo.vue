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
          v-for="(diff, idx) of song.difficulties"
          :key="diff.name"
          :style="{ background: difficulties[diff.name] }"
          class="w-100 difficulty p-4"
        >
          {{ diff.name }}: {{ diff.level }} 
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, FunctionalComponent, h, PropType } from 'vue'
import { Song } from '../types'
import { difficulties } from '../style'

const Panel: FunctionalComponent = (props, { slots }) => h('div', { class: 'bg-blue-300 my-4 p-4' }, slots)

export default defineComponent({
  props: {
    song: {
      type: Object as PropType<Song>,
      required: true
    }
  },

  components: {
    Panel
  },

  setup() {
    return {
      difficulties
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
