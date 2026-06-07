const TRANSITION_DURATION_MS = 600

export function trackUpdates(onMove: (x: number, y: number) => void) {

  let rafId: number | null = null

  const updatePosition = (x: number, y: number) => {
    onMove(x, y)
  }

  const singleUpdateHandler = (x: number, y: number) => {
    updatePosition(x, y)
  }

  const multipleUpdateHandler = () => {
    if (rafId !== null) cancelAnimationFrame(rafId)
    const start = performance.now()
    const tick = (now: number) => {
      updatePosition(0, 0)
      if (now - start < TRANSITION_DURATION_MS) {
        rafId = requestAnimationFrame(tick)
      } else {
        rafId = null
      }
    }
    rafId = requestAnimationFrame(tick)
  }


  multipleUpdateHandler()

  function onResize() {
    updatePosition(0, 0)
  }
  window.addEventListener("resize", onResize)

  return {
    cleanup: () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }
      window.removeEventListener("resize", onResize)
    },
    singleUpdateHandler,
    multipleUpdateHandler,
  }
}

export function getClosestBorderPoint(
  rect: DOMRect,
  { cursorX, cursorY }: { cursorX: number; cursorY: number },
) {
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  const dx = cursorX - cx
  const dy = cursorY - cy
  const scaleX = dx !== 0 ? rect.width / 2 / Math.abs(dx) : Infinity
  const scaleY = dy !== 0 ? rect.height / 2 / Math.abs(dy) : Infinity
  const scale = Math.min(scaleX, scaleY)
  return { x: cx + dx * scale, y: cy + dy * scale }
}
