import type { Entity } from "@/types/entity.types"
import type { StringEntity } from "@/types/stringEntity.types"
import { adaptToFormat } from "@/utils/functions/toEntityFactory"
import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"
import { ClassSynec } from "@/classes/classifiers/ClassSynec"
import { toJS } from "mobx"

export abstract class EntityFactory {
  static createdEntities: Entity[] = []
  abstract createEntity(position: [number, number]): Entity

  protected addEntity(entity: Entity): void {
    EntityFactory.createdEntities.push(entity)
  }

  static clearEntities(): void {
    EntityFactory.createdEntities = []
  }

  static setEntities(entities: Entity[]): void {
    EntityFactory.createdEntities = [...entities]
  }

  static toString(): string {
    const entities = EntityFactory.createdEntities.map((entity) => ({
      ...toJS(entity),
      type:
        entity instanceof InterfaceSynec
          ? "InterfaceSynec"
          : entity instanceof ClassSynec
            ? "ClassSynec"
            : "Unknown",
    }))
    return JSON.stringify(entities, null, 2)
  }

  static fromString(data: string): Entity[] {
    const parsedData = JSON.parse(data || "[]") as StringEntity[]
    return adaptToFormat(parsedData)
  }

  static deleteEntity(id: string): void {
    const entity = EntityFactory.createdEntities.find(
      (entity) => entity.id === id,
    )
    if (entity) {
      EntityFactory.createdEntities.splice(
        EntityFactory.createdEntities.indexOf(entity),
        1,
      )
    }
  }
}
