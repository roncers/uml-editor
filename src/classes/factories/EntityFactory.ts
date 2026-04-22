import type { Entity } from "@/types/entity.types"
import type { StringEntity } from "@/types/stringEntity.types"
import { adaptToFormat } from "@/utils/functions/toEntityFactory"

export abstract class EntityFactory {
  static createdEntities: Entity[] = []
  abstract createEntity(position: [number, number]): Entity

  protected addEntity(entity: Entity): void {
    EntityFactory.createdEntities.push(entity)
    console.log('Added entity:', EntityFactory.createdEntities)
  }

  static clearEntities(): void {
    EntityFactory.createdEntities = []
  }

  static setEntities(entities: Entity[]): void {
    EntityFactory.createdEntities = [...entities]
  }

  static toString(): string {
    const entities = EntityFactory.createdEntities.map((entity) => ({
      ...entity,
      type: entity.constructor.name,
    }))
    return JSON.stringify(entities)
  }

  static fromString(data: string): Entity[] {
    const parsedData = JSON.parse(data || "[]") as StringEntity[]
    return adaptToFormat(parsedData)
  }
}
