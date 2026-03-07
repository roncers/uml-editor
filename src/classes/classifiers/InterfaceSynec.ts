import { ClassSynec } from "./ClassSynec";
import type { InterfaceSynec as InterfaceSynecInterface } from "@/interfaces/classes/InterfaceSynec.interface";
import type { RelationshipSynec } from "@/interfaces/RelationshipSynec.interface";
import { relationshipType } from "@/types/interface.types";

export class InterfaceSynec extends ClassSynec implements InterfaceSynecInterface {
    relationships: (Omit<RelationshipSynec, 'type'> & { type: typeof relationshipType.implementation })[];

    constructor(name = '', properties = [], functions = [], relationships: (Omit<RelationshipSynec, 'type'> & { type: typeof relationshipType.implementation })[] = []) {
        super(name, properties, functions);
        this.relationships = relationships;
    }

    public addRelationship(relationship: Omit<RelationshipSynec, 'type'> & { type: typeof relationshipType.implementation }): void {
        if (relationship.type === relationshipType.implementation) {
            this.relationships.push(relationship);
        } else {
            console.error('Interfaces can only have implementation relationships.');
        }
    }
}
