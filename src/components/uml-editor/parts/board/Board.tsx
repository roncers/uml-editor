import "./Board.scss";
import Draggable from "@/components/utils/draggable/Draggable";
import { useState, useRef, useEffect } from "react";
import { ZoomContext } from "../ZoomContext";

const MIN_SCALE = 0.2;
const MAX_SCALE = 4;

export default function Board({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);
  const pinchRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function clamp(s: number) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));
  }

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.1 : 0.9;
      setScale((s) => clamp(s * factor));
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  function onTouchStart(e: React.TouchEvent) {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchRef.current = Math.hypot(dx, dy);
    }
  }

  function onTouchMove(e: React.TouchEvent) {
    if (e.touches.length === 2 && pinchRef.current !== null) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      setScale((s) => clamp(s * (dist / pinchRef.current!)));
      pinchRef.current = dist;
    }
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (e.touches.length < 2) pinchRef.current = null;
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
        id="board"
        initialPosition={{ x: -window.innerWidth, y: -window.innerHeight }}
      >
        <section className="board">{children}</section>
      </Draggable>
    </div>
    </ZoomContext.Provider>
  );
}
