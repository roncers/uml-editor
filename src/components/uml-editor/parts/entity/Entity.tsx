import "./Entity.scss"
import type { UMLClassProps } from "./Entity.types"

export default function UMLClass({ entity }: UMLClassProps) {
  // const new State
  // const componentData = { state: 'default' }
  function handleRightClick(e: React.MouseEvent) {
    e.preventDefault();
    // TODO: Object to handle the state of the component
    // state.toggle()
  }

  return (
    <div className="entity" onContextMenu={handleRightClick}>
      <h3 className="entity__title">{entity.name}</h3>
    </div>
  )
}
