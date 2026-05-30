import "./Board.scss"
import Draggable from "@/components/utils/draggable/Draggable"
import { useState, useRef, useEffect } from "react"
import { ZoomContext } from "./ZoomContext"

const MIN_SCALE = 0.2
const MAX_SCALE = 4
const BOARD_POS_KEY = "martin-roncero-board-position"

export default function Board({
  children,
  onZoomChange,
  boardSectionRef,
}: {
  children: React.ReactNode
  onZoomChange?: (zoom: number) => void
  boardSectionRef: React.RefObject<HTMLElement | null>
}) {
  const [scale, setScale] = useState(getSavedScale())

  function getSavedScale() {
    try {
      const raw = localStorage.getItem(BOARD_POS_KEY)
      if (raw) return JSON.parse(raw).scale as number
    } catch {
      void 0
    }
    return 1
  }

  function updateInternalScale(scale: number) {
    const current = getSavedPosition()
    localStorage.setItem(BOARD_POS_KEY, JSON.stringify({ ...current, scale }))
  }

  function getSavedPosition() {
    try {
      const raw = localStorage.getItem(BOARD_POS_KEY)
      if (raw) return JSON.parse(raw) as { x: number; y: number }
    } catch {
      void 0
    }
    return { x: -window.innerWidth, y: -window.innerHeight }
  }

  function updateInternalPos(x: number, y: number) {
    if (boardIsVisible()) {
      localStorage.setItem(BOARD_POS_KEY, JSON.stringify({ x, y, scale }))
    }
  }
  const pinchRef = useRef<number | null>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  function clamp(s: number) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s))
  }

  function boardIsVisible() {
    const rect = boardSectionRef.current!.getBoundingClientRect()
    const wrapperRect = wrapperRef.current!.getBoundingClientRect()
    return !(
      rect.bottom < wrapperRect.top ||
      rect.top > wrapperRect.bottom ||
      rect.right < wrapperRect.left ||
      rect.left > wrapperRect.right
    )
  }

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.1 : 0.9
      setScale((s) => {
        const next = clamp(s * factor)
        onZoomChange?.(next)
        updateInternalScale(next)
        return next
      })
    }
    el.addEventListener("wheel", onWheel, { passive: false })
    return () => el.removeEventListener("wheel", onWheel)
  }, [onZoomChange])

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      pinchRef.current = dist > 10 ? dist : null
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const dist = Math.hypot(dx, dy)
      if (dist < 10) return
      const ratio = Math.min(Math.max(dist / pinchRef.current!, 0.5), 2)
      setScale((s) => {
        const next = clamp(s * ratio)
        onZoomChange?.(next)
        return next
      })
      pinchRef.current = dist
    }
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (e.touches.length < 2) pinchRef.current = null
  }

  return (
    <ZoomContext.Provider value={scale}>
      <div
        ref={wrapperRef}
        className="board-zoom"
        style={{ zoom: scale }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <Draggable
          initialPosition={getSavedPosition()}
          onUpdatePosition={(x, y) => updateInternalPos(x, y)}
        >
          <section className="board" ref={boardSectionRef}>
            {children}
          </section>
        </Draggable>
      </div>
    </ZoomContext.Provider>
  )
}
