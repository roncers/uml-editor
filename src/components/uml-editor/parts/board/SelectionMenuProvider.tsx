/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from "react";
import { makeAutoObservable } from "mobx";
import type { Position as EntityPosition } from "@/classes/members/Position";

export type Position = { x1: number; y1: number; x2: number; y2: number };

export class SelectionStore {
    position: Position | null = null
    selectedIds: string[] = []
    entityPositions = new Map<string, EntityPosition>()
    dialogOpened = false

    constructor() {
        makeAutoObservable(this, { entityPositions: false })
    }

    setPosition(position: Position | null) {
        this.position = position
    }

    setEntities(ids: string[]) {
        this.selectedIds = ids
    }
    
    setDialogOpened(opened: boolean) {
        this.dialogOpened = opened
    }

    addEntity(id: string) {
        if (this.selectedIds.includes(id)) return
        this.selectedIds = [...this.selectedIds, id]
    }

    toggleEntity(id: string) {
        if (this.selectedIds.includes(id)) {
            this.selectedIds = this.selectedIds.filter((e) => e !== id)
        } else {
            this.addEntity(id)
        }
    }

    clearSelection() {
        this.selectedIds = []
    }

    register(id: string, position: EntityPosition) {
        this.entityPositions.set(id, position)
    }

    unregister(id: string) {
        this.selectedIds = this.selectedIds.filter((e) => e !== id)
        this.entityPositions.delete(id)
    }

    isSelected(id: string): boolean {
        return this.selectedIds.includes(id)
    }

    applyDelta(dx: number, dy: number, exceptId: string) {
        if (!dx && !dy) return
        this.selectedIds.forEach((id) => {
            if (id === exceptId) return
            const pos = this.entityPositions.get(id)
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
