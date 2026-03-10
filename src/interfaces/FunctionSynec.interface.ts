import type { AttributeVisibility } from "../types/interface.types";

export interface FunctionSynec {
    name: string;
    visibility: AttributeVisibility;
    setName(name: string): void;
    setVisibility(visibility: AttributeVisibility): void;
}