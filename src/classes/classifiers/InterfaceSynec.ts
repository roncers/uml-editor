import { ClassSynec } from "./ClassSynec"
import type { InterfaceSynec as InterfaceSynecInterface } from "@/interfaces/classes/InterfaceSynec.interface"
import type { RelationshipSynec } from "@/interfaces/RelationshipSynec.interface"
import type { PropertySynec } from "@/interfaces/PropertySynec.interface"
import type { FunctionSynec } from "@/interfaces/FunctionSynec.interface"
import { relationshipType } from "@/types/interface.types"
import { makeObservable, override } from "mobx"

export class InterfaceSynec
  extends ClassSynec
  implements InterfaceSynecInterface
{
  declare relationships: (Omit<RelationshipSynec, "type"> & {
    type: typeof relationshipType.implementation | typeof relationshipType.dependency
  })[]

  constructor(
    name = "",
    positions: number[] = [0, 0],
    properties: PropertySynec[] = [],
    functions: FunctionSynec[] = [],
    relationships: (Omit<RelationshipSynec, "type"> & {
      type: typeof relationshipType.implementation
    })[] = [],
    entityId?: string,
  ) {
    super(name, positions, properties, functions, [], entityId)
    this.relationships = relationships
    makeObservable(this, {
      addRelationship: override, // Use 'override' because it's a specialized version of an entity action
    })
  }

  public addRelationship(
    relationship: Omit<RelationshipSynec, "type"> & {
      type: typeof relationshipType.implementation
    },
  ): void {
    if (relationship.type === relationshipType.implementation) {
      this.relationships.push(relationship)
    } else {
      console.error("Interfaces can only have implementation relationships.")
    }
  }
}
