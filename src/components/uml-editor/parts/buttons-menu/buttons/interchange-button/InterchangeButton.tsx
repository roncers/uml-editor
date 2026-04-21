import { useTranslation } from "react-i18next"
import SyButtonOptions from "@/components/shared/sy-button-options/SyButtonOptions"
import interchangeSvg from "@/assets/svg/common/download.svg"
import "./InterchangeButton.scss"

export default function AddButton() {
  const { t } = useTranslation()

  return (
    <SyButtonOptions
      buttons={[
        {
          texts: { label: t("aria-label-export"), value: t("export") },
          onClick: () => console.log("export data"),
        },
        {
          texts: { label: t("aria-label-import"), value: t("import") },
          onClick: () => console.log("import data"),
        },
      ]}
      label={t("aria-label-interchange-button")}
    >
      <img className="buttons-menu__interchange-button-img" src={interchangeSvg} alt={t("interchange-button")} />
    </SyButtonOptions>
  )
}
