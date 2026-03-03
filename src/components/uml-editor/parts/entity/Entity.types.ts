import type { InterfaceSynec } from "@/interfaces/classes/InterfaceSynec.interface"
import type { ClassSynec } from "@/interfaces/classes/ClassSynec.interface"
export interface UMLClassProps {
    entity: InterfaceSynec | ClassSynec
    onToggle?: () => void
}