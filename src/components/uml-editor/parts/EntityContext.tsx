import { createContext, useContext } from "react";

export interface EntityContextType {
  createEntity: (entityType: "class" | "interface") => void;
  clearEntities: () => void;
  refreshEntities: () => void;
  deleteEntity: (id: string) => void;
}

export const EntityContext = createContext<EntityContextType | undefined>(undefined);

export function useEntityContext() {
  const ctx = useContext(EntityContext);
  if (!ctx) throw new Error("useEntityContext must be used within EntityContext.Provider");
  return ctx;
}