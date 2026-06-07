import "./Draggable.scss"
import { useState, useRef, useEffect } from "react"
import { useZoom } from "@/components/uml-editor/parts/board/ZoomContext"
import { useSelectionStore } from "@/components/uml-editor/parts/board/SelectionMenuProvider"
import { observer } from "mobx-react-lite"
import type { Position } from "@/classes/members/Position"
import SelectionLayer from "@/components/utils/selection-layer/SelectionLayer"
import { useUpdatingContext } from "@/components/uml-editor/parts/renderers/relationships-renderer/UpdatingContext"

const Draggable = observer(function Draggable({
  children,
  id,
  initialPosition = { x: 0, y: 0 },
  entityPosition,
  isBoard = false,
  onUpdatePosition = () => {},
}: {
  children: React.ReactNode
  id?: string
  initialPosition?: { x: number; y: number }
  entityPosition?: Position
  isBoard?: boolean
  onUpdatePosition?: (x: number, y: number) => void
}) {
  const selectionStore = useSelectionStore()
  const updatingStore = useUpdatingContext()

  useEffect(() => {
    if (!id || !entityPosition) return
    selectionStore.register(id, entityPosition)
    return () => selectionStore.unregister(id)
  }, [id, entityPosition, selectionStore])
  const [localPos, setLocalPos] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)

  const posX = entityPosition ? entityPosition.x : localPos.x
  const posY = entityPosition ? entityPosition.y : localPos.y

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
      posX: posX,
      posY: posY,
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
      const prevX = entityPosition ? entityPosition.x : localPos.x
      const prevY = entityPosition ? entityPosition.y : localPos.y
      if (entityPosition) {
        entityPosition.setPosition(newPos.x, newPos.y)
      } else {
        setLocalPos(newPos)
      }
      if (id && selectionStore.isSelected(id)) {
        selectionStore.applyDelta(newPos.x - prevX, newPos.y - prevY, id)
      }
      onUpdatePosition(newPos.x, newPos.y)
    }

    function onMouseMove(ev: MouseEvent) {
      onMove(ev.clientX, ev.clientY)
      updatingStore.update("single", { x: ev.clientX, y: ev.clientY })
    }

    function onTouchMove(ev: TouchEvent) {
      const dx = ev.touches[0].clientX - dragStart.current!.mouseX
      const dy = ev.touches[0].clientY - dragStart.current!.mouseY
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        if (ev.cancelable) ev.preventDefault()
        onMove(ev.touches[0].clientX, ev.touches[0].clientY)
      }
      updatingStore.update("single", { x: ev.touches[0].clientX, y: ev.touches[0].clientY })
    }

    function stop(e: MouseEvent | TouchEvent) {
      const clientX = "clientX" in e ? e.clientX : (e as TouchEvent).changedTouches?.[0]?.clientX ?? 0
      const clientY = "clientY" in e ? e.clientY : (e as TouchEvent).changedTouches?.[0]?.clientY ?? 0
      updatingStore.update("single", { x: clientX, y: clientY })
      requestAnimationFrame(() => {
        updatingStore.update("single", { x: clientX, y: clientY })
      })
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
    if ((e.ctrlKey || e.metaKey) && id) {
      const entityEl = (e.currentTarget as HTMLElement).querySelector(".entity")
      if (entityEl) {
        e.preventDefault()
        e.stopPropagation()
        selectionStore.toggleEntity(entityEl.id)
        return
      }
    }
    e.preventDefault()
    e.stopPropagation()
    startDrag(e.clientX, e.clientY)
    updatingStore.update("single", { x: e.clientX, y: e.clientY })
  }

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length > 1) return
    e.stopPropagation()
    startDrag(e.touches[0].clientX, e.touches[0].clientY)
    updatingStore.update("single", { x: e.touches[0].clientX, y: e.touches[0].clientY })
  }

  return (
    <div
      className={`draggable ${isDragging ? " draggable--dragging" : ""}`}
      style={{
        transform: `translate(${posX}px, ${posY}px)`,
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {isBoard ? <SelectionLayer>{children}</SelectionLayer> : children}
    </div>
  )
})

export default Draggable
