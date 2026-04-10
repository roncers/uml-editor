import { createContext, useContext } from "react";

export const ZoomContext = createContext<number>(1);

export function useZoom() {
  return useContext(ZoomContext);
}
