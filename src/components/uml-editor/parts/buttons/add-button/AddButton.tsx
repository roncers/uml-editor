import "./AddButton.scss";
import { useContext } from "react";
import { EntityContext } from "../../EntityContext";
import { useTranslation } from "react-i18next";

export default function AddButton() {
  const context = useContext(EntityContext);
  const { t } = useTranslation();

  return (
    <button
      className="add-button"
      onClick={context?.createEntity}
      aria-label={t("aria-label-add-entity")}
      title={t("aria-label-add-entity")}
    >
      +
    </button>
  );
}
