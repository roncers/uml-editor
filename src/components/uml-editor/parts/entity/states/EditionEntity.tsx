import type { UMLClassProps } from "../Entity.types"
import { observer } from "mobx-react-lite"
import EntityInput from "./parts/EntityInput"

const EditionEntity = observer(({ entity, onToggle }: UMLClassProps) => {
  return (
    <>
      <form className="entity-form">
        <EntityInput
          value={entity.name}
          onChange={(value) => entity.setName(value)}
          onConfirm={onToggle}
        />
      </form>
    </>
  )
})
export default EditionEntity
