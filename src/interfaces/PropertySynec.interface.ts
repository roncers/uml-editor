// In UML diagrams, the properties show a + or a - when are public or private so each property that an object has only saves it's name, the type and the visibility.
import type { atributeType, atributeVisibility } from "../types/interface.types";
export interface PropertySynec {
    name: string;
    type: atributeType;
    visibility: atributeVisibility;
}