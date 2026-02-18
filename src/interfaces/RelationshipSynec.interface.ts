import type { relationshipType } from "@/types/interface.types";
export interface RelationshipSynec {
    // this are classes or interfaces ids
    origin: string;
    destination: string;
    // the implementation would be possible with a interface as origin
    type: relationshipType;
}