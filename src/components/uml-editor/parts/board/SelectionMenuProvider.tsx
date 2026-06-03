/* eslint-disable react-refresh/only-export-components */
import { createContext, useReducer } from "react";

type MenuPositionContext = {
    position: Position | null;
    setPosition: (position: Position | null) => void;
}

export type Position = { x1: number; y1: number; x2: number; y2: number };

export const SelectionMenuContext = createContext<MenuPositionContext>({
    position: null,
    setPosition: () => {}
});

function positionReducer(state: Position | null, action: { type: 'SET', payload: Position | null }) {
    if (action.type === 'SET') {
        return action.payload;
    }
    return state;
}

export default function SelectionMenuProvider({ children }: { children: React.ReactNode }) {
    const [position, positionDispatch] = useReducer(positionReducer, null);
    const ctxValue = { position, setPosition: (payload: Position | null) => positionDispatch({ type: 'SET', payload }) };
    
    return (
        <SelectionMenuContext.Provider value={ctxValue}>
            {children}
        </SelectionMenuContext.Provider>
    );
}
