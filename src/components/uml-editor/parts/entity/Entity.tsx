import "./Entity.scss"
import type { UMLClassProps } from "./Entity.types"
import { ClassStateEnum as EntityStates } from "@/types/entity.types"
import { observer } from "mobx-react-lite"
import DefaultCard from "./states/default-entity/DefaultEntity"
import EditionCard from "./states/edition-entity/EditionEntity"

const isMobile = window.matchMedia("(max-width: 1024px)").matches

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
  const styling = {
    height: entity.isToggling ? "2rem" : undefined,
    minHeight: entity.isToggling ? "2rem" : undefined,
    width: entity.isToggling ? "2rem" : undefined,
    minWidth: entity.isToggling ? "2rem" : undefined,
  }
  return (
    <div
      className={`entity entity--${entity.state}`}
      onContextMenu={isMobile ? undefined : toggleEdition}
      onDoubleClick={isMobile ? toggleEdition : undefined}
      {...props}
      style={styling}
      id={entity.id}
    >
      <RenderedCard entity={entity} onToggle={toggleEdition} />
    </div>
  )
})

export default UMLClass
