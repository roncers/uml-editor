import type { ClassSynec } from "@/interfaces/classes/ClassSynec.interface";
import type { InterfaceSynec } from "@/interfaces/classes/InterfaceSynec.interface";

type Entity = ClassSynec | InterfaceSynec;

export abstract class EntityFactory {
    static createdEntities: Entity[] = [];
    abstract createEntity(): Entity;

    protected addEntity(entity: Entity): void {
        EntityFactory.createdEntities.push(entity);
    }
}