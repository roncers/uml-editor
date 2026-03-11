import type { UMLClassProps } from "../Entity.types";
import { observer } from "mobx-react-lite";

const DefaultEntity = observer(({ entity }: UMLClassProps) => {
  return (
    <>
      <h3 className="entity__title">{entity.name}</h3>
    </>
  );
});

export default DefaultEntity;