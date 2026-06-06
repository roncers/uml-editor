/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from "react";
import { makeAutoObservable } from "mobx";
import type { Position as EntityPosition } from "@/classes/members/Position";

export type Position = { x1: number; y1: number; x2: number; y2: number };

export class SelectionStore {
    position: Position | null = null
    entities: Element[] = []
    entityPositions = new Map<string, EntityPosition>()

    constructor() {
        makeAutoObservable(this, { entityPositions: false })
    }

    setPosition(position: Position | null) {
        this.position = position
    }

    setEntities(entities: Element[]) {
        this.entities = entities
    }

    addEntity(el: Element) {
        if (this.entities.includes(el)) return
        this.entities = [...this.entities, el]
    }

    toggleEntity(el: Element) {
        if (this.entities.includes(el)) {
            this.entities = this.entities.filter((e) => e !== el)
        } else {
            this.addEntity(el)
        }
    }

    clearSelection() {
        this.entities = []
    }

    register(id: string, position: EntityPosition) {
        this.entityPositions.set(id, position)
    }

    unregister(id: string) {
        this.entities = this.entities.filter((el) => el.id !== id)
        this.entityPositions.delete(id)
    }

    isSelected(id: string): boolean {
        return this.entities.some((el) => el.id === id)
    }

    applyDelta(dx: number, dy: number, exceptId: string) {
        if (!dx && !dy) return
        this.entities.forEach((el) => {
            if (el.id === exceptId) return
            const pos = this.entityPositions.get(el.id)
            if (pos) pos.setPosition(pos.x + dx, pos.y + dy)
        })
    }
}

export const SelectionMenuContext = createContext<SelectionStore | null>(null);

export function useSelectionStore() {
    const store = useContext(SelectionMenuContext)
    if (!store) throw new Error("useSelectionStore must be used within SelectionMenuProvider")
    return store
}

export default function SelectionMenuProvider({ children }: { children: React.ReactNode }) {
    const store = useMemo(() => new SelectionStore(), [])

    return (
        <SelectionMenuContext.Provider value={store}>
            {children}
        </SelectionMenuContext.Provider>
    );
}
