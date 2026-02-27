import "./Entity.scss"
import type { UMLClassProps } from "./Entity.types"

export default function UMLClass({ entity }: UMLClassProps) {
  return (
    <div className="entity">
      <h3 className="entity__title">{entity.name}</h3>
    </div>
  )
}
