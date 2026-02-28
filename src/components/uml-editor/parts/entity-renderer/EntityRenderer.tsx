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
        <Draggable id={entity.id}>
          <Entity key={entity.id} entity={entity} />
        </Draggable>
      ))}
    </>
  );
}
