<template>
  <div class="bg-gray-800 h-screen">
    <div class="flex justify-center">
      <div v-once id="lanes" class="bg-gray-200 relative grid grid-cols-6 gap-1">
        <div 
          v-for="lane of lanes" 
          class="bg-blue-300 relative"
          :data-game="`col-${lane}`" 
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {} from '@lmiller1990/rhythm-engine'
import { defineComponent, onMounted } from 'vue';
import { init } from './gameplay'
import { useStore } from './store';

export default defineComponent({
  setup() {
    const lanes = [1, 2, 3, 4, 5, 6]

    onMounted(() => {
      const store = useStore()

      init({
        song: store.selectedSong!,
        difficulty: 'hard',
      })
    })

    return {
      lanes
    }
  }
})
</script>

<style scoped>
#lanes {
  width: 400px;
  height: 100vh;
}

</style>

<style>
.note {
  width: 100%;
}
</style>