import type { PropertySynec } from "@/interfaces/PropertySynec.interface";
import type { FunctionSynec } from "@/interfaces/FunctionSynec.interface";
import type { RelationshipSynec } from "@/interfaces/RelationshipSynec.interface";

export interface ClassSynec {
    id: string;
    name: string;
    properties: PropertySynec[];
    functions: FunctionSynec[];
    relationships: RelationshipSynec[];
    setName(name: string): void;
    setProperties(properties: PropertySynec[]): void;
    setFunctions(functions: FunctionSynec[]): void;
    setRelationships(relationships: RelationshipSynec[]): void;
    addProperty(property: PropertySynec): void;
    addFunction(function_: FunctionSynec): void;
    addRelationship(relationship: RelationshipSynec): void;
}