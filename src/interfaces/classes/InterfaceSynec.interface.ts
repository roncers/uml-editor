import type { ClassSynec } from "./ClassSynec.interface";
import type { RelationshipSynec } from "@/interfaces/RelationshipSynec.interface";
import { relationshipType } from "@/types/interface.types";

export interface InterfaceSynec extends Omit<ClassSynec, 'relationships'> {
    relationships: (Omit<RelationshipSynec, 'type'> & { type: Exclude<RelationshipSynec['type'], typeof relationshipType.implementation> })[];
}