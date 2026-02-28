import { createContext } from "react";

export const EntityContext = createContext<{ createEntity: () => void } | undefined>(undefined);