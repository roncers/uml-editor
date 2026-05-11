import type { RelationshipSynec as RelationshipSynecInterface } from "../../interfaces/RelationshipSynec.interface";
import { relationshipType, type RelationshipType } from "@/types/interface.types";
import { makeAutoObservable } from "mobx";

export class RelationshipSynec implements RelationshipSynecInterface {
    id: string;
    origin: string;
    destination: string;
    type: RelationshipType;

    constructor(
        origin = '',
        destination = '',
        type: RelationshipType = relationshipType.association,
        id?: string,
    ) {
        this.id = id || self.crypto.randomUUID();
        this.origin = origin;
        this.destination = destination;
        this.type = type;
        makeAutoObservable(this);
    }

    public setOrigin(origin: string): void {
        this.origin = origin;
    }

    public setDestination(destination: string): void {
        this.destination = destination;
    }

    public setType(type: RelationshipType): void {
        this.type = type;
    }
}
