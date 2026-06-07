import { useContext } from "react"
import { EntityContext } from "@/components/uml-editor/parts/EntityCtxProvider"
import { useTranslation } from "react-i18next"
import SyButtonOptions from "@/components/shared/sy-button-options/SyButtonOptions"
import AddSvg from "@/assets/svg/common/add.svg?react"

export default function AddButton({ disabled }: { disabled?: boolean }) {
  const context = useContext(EntityContext)
  const { t } = useTranslation()

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
      <AddSvg className="add-button__icon" />
    </SyButtonOptions>
  )
}
