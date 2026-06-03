import "./SelectionLayer.scss"
import { useSelectionStore } from "@/components/uml-editor/parts/board/SelectionMenuProvider"
import { observer } from "mobx-react-lite"
import { createPortal } from "react-dom"

interface SelectionLayerProps {
  children: React.ReactNode
}

const SelectionLayer = observer(function SelectionLayer({
  children,
}: SelectionLayerProps) {
  const store = useSelectionStore()

  function updateFirstPos(e: MouseEvent) {
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
      store.setPosition(null)
      document.removeEventListener("mousemove", updatePos)
    }
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
              position: "fixed",
              left: Math.min(store.position.x2, store.position.x1),
              top: Math.min(store.position.y2, store.position.y1),
              width: Math.abs(store.position.x2 - store.position.x1),
              height: Math.abs(store.position.y2 - store.position.y1),
              backgroundColor: "var(--color-secondary-contrast)",
              opacity: 0.5,
              zIndex: 5,
            }}
          />,
          document.body,
        )}
      {children}
    </div>
  )
})

export default SelectionLayer
