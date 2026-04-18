import type { Position } from "@/interfaces/Position.interface"
import type { PropertySynec } from "@/classes/members/PropertySynec"
import type { FunctionSynec } from "@/classes/members/FunctionSynec"
import type { RelationshipSynec } from "@/classes/members/RelationshipSynec"

export type LocalStorageEntity = {
  id: string
  name: string
  properties: PropertySynec[]
  functions: FunctionSynec[]
  relationships: RelationshipSynec[]
  state: string
  isToggling: boolean
  position: Position
  type: "InterfaceSynec" | "ClassSynec"
}