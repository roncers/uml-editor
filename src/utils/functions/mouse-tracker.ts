export function trackMouse(onMove: (x: number, y: number) => void) {
  let lastX = 0
  let lastY = 0

  const updatePosition = (x: number, y: number) => {
    lastX = x
    lastY = y
    onMove(lastX, lastY)
  }

  const moveHandler = (event: MouseEvent) => {
    updatePosition(event.clientX, event.clientY)
  }

  const touchHandler = (event: TouchEvent) => {
    const touch = event.touches[0]
    if (!touch) return
    updatePosition(touch.clientX, touch.clientY)
  }

  const scrollHandler = () => {
    onMove(lastX, lastY)
  }

  const moveHandled = ["mousemove", "contextmenu", "click", "dblclick"] as const
  const touchHandled = ["touchstart", "touchmove"] as const

  moveHandled.forEach((event) => {
    document.addEventListener(event, moveHandler)
  })
  touchHandled.forEach((event) => {
    document.addEventListener(event, touchHandler)
  })
  // document.addEventListener("wheel", scrollHandler, true)
  const timedRenders = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500]
  timedRenders.forEach((delay) => {
    setTimeout(scrollHandler, delay)
  })

  return () => {
    moveHandled.forEach((event) => {
      document.removeEventListener(event, moveHandler)
    })
    touchHandled.forEach((event) => {
      document.removeEventListener(event, touchHandler)
    })
    // document.removeEventListener("wheel", scrollHandler, true)
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
