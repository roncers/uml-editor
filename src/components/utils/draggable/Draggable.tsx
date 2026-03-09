import "./Draggable.scss"
import { useState, useRef, useEffect } from "react"
import { useZoom } from "@/components/uml-editor/parts/ZoomContext"
import { useEntityPositions } from "@/components/uml-editor/parts/EntityPositionsContext"

export default function Draggable({
  children,
  initialPosition = { x: 0, y: 0 },
  entityId,
}: {
  children: React.ReactNode
  initialPosition?: { x: number; y: number }
  entityId?: string
}) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const { setEntityPosition } = useEntityPositions()

  useEffect(() => {
    if (entityId) setEntityPosition(entityId, initialPosition)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityId])
  const dragStart = useRef<{
    mouseX: number
    mouseY: number
    posX: number
    posY: number
  } | null>(null)
  const scale = useZoom()
  const scaleRef = useRef(scale)

  function startDrag(clientX: number, clientY: number) {
    scaleRef.current = scale
    setIsDragging(true)
    dragStart.current = {
      mouseX: clientX,
      mouseY: clientY,
      posX: position.x,
      posY: position.y,
    }

    function onMove(x: number, y: number) {
      if (!dragStart.current) return
      const newPos = {
        x:
          dragStart.current.posX +
          (x - dragStart.current.mouseX) / scaleRef.current,
        y:
          dragStart.current.posY +
          (y - dragStart.current.mouseY) / scaleRef.current,
      }
      setPosition(newPos)
      if (entityId) setEntityPosition(entityId, newPos)
    }

    function onMouseMove(ev: MouseEvent) {
      onMove(ev.clientX, ev.clientY)
    }

    function onTouchMove(ev: TouchEvent) {
      if (ev.cancelable) ev.preventDefault()
      onMove(ev.touches[0].clientX, ev.touches[0].clientY)
    }

    function stop() {
      setIsDragging(false)
      dragStart.current = null
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", stop)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("touchend", stop)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", stop)
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    window.addEventListener("touchend", stop)
  }

  function onMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return
    e.preventDefault()
    e.stopPropagation()
    startDrag(e.clientX, e.clientY)
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length > 1) return
    e.stopPropagation()
    startDrag(e.touches[0].clientX, e.touches[0].clientY)
  }

  return (
    <div
      className={`draggable ${isDragging ? " draggable--dragging" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {children}
    </div>
  )
}
