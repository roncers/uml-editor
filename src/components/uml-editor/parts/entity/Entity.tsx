import "./Entity.scss"
import type { UMLClassProps } from "./Entity.types"
import { ClassState } from "@/classes/members/ClassState"
import {
  ClassStateEnum as EntityStates,
  type ClassStateType,
} from "@/types/entity.types"
import { useRef, useState } from "react"
import DefaultCard from "./states/DefaultEntity"
import EditionCard from "./states/EditionEntity"

export default function UMLClass({ entity }: UMLClassProps) {
  const entityState = useRef(new ClassState())
  const [state, setState] = useState<ClassStateType>(EntityStates.default)

  function toggleEdition(e?: React.MouseEvent) {
    e?.preventDefault()
    entityState.current.toggleEdition()
    setState(() => entityState.current.getState())
  }
  const RenderedCard =
    state === EntityStates.editing ? EditionCard : DefaultCard
  return (
    <div className={`entity entity--${state}`} onContextMenu={toggleEdition}>
      <RenderedCard entity={entity} onToggle={toggleEdition} />
    </div>
  )
}
