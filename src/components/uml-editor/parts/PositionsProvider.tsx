/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface Position {
  x: number
  y: number
}

interface EntityPositionsContextType {
  positions: Record<string, Position>
  setEntityPosition: (id: string, pos: Position) => void
}

const EntityPositionsContext = createContext<EntityPositionsContextType | undefined>(undefined)

export function PositionsProvider({
  children,
}: {
  children: ReactNode
}) {
  const [positions, setPositions] = useState<Record<string, Position>>({})

  const setEntityPosition = useCallback((id: string, pos: Position) => {
    setPositions((prev) => ({ ...prev, [id]: pos }))
  }, [])

  return (
    <EntityPositionsContext.Provider value={{ positions, setEntityPosition }}>
      {children}
    </EntityPositionsContext.Provider>
  )
}

export function useEntityPositions() {
  const context = useContext(EntityPositionsContext)
  if (context === undefined) {
    throw new Error("useEntityPositions must be used within a PositionsProvider")
  }
  return context
}