<template>
  <div
    class="h-screen flex justify-center items-end background"
    id="game-container"
  >
    <div id="debug" v-once>
      <a href="/">Back</a>
      <table>
        <tr>
          <th>Notes:</th>
          <td id="debug-notes" />
        </tr>
      </table>
      <div id="fps"></div>
    </div>
    <div class="flex justify-center">
      <div v-once id="lanes" class="relative grid grid-cols-6">
        <div
          v-for="lane of lanes"
          class="relative is-column-container flex justify-center"
          :key="lane"
          :data-game="`col-${lane}`"
        >
          <div :class="targetClass" data-game="target-el" />
          <!-- notes here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { Summary } from '@lmiller1990/rhythm-engine'
import { useRouter } from 'vue-router'
import { init, emitter, noteClass, targetClass } from './gameplay'
import { refreshLoop } from './debugging'
import { useStore } from './store'

export default defineComponent({
  props: {
    initGameplay: {
      type: Boolean,
      default: true,
    },
  },

  setup(props) {
    const lanes = [1, 2, 3, 4, 5, 6]
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
      refreshLoop(document.querySelector('#fps'))

      if (!props.initGameplay) {
        return
      }

      init({
        song: store.selectedSong!,
        difficulty: 'hard',
      })
    })

    onBeforeUnmount(() => {
      console.log('Unmount!')
    })

    emitter.on('gameplay:done', ({ summary }: { summary: Summary }) => {
      store.setSummary(summary)
      router.push('/summary')
    })

    return {
      lanes,
      noteClass,
      targetClass,
    }
  },
})
</script>

<style src="./gameplay.css"></style>
