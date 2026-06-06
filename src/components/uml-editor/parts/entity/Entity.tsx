import "./Entity.scss"
import type { UMLClassProps } from "./Entity.types"
import { ClassStateEnum as EntityStates } from "@/types/entity.types"
import { observer } from "mobx-react-lite"
import { SelectionMenuContext } from "@/components/uml-editor/parts/board/SelectionMenuProvider"
import { useContext } from "react"
import { useMediaQuery } from "@/utils/custom-hooks/useMediaQuery"
import DefaultCard from "./states/default-entity/DefaultEntity"
import EditionCard from "./states/edition-entity/EditionEntity"
import { useUpdatingContext } from "@/components/uml-editor/parts/renderers/relationships-renderer/UpdatingContext"

const UMLClass = observer(function UMLClass({
  entity,
  dialogDestination,
  ...props
}: UMLClassProps) {
  const selectionStore = useContext(SelectionMenuContext)
  const isSelected = selectionStore?.isSelected(entity.id) ?? false

  const updatingStore = useUpdatingContext()
  const isMobile = useMediaQuery("(max-width: 1024px)")

  function toggleEdition(e?: React.MouseEvent) {
    if (entity.isToggling || e?.ctrlKey) return
    updatingStore.update("multiple")
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
      className={`entity entity--${entity.state}${isSelected ? " entity--selected" : ""}`}
      onContextMenu={isMobile ? undefined : toggleEdition}
      onDoubleClick={toggleEdition}
      {...props}
      style={styling}
      id={entity.id}
    >
      <RenderedCard
        entity={entity}
        onToggle={toggleEdition}
        dialogDestination={dialogDestination}
      />
    </div>
  )
})

export default UMLClass
