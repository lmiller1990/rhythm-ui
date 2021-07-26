const times: number[] = []
let fps

export function refreshLoop(element: HTMLDivElement) {
  window.requestAnimationFrame(() => {
    const now = performance.now()
    while (times.length > 0 && times[0] <= now - 1000) {
      times.shift()
    }
    times.push(now)
    fps = times.length
    element.textContent = `FPS: ${fps}`
    refreshLoop(element)
  })
}
