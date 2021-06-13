<template>
  <a href="/">Back</a>
  <div class="bg-gray-800 h-screen flex justify-center items-end" id="game-container">
    <div class="flex justify-center">
      <div 
        v-once 
        id="lanes" 
        class="relative grid grid-cols-6"
      >
        <div 
          v-for="lane of lanes" 
          class="bg-gray-600 target relative note rounded-lg"
          :data-game="`col-${lane}`" 
        >
          <div class="target absolute note rounded-lg border border-2 " />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { Summary } from '@lmiller1990/rhythm-engine'
import { useRouter } from 'vue-router'
import { init, emitter } from './gameplay'
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

    emitter.on('gameplay:done', ({ summary }: { summary: Summary }) => {
      router.push('/summary')
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
  height: calc(90vh);
}

.target {
  height: calc(100vh / 50);
}

</style>

<style>
.note {
  width: 100%;
}

@keyframes lane-flash {
  0%   { 
    opacity: 0.75;
  }
  100% { 
    opacity: 1;
  }
}

.lane-flash {
  animation: lane-flash 0.5s;
}

</style>