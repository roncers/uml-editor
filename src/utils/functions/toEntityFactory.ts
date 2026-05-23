import type { Entity } from "@/types/entity.types"
import type { StringEntity } from "@/types/stringEntity.types"
import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"
import { ClassSynec } from "@/classes/classifiers/ClassSynec"
import { PropertySynec } from "@/classes/members/PropertySynec"
import { FunctionSynec } from "@/classes/members/FunctionSynec"
import { RelationshipSynec } from "@/classes/members/RelationshipSynec"
const toEntityFactory: Record<string, (data: StringEntity) => Entity> =
  {
    InterfaceSynec: (data) => {
      const position: [number, number] = [data.position.x, data.position.y]

      return new InterfaceSynec(
        data.name,
        position,
        data.properties.map(
          (p) => new PropertySynec(p.name, p.type, p.visibility),
        ),
        data.functions.map((f) => new FunctionSynec(f.name, f.visibility)),
        data.relationships.map(
          (r) => new RelationshipSynec(r.origin, r.destination, r.type, r.id),
        ) as (Omit<RelationshipSynec, "type"> & {
          type: "implementation"
        })[],
        data.id,
      )
    },

    ClassSynec: (data) => {
      const position: [number, number] = [data.position.x, data.position.y]

      return new ClassSynec(
        data.name,
        position,
        data.properties.map(
          (p) => new PropertySynec(p.name, p.type, p.visibility),
        ),
        data.functions.map((f) => new FunctionSynec(f.name, f.visibility)),
        data.relationships.map(
          (r) => new RelationshipSynec(r.origin, r.destination, r.type, r.id),
        ),
        data.id,
      )
    },
  }

export function adaptToFormat(data: StringEntity[]): Entity[] {
  return data
    .map((entity) => {
      const factory = toEntityFactory[entity.type]
      if (!factory) {
        console.error(`Unknown entity type: ${entity.type}`)
        return undefined
      }
      return factory(entity)
    })
    .filter((e): e is Entity => e !== undefined)
}