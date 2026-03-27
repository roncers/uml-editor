import "./AddButton.scss"
import { useContext, useEffect } from "react"
import { EntityContext } from "@/components/uml-editor/parts/EntityContext"
import { useTranslation } from "react-i18next"
import SyButton from "@/components/shared/sy-button/SyButton"

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
        context?.createEntity()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [context])

  return (
    <div className="buttons-menu__add-button-group">
    <SyButton
      className="buttons-menu__add-button"
      onClick={context?.createEntity}
      aria-label={t("aria-label-add-entity")}
      title={t("aria-label-add-entity")}
    >
      +
    </SyButton>
    <SyButton className="buttons-menu__add-button-sub-1">Class</SyButton>
    <SyButton className="buttons-menu__add-button-sub-2">Interface</SyButton>
    </div>
  )
}
