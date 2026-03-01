import "./Draggable.scss";
import { useState, useRef } from "react";

export default function Draggable({
  id,
  children,
  initialPosition = { x: 0, y: 0 },
}: {
  id: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
}) {
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ mouseX: number; mouseY: number; posX: number; posY: number } | null>(null);

  function startDrag(clientX: number, clientY: number) {
    setIsDragging(true);
    dragStart.current = {
      mouseX: clientX,
      mouseY: clientY,
      posX: position.x,
      posY: position.y,
    };

    function onMove(x: number, y: number) {
      if (!dragStart.current) return;
      setPosition({
        x: dragStart.current.posX + (x - dragStart.current.mouseX),
        y: dragStart.current.posY + (y - dragStart.current.mouseY),
      });
    }

    function onMouseMove(ev: MouseEvent) {
      onMove(ev.clientX, ev.clientY);
    }

    function onTouchMove(ev: TouchEvent) {
      if (ev.cancelable) ev.preventDefault();
      onMove(ev.touches[0].clientX, ev.touches[0].clientY);
    }

    function stop() {
      setIsDragging(false);
      dragStart.current = null;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stop);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", stop);
  }

  function onMouseDown(e: React.MouseEvent) {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    startDrag(e.clientX, e.clientY);
  }

  function onTouchStart(e: React.TouchEvent) {
    e.stopPropagation();
    startDrag(e.touches[0].clientX, e.touches[0].clientY);
  }

  return (
    <div
      id={id}
      className={`draggable ${isDragging ? " draggable--dragging" : ""}`}
      style={{
        left: position.x,
        top: position.y,
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      {children}
    </div>
  );
}
