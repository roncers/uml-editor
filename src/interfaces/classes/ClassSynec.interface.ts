import type { PropertySynec } from "@/interfaces/PropertySynec.interface";
import type { FunctionSynec } from "@/interfaces/FunctionSynec.interface";
import type { RelationshipSynec } from "@/interfaces/RelationshipSynec.interface";

export interface ClassSynec {
    id: string;
    name: string;
    properties: PropertySynec[];
    functions: FunctionSynec[];
    relationships: RelationshipSynec[];
}