import { onBeforeMount, onUnmounted, ref } from 'vue'

type FocusableItem = 'song-wheel' | 'modifiers'

const focused = ref<FocusableItem>('song-wheel')

function changeFocusedItem(event: KeyboardEvent) {
  if (event.code === 'Space') {
    event.preventDefault()

    if (focused.value === 'song-wheel') {
      focused.value = 'modifiers'
      return
    }

    if (focused.value === 'modifiers') {
      focused.value = 'song-wheel'
      return
    }
  }
}

const initialized = false

export function useMenuState() {
  onBeforeMount(() => {
    if (!initialized) {
      window.addEventListener('keyup', changeFocusedItem)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('keyup', changeFocusedItem)
  })

  return {
    focused
  }
}
