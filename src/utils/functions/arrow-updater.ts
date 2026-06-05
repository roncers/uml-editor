export function trackUpdates(onMove: (x: number, y: number) => void) {

  const activeTimeouts = new Set<ReturnType<typeof setTimeout>>()

  const updatePosition = (x: number, y: number) => {
    onMove(x, y)
  }

  const singleUpdateHandler = (x: number, y: number) => {
    updatePosition(x, y)
  }

  const multipleUpdateHandler = () => {
    const timedRenders = Array.from({ length: 10 }, (_, i) => (i + 1) * 50)
    timedRenders.forEach((delay) => {
      const timeoutId = setTimeout(() => {
        updatePosition(0, 0)
        activeTimeouts.delete(timeoutId)
      }, delay)
      activeTimeouts.add(timeoutId)
    })
  }


  multipleUpdateHandler()

  return {
    cleanup: () => {
      activeTimeouts.forEach((timeoutId) => clearTimeout(timeoutId))
      activeTimeouts.clear()
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
