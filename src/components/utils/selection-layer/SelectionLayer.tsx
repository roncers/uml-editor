import "./SelectionLayer.scss"
import {
  useSelectionStore,
  type Position,
} from "@/components/uml-editor/parts/board/SelectionMenuProvider"
import { observer } from "mobx-react-lite"
import { useEffect } from "react"
import { createPortal } from "react-dom"

interface SelectionLayerProps {
  children: React.ReactNode
}

const SelectionLayer = observer(function SelectionLayer({
  children,
}: SelectionLayerProps) {
  const store = useSelectionStore()

  useEffect(() => {
    if (store.selectedIds.length === 0) return
    function onDocumentMouseDown(event: MouseEvent) {
      const entityEl = (event.target as Element)?.closest(".entity")
      if (((event.ctrlKey || event.metaKey) && entityEl) || store.dialogOpened) return
      const clickedSelected =
        !!entityEl && store.isSelected(entityEl.id)
      if (!clickedSelected) store.clearSelection()
    }
    window.addEventListener("mousedown", onDocumentMouseDown, true)
    return () =>
      window.removeEventListener("mousedown", onDocumentMouseDown, true)
  }, [store, store.selectedIds.length])

  function updateFirstPos(e: MouseEvent) {
    e.preventDefault()
    store.setPosition({ x1: e.pageX, y1: e.pageY, x2: e.pageX, y2: e.pageY })
  }

  function updatePos(e: MouseEvent) {
    if (!store.position) return
    store.setPosition({ ...store.position, x2: e.pageX, y2: e.pageY })
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.stopPropagation()
      updateFirstPos(e as unknown as MouseEvent)
      document.addEventListener("mousemove", updatePos)
      document.addEventListener("mouseup", handleMouseUp)
    }
  }

  const handleMouseUp = () => {
    if (store.position) {
      const entities = getEntitiesInArea(store.position)
      putEntitiesSelected(entities)
      store.setPosition(null)
      document.removeEventListener("mousemove", updatePos)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }

  function getEntitiesInArea(position: Position): Element[] {
    const entities = document.querySelectorAll(".entity")
    const minX = Math.min(position.x1, position.x2)
    const maxX = Math.max(position.x1, position.x2)
    const minY = Math.min(position.y1, position.y2)
    const maxY = Math.max(position.y1, position.y2)

    return Array.from(entities).filter((el) => {
      const rect = el.getBoundingClientRect()

      const isOutside =
        rect.right < minX ||
        rect.left > maxX ||
        rect.bottom < minY ||
        rect.top > maxY

      return !isOutside
    })
  }
  function putEntitiesSelected(entities: Element[]) {
    store.clearSelection()
    entities.forEach((entity) => store.addEntity(entity.id))
  }

  return (
    <div
      className="selection-layer"
      onMouseDown={handleMouseDown}
    >
      {store.position?.x1 &&
        store.position?.y1 &&
        createPortal(
          <div
            className="selection-layer__overlay"
            style={{
              left: Math.min(store.position.x2, store.position.x1),
              top: Math.min(store.position.y2, store.position.y1),
              width: Math.abs(store.position.x2 - store.position.x1),
              height: Math.abs(store.position.y2 - store.position.y1),
            }}
          />,
          document.body,
        )}
      {children}
    </div>
  )
})

export default SelectionLayer
