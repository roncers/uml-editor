import type { Entity } from "@/types/entity.types"

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
}
