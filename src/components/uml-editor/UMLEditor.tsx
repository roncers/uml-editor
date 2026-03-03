import "./UMLEditor.scss";
import AddButton from "./parts/buttons/add-button/AddButton";
import EntityRenderer from "./parts/entity-renderer/EntityRenderer";
import Board from "./parts/board/Board";

import { InterfaceFactory } from "@/classes/factories/InterfaceFactory";
import { ClassFactory } from "@/classes/factories/ClassFactory";
import { useState } from "react";
import { EntityContext } from "./parts/EntityContext";

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
    <EntityContext.Provider value={{ createEntity }}>
      <div className="uml-editor">
        <Board>
          <EntityRenderer entities={createdEntities} />
        </Board>
        <AddButton />
      </div>
    </EntityContext.Provider>
  );
}
