import "./AddButton.scss"
import { useContext, useEffect } from "react"
import { EntityContext } from "@/components/uml-editor/parts/EntityContext"
import { useTranslation } from "react-i18next"
import SyButton from "@/components/shared/sy-button/SyButton"
import addSvg from "@/assets/svg/common/add.svg"

export default function AddButton() {
  const context = useContext(EntityContext)
  const { t } = useTranslation()

  // TODO -> centralize it for more commands
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "f" &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault()
        context?.createEntity("class")
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [context])

  return (
    <div className="buttons-menu__add-button-group">
      <SyButton
        className="buttons-menu__add-button"
        aria-label={t("aria-label-add-entity")}
        title={t("aria-label-add-entity")}
      >
        <img className="add-button__icon" src={addSvg} alt={t("add")} />
      </SyButton>
      <SyButton
        className="buttons-menu__add-button-sub-1"
        aria-label={t("aria-label-add-class")}
        title={t("aria-label-add-class")}
        onClick={() => context?.createEntity("class")}
      >
        Class
      </SyButton>
      <SyButton
        className="buttons-menu__add-button-sub-2"
        aria-label={t("aria-label-add-interface")}
        title={t("aria-label-add-interface")}
        onClick={() => context?.createEntity("interface")}
      >
        Interface
      </SyButton>
    </div>
  )
}
