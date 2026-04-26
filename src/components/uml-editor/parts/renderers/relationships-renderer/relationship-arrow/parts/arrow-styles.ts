import { relationshipType, type RelationshipType } from "@/types/interface.types"

export interface ArrowStyleConfig {
  strokeDasharray?: string
  markerEnd: string
  markerStart?: string
}

export const arrowStyles: Record<RelationshipType, ArrowStyleConfig> = {
  [relationshipType.association]: {
    markerEnd: "arrow-open",
  },
  [relationshipType.dependency]: {
    strokeDasharray: "8,4",
    markerEnd: "arrow-open",
  },
  [relationshipType.aggregation]: {
    markerEnd: "arrow-open",
    markerStart: "diamond-hollow",
  },
  [relationshipType.composition]: {
    markerEnd: "arrow-open",
    markerStart: "diamond-filled",
  },
  [relationshipType.inheritance]: {
    markerEnd: "triangle-hollow",
  },
  [relationshipType.implementation]: {
    strokeDasharray: "8,4",
    markerEnd: "triangle-hollow",
  },
}
