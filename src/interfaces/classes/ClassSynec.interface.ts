import type { PropertySynec } from "@/interfaces/PropertySynec.interface";
import type { FunctionSynec } from "@/interfaces/FunctionSynec.interface";
import type { RelationshipSynec } from "@/interfaces/RelationshipSynec.interface";
import type { Position } from "@/interfaces/Position.interface";
import type { ClassStateType } from "@/types/entity.types";

export interface ClassSynec {
    id: string;
    name: string;
    properties: PropertySynec[];
    functions: FunctionSynec[];
    relationships: RelationshipSynec[];
    state: ClassStateType;
    isToggling: boolean;
    position: Position;
    setName(name: string): void;
    setProperties(properties: PropertySynec[]): void;
    setFunctions(functions: FunctionSynec[]): void;
    setRelationships(relationships: RelationshipSynec[]): void;
    setRelationshipDestiny(entityId: string): void;
    addProperty(property: PropertySynec): void;
    addFunction(function_: FunctionSynec): void;
    addRelationship(relationship: RelationshipSynec): void;
    deleteRelationship(relationshipId: string): void;
    inheritFrom(source: ClassSynec): void;
    pruneEmptyMembers(): void;
    syncImplementors(): void;
    toggleEdition(): void;
    toggleEditionWithLock(lockMs?: number): void;
    toggleSelection(): void;
}