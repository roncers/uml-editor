import "./UMLEditor.scss";
import Entity from "@/components/uml-editor/parts/entity/Entity";
import { InterfaceFactory } from "@/classes/factories/InterfaceFactory";
import { ClassFactory } from "@/classes/factories/ClassFactory";
import { useState } from "react";

export default function UMLEditor() {
  const availableFactories = [new ClassFactory(), new InterfaceFactory()];
  const selectedFactory = availableFactories[0];
  function createEntity() {
    selectedFactory.createEntity();
    setCreatedEntities([...InterfaceFactory.createdEntities]);
  }
  const [createdEntities, setCreatedEntities] = useState(
    InterfaceFactory.createdEntities,
  );
  return (
    <>
      <div className="uml-editor">
        {createdEntities.map((entity) => (
          <Entity key={entity.id} entity={entity}></Entity>
        ))}
      </div>
      <button onClick={() => createEntity()}>Add Entity</button>
    </>
  );
}
