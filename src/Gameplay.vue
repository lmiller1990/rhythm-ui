<template>
  <a href="/">Back</a>
  <div class="h-screen flex justify-center items-end background" id="game-container">
    <div id="debug" v-once>

      <table>
        <tr>
          <th>Notes:</th>
          <td id="debug-notes" />
        </tr>
      </table> 

    </div>
    <div class="flex justify-center">
      <div 
        v-once 
        id="lanes" 
        class="relative grid grid-cols-6"
      >
        <div 
          v-for="lane of lanes" 
          class="relative is-column-container flex justify-center"
          :key="lane"
          :data-game="`col-${lane}`" 
        >
          <div 
            :class="targetClass" 
            data-game="target-el"
          />
          <!-- notes here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue';
import { Summary } from '@lmiller1990/rhythm-engine'
import { useRouter } from 'vue-router'
import { init, emitter, noteClass, targetClass } from './gameplay'
import { useStore } from './store';

export default defineComponent({
  setup() {
    const lanes = [1, 2, 3, 4, 5, 6]
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
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
      targetClass
    }
  }
})
</script>

<style scoped>
#lanes {
  width: 350px;
  height: calc(90vh);
  grid-gap: 4px;
}

#debug {
  position: absolute;
  top: 25px;
  left: 0;
}
</style>

<style src="./gameplay.css"></style>