import { useContext, useEffect } from "react"
import { EntityContext } from "@/components/uml-editor/parts/EntityContext"
import { useTranslation } from "react-i18next"
import SyButtonOptions from "@/components/shared/sy-button-options/SyButtonOptions"
import addSvg from "@/assets/svg/common/add.svg"

export default function AddButton({ disabled }: { disabled?: boolean }) {
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
    <SyButtonOptions
      buttons={[
        {
          texts: { label: t("aria-label-add-class"), value: t("class") },
          onClick: () => disabled ? undefined : context?.createEntity("class"),
        },
        {
          texts: { label: t("aria-label-add-interface"), value: t("interface") },
          onClick: () => disabled ? undefined : context?.createEntity("interface"),
        },
      ]}
      label={t("aria-label-add-entity")}
    >
      <img className="add-button__icon" src={addSvg} alt={t("add")} />
    </SyButtonOptions>
  )
}
