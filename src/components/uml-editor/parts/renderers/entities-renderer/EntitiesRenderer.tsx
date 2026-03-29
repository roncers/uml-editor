import Entity from "@/components/uml-editor/parts/entity/Entity";
import type { Entity as EntityType } from "@/types/entity.types";
import Draggable from "@/components/utils/draggable/Draggable";

export default function EntitiesRenderer({
  entities,
  joinRelationship,
}: {
  entities: EntityType[];
  joinRelationship: (entityId: string) => void
}) {
  // TODO: improve the initial position calculation
  return (
    <>
      {entities.map((entity, index) => (
        <Draggable
          key={entity.id}
          entityId={entity.id}
          initialPosition={{ x: window.innerWidth + index * 150, y: window.innerHeight}}
        >
          <Entity key={entity.id} entity={entity} onClick={() => {joinRelationship(entity.id)}}/>
        </Draggable>
      ))}
    </>
  );
}
