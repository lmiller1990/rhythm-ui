<template>
  <div class="relative">
    <select-song />
    <div class="absolute p-5" id="song-info" :style="style">
      <song-info v-if="selectedSong" :song="selectedSong" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from './store'
import { songSelectWidth } from './style'
import SelectSong from './views/SelectSong.vue'
import SongInfo from './views/SongInfo.vue'

export default defineComponent({
  components: {
    SelectSong,
    SongInfo,
  },

  setup() {
    const store = useStore()
    const selectedSong = computed(() => store.selectedSong)

    const style = computed(() => {
      return {
        width: `calc(100% - ${songSelectWidth}px)`,
      }
    })

    return {
      selectedSong,
      style,
    }
  },
})
</script>

<style>
#app {
  height: 100vh;
  overflow: hidden;
}

#song-info {
  left: 400px;
}
</style>
