import type { Entity } from "@/types/entity.types"
import { EntityFactory } from "@/classes/factories/EntityFactory"
import type { LocalStorageEntity } from "@/types/localStorage.types"
import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"
import { ClassSynec } from "@/classes/classifiers/ClassSynec"
import { PropertySynec } from "@/classes/members/PropertySynec"
import { FunctionSynec } from "@/classes/members/FunctionSynec"
import { RelationshipSynec } from "@/classes/members/RelationshipSynec"

const LOCAL_STORAGE_KEY = "martin-roncero-uml-editor"

// TODO: fix first time used is like they restore the state of the previous elements when adding new element.

export function loadFromLocalStorage(): void {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY)
  const parsedData = JSON.parse(data || "[]") as LocalStorageEntity[]

  if (data) {
    const convertedData = adaptToFormat(parsedData)
    EntityFactory.setEntities(convertedData)
  }
}

type EntityWithType = Entity & {
  type?: string
}

export function storeToLocalStorage(data: EntityWithType[]): void {
  data.forEach((entity) => {
    entity.type = entity.constructor.name
  })
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}

const localEntityFactory: Record<string, (data: LocalStorageEntity) => Entity> =
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
          (r) => new RelationshipSynec(r.origin, r.destination, r.type),
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
          (r) => new RelationshipSynec(r.origin, r.destination, r.type),
        ),
        data.id,
      )
    },
  }

function adaptToFormat(data: LocalStorageEntity[]): Entity[] {
  return data.map((entity) => {
    const factory = localEntityFactory[entity.type]
    if (!factory) {
      console.error(`Unknown entity type: ${entity.type}`)
      return undefined as unknown as Entity
    }
    return factory(entity)
  })
}

// function adaptToFormat(data: LocalStorageEntity[]): Entity[] {
//   return data.map((entity) => {
//     if (entity.type === "InterfaceSynec") {
//       return new InterfaceSynec(
//         entity.name,
//         [entity.position.x, entity.position.y],
//         entity.properties.map(
//           (property) =>
//             new PropertySynec(
//               property.name,
//               property.type,
//               property.visibility,
//             ),
//         ),
//         entity.functions.map(
//           (functionSynec) =>
//             new FunctionSynec(functionSynec.name, functionSynec.visibility),
//         ),
//         entity.relationships.map(
//           (relationship) =>
//             new RelationshipSynec(
//               relationship.origin,
//               relationship.destination,
//               relationship.type,
//             ),
//         )
//         entity.id,
//       )
//     }
//     if (entity.type === "ClassSynec") {
//       return new ClassSynec(
//         entity.name,
//         [entity.position.x, entity.position.y],
//         entity.properties.map(
//           (property) =>
//             new PropertySynec(
//               property.name,
//               property.type,
//               property.visibility,
//             ),
//         ),
//         entity.functions.map(
//           (functionSynec) =>
//             new FunctionSynec(functionSynec.name, functionSynec.visibility),
//         ),
//         entity.relationships.map(
//           (relationship) =>
//             new RelationshipSynec(
//               relationship.origin,
//               relationship.destination,
//               relationship.type,
//             ),
//         ),
//         entity.id,
//       )
//     }
//     console.error("This error is pretty weird, you are cooked, hohoho")
//     return undefined as unknown as Entity
//   })
// }
