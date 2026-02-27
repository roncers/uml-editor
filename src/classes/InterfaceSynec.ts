import { ClassSynec } from "./ClassSynec";
import type { InterfaceSynec as InterfaceSynecInterface } from "../interfaces/InterfaceSynec.interface";
import type { RelationshipSynec } from "../interfaces/RelationshipSynec.interface";
import { relationshipType } from "../types/interface.types";

export class InterfaceSynec extends ClassSynec implements InterfaceSynecInterface {
    constructor(name = '', properties = [], functions = [], relationships = []) {
        super(name, properties, functions, relationships);
    }

    public addRelationship(relationship: RelationshipSynec): void {
        if (relationship.type === relationshipType.implementation) {
            this.relationships.push(relationship);
        } else {
            console.error('Interfaces can only have implementation relationships.');
        }
    }
}
