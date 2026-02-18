import type { PropertySynec } from "./PropertySynec.interface";
import type { FunctionSynec } from "./FunctionSynec.interface";
import type { RelationshipSynec } from "./RelationshipSynec.interface";

export interface ClassSynec {
    id: string;
    name: string;
    properties: PropertySynec[];
    functions: FunctionSynec[];
    relationships: RelationshipSynec[];
}