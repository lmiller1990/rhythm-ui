<template>
  <div class="bg-gray-800 h-screen flex justify-center items-center" id="game-container">
    <div class="flex justify-center">
      <div 
        v-once 
        id="lanes" 
        class="bg-gray-300 relative grid grid-cols-6 gap-0.5 border-4"
      >
        <div 
          v-for="lane of lanes" 
          class="relative overflow-hidden"
          :class="{
            // 'bg-gray-600': [1,3,4,6].includes(lane),
            // 'bg-gray-500': ![1,3,4,6].includes(lane)
            'bg-gray-600': true
          }"
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
  width: 350px;
  height: calc(100vh - 100px);
}

</style>

<style>
.note {
  width: 100%;
}

@keyframes lane-flash {
  0%   { 
    opacity: 0.8;
  }
  100% { 
    opacity: 1;
  }
}

.lane-flash {
  animation: lane-flash 0.25s;
}

</style>