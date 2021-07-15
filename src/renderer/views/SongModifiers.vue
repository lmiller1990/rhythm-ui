<template>
  <padding>
    <div class="grid grid-cols-2 gap-2">
      <div>
        <div 
          :class="{ selected: shouldPulse('speed') }"
          class="cell"
        >
          Speed:
        </div>

        <div 
          :class="{ selected: shouldPulse('note-skin') }"
          class="cell"
        >
          Note Skin:
        </div>

        <div 
          :class="{ selected: shouldPulse('direction') }"
          class="cell"
        >
          Direction:
        </div>
      </div>

      <div>
        <div class="cell">{{ speedMod.toFixed(1) }}</div>
        <div class="cell">Coming soon</div>
        <div class="cell">{{ direction }}</div>
      </div>
    </div>
  </padding>

  <padding>
    DEMO
  </padding>
</template>

<script lang="ts">
import { computed, defineComponent, onUnmounted, ref } from 'vue'
import { Padding } from '../components/Padding'
import { useMenuState } from '../components/useMenuState'
import Pulse from '../components/Pulse.vue'

type Mod = 'direction' | 'speed' | 'note-skin' 

export default defineComponent({
  components: {
    Padding,
    Pulse
  },

  setup() {
    const speedMod = ref(1)
    const direction = ref<'up' | 'down'>('up')
    const menuState = useMenuState()
    const selectedMod = ref<Mod>('speed')

    const shouldPulse = (mod: Mod) => {
      if (menuState.focused.value !== 'modifiers') {
        return false
      }

      return selectedMod.value === mod
    }

    const increaseSpeedMod = () => {
      if (speedMod.value < 10) {
        speedMod.value += 0.5
      }
    }

    const decreaseSpeedMod = () => {
      if (speedMod.value > 1) {
        speedMod.value -= 0.5
      }
    }

    const keyListener = (e: KeyboardEvent) => {
      console.log(selectedMod.value)
      if (menuState.focused.value !== 'modifiers') {
        return
      }

      if (['ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }

      if (selectedMod.value === 'speed') {
        if (e.code === 'ArrowLeft') {
          decreaseSpeedMod()
        }

        if (e.code === 'ArrowRight') {
          increaseSpeedMod()
        }
      }
    }

    window.addEventListener('keydown', keyListener)
    onUnmounted(() => {
      window.removeEventListener('keydown', keyListener)
    })

    return {
      speedMod,
      shouldPulse,
      increaseSpeedMod,
      decreaseSpeedMod,
      direction
    }
  }
})
</script>

<style scoped>
@keyframes pulse {
  0%   { 
    border: 2px solid rgba(255, 255, 255, 1);
  }
  50% { 
    border: 2px solid rgba(255, 255, 255, 0.5);
  }
  100% { 
    border: 2px solid rgba(255, 255, 255, 1);
  }
}

.cell {
  padding: 5px;
  border: 2px solid transparent;
}

.selected {
  animation: pulse 1s infinite;
}
</style>
