import type { Entity } from "@/types/entity.types"
import { EntityFactory } from "@/classes/factories/EntityFactory"
import type { LocalStorageEntity } from "@/types/localStorage.types"
import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"
import { ClassSynec } from "@/classes/classifiers/ClassSynec"
import { PropertySynec } from "@/classes/members/PropertySynec"
import { FunctionSynec } from "@/classes/members/FunctionSynec"
import { RelationshipSynec } from "@/classes/members/RelationshipSynec"

const LOCAL_STORAGE_KEY = "martin-roncero-uml-editor"

export function loadFromLocalStorage(): void {
  // Guard: if entities are already hydrated (caused by React StrictMode)
  if (EntityFactory.createdEntities.length > 0) return

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
