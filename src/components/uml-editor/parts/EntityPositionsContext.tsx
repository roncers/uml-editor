import { createContext, useContext, useState, useCallback } from "react"

interface Position {
  x: number
  y: number
}

interface EntityPositionsContextType {
  positions: Record<string, Position>
  setEntityPosition: (id: string, pos: Position) => void
}

const EntityPositionsContext = createContext<EntityPositionsContextType>({
  positions: {},
  setEntityPosition: () => {},
})

export function EntityPositionsProvider({
  children,
}: {
  children: React.ReactNode
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
  return useContext(EntityPositionsContext)
}
