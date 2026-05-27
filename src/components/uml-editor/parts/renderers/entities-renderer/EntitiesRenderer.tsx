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
  return (
    <>
      {entities.map((entity) => (
        <Draggable
          key={entity.id}
          entityPosition={entity.position}
        >
          <Entity key={entity.id} entity={entity} onClick={() => joinRelationship(entity.id)}/>
        </Draggable>
      ))}
    </>
  );
}
