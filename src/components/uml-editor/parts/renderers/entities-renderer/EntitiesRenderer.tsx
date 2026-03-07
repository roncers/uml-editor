import Entity from "@/components/uml-editor/parts/entity/Entity";
import type { Entity as EntityType } from "@/types/entity.types";
import Draggable from "@/components/utils/draggable/Draggable";

export default function EntitiesRenderer({
  entities,
}: {
  entities: EntityType[];
}) {
  return (
    <>
      {entities.map((entity, index) => (
        <Draggable
          id={entity.id}
          key={entity.id}
          initialPosition={{ x: window.innerWidth + index * 100, y: window.innerHeight}}
        >
          <Entity key={entity.id} entity={entity} />
        </Draggable>
      ))}
    </>
  );
}
