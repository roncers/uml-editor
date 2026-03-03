import type { ClassSynec } from "@/interfaces/classes/ClassSynec.interface";
import type { InterfaceSynec } from "@/interfaces/classes/InterfaceSynec.interface";

export type Entity = ClassSynec | InterfaceSynec;

export const ClassStateEnum = { default: 'default', selected: 'selected', editing: 'editing' } as const

export type ClassStateType = typeof ClassStateEnum[keyof typeof ClassStateEnum]