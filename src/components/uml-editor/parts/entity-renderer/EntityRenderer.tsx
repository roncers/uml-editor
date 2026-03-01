import Entity from "@/components/uml-editor/parts/entity/Entity";
import type { Entity as EntityType } from "@/types/entity.types";
import Draggable from "@/components/utils/draggable/Draggable";
export default function EntityRenderer({
  entities,
}: {
  entities: EntityType[];
}) {
  return (
    <>
      {entities.map((entity) => (
        <Draggable
          id={entity.id}
          key={entity.id}
          initialPosition={{ x: window.innerWidth + 10, y: window.innerHeight + 10 }}
        >
          <Entity key={entity.id} entity={entity} />
        </Draggable>
      ))}
    </>
  );
}
