import "./Board.scss";
import Draggable from "@/components/utils/draggable/Draggable";
export default function Board({ children }: { children: React.ReactNode }) {
  return (
    <Draggable
      id="board"
      initialPosition={{ x: -window.innerWidth, y: -window.innerHeight }}
    >
      <section className="board">{children}</section>
    </Draggable>
  );
}
