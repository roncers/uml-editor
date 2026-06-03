/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from "react";
import { makeAutoObservable } from "mobx";

export type Position = { x1: number; y1: number; x2: number; y2: number };

export class SelectionStore {
    position: Position | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setPosition(position: Position | null) {
        this.position = position
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
