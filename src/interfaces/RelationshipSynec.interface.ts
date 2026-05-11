import type { RelationshipType } from "@/types/interface.types";
export interface RelationshipSynec {
    id: string;
    // this are classes or interfaces ids
    origin: string;
    destination: string;
    // the implementation would be possible with a interface as origin
    type: RelationshipType;
}