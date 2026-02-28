import type { Entity } from "@/types/entity.types";

export abstract class EntityFactory {
    static createdEntities: Entity[] = [];
    abstract createEntity(): Entity;

    protected addEntity(entity: Entity): void {
        EntityFactory.createdEntities.push(entity);
    }
}