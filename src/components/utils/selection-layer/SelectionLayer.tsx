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
    if (store.entities.length === 0) return
    function onDocumentMouseDown(event: MouseEvent) {
      const entityEl = (event.target as Element)?.closest(".entity")
      if ((event.ctrlKey || event.metaKey) && entityEl) return
      const clickedSelected =
        !!entityEl && store.entities.some((e) => e === entityEl)
      if (!clickedSelected) store.clearSelection()
    }
    window.addEventListener("mousedown", onDocumentMouseDown, true)
    return () =>
      window.removeEventListener("mousedown", onDocumentMouseDown, true)
  }, [store, store.entities.length])

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
    }
  }

  const handleMouseUp = () => {
    if (store.position) {
      const entities = getEntitiesInArea(store.position)
      putEntitiesSelected(entities)
      store.setPosition(null)
      document.removeEventListener("mousemove", updatePos)
    }
  }

  function getEntitiesInArea(position: Position): Element[] {
    const entities = document.querySelectorAll(".entity")

    return Array.from(entities).filter((el) => {
      const rect = el.getBoundingClientRect()

      const isOutside =
        rect.right < position.x1 ||
        rect.left > position.x2 ||
        rect.bottom < position.y1 ||
        rect.top > position.y2

      return !isOutside
    })
  }
  function putEntitiesSelected(entities: Element[]) {
    store.clearSelection()
    entities.forEach((entity) => store.addEntity(entity))
  }

  return (
    <div
      className="selection-layer"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
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
