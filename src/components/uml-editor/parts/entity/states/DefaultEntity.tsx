import type { UMLClassProps } from "../Entity.types";
import { observer } from "mobx-react-lite";

const DefaultEntity = observer(({ entity }: UMLClassProps) => {
  return (
    <>
      <h3 className="entity__title">{entity.name}</h3>
      <p>{entity.relationships.map((relationship) => relationship.type).join(", ")}</p>
    </>
  );
});

export default DefaultEntity;