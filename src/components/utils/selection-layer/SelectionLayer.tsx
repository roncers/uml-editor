import "./SelectionLayer.scss"
import { SelectionMenuContext } from "@/components/uml-editor/parts/board/SelectionMenuProvider"
import { use } from "react"

interface SelectionLayerProps {
  children: React.ReactNode
}

export default function SelectionLayer({ children }: SelectionLayerProps) {
  const { position, setPosition } = use(SelectionMenuContext)

  function updateFirstPos(e: MouseEvent) {
    console.log("first", e)
    setPosition({ x1: e.pageX, y1: e.pageY, x2: e.pageX, y2: e.pageY })
    console.log("firstsetting", position)
  }

  function updatePos(e: MouseEvent) {
    setPosition({ ...position!, x2: e.pageX, y2: e.pageY })
    console.log("updatesetting", position)
  }
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.stopPropagation()
      updateFirstPos(e as unknown as MouseEvent)
      document.addEventListener("mousemove", updatePos)
    }
  }

  const handleMouseUp = () => {
    if (position) {
      setPosition(null)
      document.removeEventListener("mousemove", updatePos)
    }
  }

  return (
    <div
      className="selection-layer"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {position?.x1 && position?.y1 && (
        <div
          className="selection-layer__overlay"
          style={{
            backgroundColor: "var(--color-secondary-contrast",
            zIndex: 10000,
            position: "fixed",
            left: Math.min(position.x2, position.x1),
            top: Math.min(position.y2, position.y1),
            width: Math.abs(position.x2 - position.x1),
            height: Math.abs(position.y2 - position.y1),
          }}
        />
      )}
      {children}
    </div>
  )
}
