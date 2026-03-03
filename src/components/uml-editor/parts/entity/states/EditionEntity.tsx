import "../Entity.scss";
import type { UMLClassProps } from "../Entity.types";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function EditionEntity({ entity, onToggle }: UMLClassProps) {
  const [localEntity, setLocalEntity] = useState(entity);
  const { t } = useTranslation();
  function handleNameChange(newName: string) {
    console.log("pedro sanchez");
    entity.setName(newName);
    setLocalEntity({ ...entity });
  }
  return (
    <>
      <form className="entity-form">
        <div className="entity__input">
          <label htmlFor="name" className="entity__input-label">{t("name")}</label>
          <input
            id="name"
            className="entity__input-default"
            autoComplete="off"
            value={localEntity.name}
            onChange={(e) => handleNameChange(e.target.value)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.key === "Enter" && onToggle?.()}
          />
        </div>
      </form>
    </>
  );
}
