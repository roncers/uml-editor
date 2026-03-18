import "./Entity.scss"
import type { UMLClassProps } from "./Entity.types"
import { ClassStateEnum as EntityStates } from "@/types/entity.types"
import { observer } from "mobx-react-lite"
import DefaultCard from "./states/default-entity/DefaultEntity"
import EditionCard from "./states/edition-entity/EditionEntity"

const UMLClass = observer(function UMLClass({
  entity,
  ...props
}: UMLClassProps) {
  function toggleEdition(e?: React.MouseEvent) {
    if (entity.isToggling) return
    e?.preventDefault()
    entity.toggleEditionWithLock()
  }
  const RenderedCard =
    entity.state === EntityStates.editing ? EditionCard : DefaultCard
  return (
    <div
      className={`entity entity--${entity.state}`}
      onContextMenu={toggleEdition}
      style={{
        height: entity.isToggling ? "1rem" : undefined,
        minHeight: entity.isToggling ? "1rem" : undefined,
      }}
      id={entity.id}
      {...props}
    >
      <RenderedCard entity={entity} onToggle={toggleEdition} />
    </div>
  )
})

export default UMLClass
