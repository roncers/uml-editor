import type { ClassSynec as ClassSynecInterface } from "../interfaces/classes/ClassSynec.interface";
import type { PropertySynec } from "../interfaces/PropertySynec.interface";
import type { FunctionSynec } from "../interfaces/FunctionSynec.interface";
import type { RelationshipSynec } from "../interfaces/RelationshipSynec.interface";

export class ClassSynec implements ClassSynecInterface {
    id: string;
    name: string;
    properties: PropertySynec[];
    functions: FunctionSynec[];
    relationships: RelationshipSynec[];

    constructor(name = '', properties = [], functions = [], relationships = []) {
        this.id = self.crypto.randomUUID();
        this.name = name;
        this.properties = properties;
        this.functions = functions;
        this.relationships = relationships;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setProperties(properties: PropertySynec[]): void {
        this.properties = properties;
    }

    public setFunctions(functions: FunctionSynec[]): void {
        this.functions = functions;
    }

    public setRelationships(relationships: RelationshipSynec[]): void {
        this.relationships = relationships;
    }

    public addProperty(property: PropertySynec): void {
        this.properties.push(property);
    }

    public addFunction(function_: FunctionSynec): void {
        this.functions.push(function_);
    }

    public addRelationship(relationship: RelationshipSynec): void {
        this.relationships.push(relationship);
    }
}
