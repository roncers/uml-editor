import "./Draggable.scss";
import { useDraggable } from "@dnd-kit/react";

export default function Draggable({
  id,
  children,
  ...props
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { ref } = useDraggable({ id });
  return (
    <div ref={ref} {...props} className="draggable">
      {children}
    </div>
  );
}
