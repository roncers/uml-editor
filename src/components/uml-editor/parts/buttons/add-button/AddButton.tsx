import "./AddButton.scss"
import { useContext, useEffect } from "react"
import { EntityContext } from "../../EntityContext"
import { useTranslation } from "react-i18next"

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
    <button
      className="add-button"
      onClick={context?.createEntity}
      aria-label={t("aria-label-add-entity")}
      title={t("aria-label-add-entity")}
    >
      +
    </button>
  )
}
