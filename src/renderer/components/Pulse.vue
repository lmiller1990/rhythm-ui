<template>
  <div :class="{ pulse: pulse }">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    pulse: {
      type: Boolean,
      default: false
    }
  } 
})
</script>


<style scoped>
@keyframes pulse {
  0%   { 
    opacity: 0.2;
  }
  50% { 
    opacity: 0.5;
  }
  100% { 
    opacity: 0.2;
  }
}

.pulse {
  animation: pulse 2s infinite;
}
</style>