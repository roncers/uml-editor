import { useEffect, useState } from "react"
import i18next from "i18next"

type ScreenContext = "tab-port" | "desktop"

const TAB_PORT_BREAKPOINT = 900
const contextBus = new EventTarget()

let currentContext: ScreenContext =
  window.innerWidth < TAB_PORT_BREAKPOINT ? "tab-port" : "desktop"

const tabPortQuery = window.matchMedia(
  `(max-width: ${TAB_PORT_BREAKPOINT - 1}px)`,
)

const handleContextChange = (e: MediaQueryListEvent | MediaQueryList) => {
  currentContext = e.matches ? "tab-port" : "desktop"
  contextBus.dispatchEvent(new Event("change"))
}

tabPortQuery.addEventListener("change", handleContextChange)
handleContextChange(tabPortQuery)

export function tResponsive(key: string, options?: Record<string, unknown>): string {
  return i18next.t(key, {
    context: currentContext,
    defaultValue: i18next.t(key, options),
    ...options,
  })
}

export function useResponsiveT() {
  const [, forceRender] = useState(0)
  useEffect(() => {
    const handler = () => forceRender((n) => n + 1)
    contextBus.addEventListener("change", handler)
    return () => contextBus.removeEventListener("change", handler)
  }, [])
  return tResponsive
}
