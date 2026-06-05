/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from "react"
import { makeAutoObservable } from "mobx"

export type UpdateCases = "single" | "multiple" | null
export type UpdatePayload = { x: number; y: number } | null | undefined
export type TriggeredUpdate = {
  type: UpdateCases
  n: number
}

export class UpdatingStore {
  triggeredUpdate: TriggeredUpdate = { type: null, n: 0 }
  private payload: UpdatePayload = null
  private listeners = new Set<
    (type: UpdateCases, payload: UpdatePayload) => void
  >()

  constructor() {
    makeAutoObservable(this, {
      triggeredUpdate: false,
      listeners: false,
    } as unknown as Record<string, boolean>)
  }

  subscribe(callback: (type: UpdateCases, payload: UpdatePayload) => void) {
    this.listeners.add(callback)
    return () => {
      this.listeners.delete(callback)
    }
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.triggeredUpdate.type, this.payload))
  }

  update(type: TriggeredUpdate["type"], payload?: UpdatePayload) {
    this.triggeredUpdate = {
      type,
      n: this.triggeredUpdate.n + 1,
    }
    if (payload) {
      this.payload = payload
    }
    this.notify()
  }
}

export const UpdatingContext = createContext<UpdatingStore | null>(null)

export function useUpdatingContext() {
  const store = useContext(UpdatingContext)
  if (!store)
    throw new Error(
      "useUpdatingContext must be used within SelectionMenuProvider",
    )
  return store
}

export default function UpdatingContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const store = useMemo(() => new UpdatingStore(), [])
  return (
    <UpdatingContext.Provider value={store}>
      {children}
    </UpdatingContext.Provider>
  )
}
