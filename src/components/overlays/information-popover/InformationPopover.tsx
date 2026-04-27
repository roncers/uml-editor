import "./InformationPopover.scss"
import { useTranslation } from "react-i18next"
import closeSvg from "@/assets/svg/common/close.svg"

export default function InformationPopover() {
  const { t } = useTranslation()
  return (
    <div id="information-popover" className="information-popover">
      <h2>{t("information")}</h2>
      <button
        onClick={() =>
          document.getElementById("information-popover")?.hidePopover()
        }
        aria-label={t("aria-label-close-info")}
      >
        <img src={closeSvg} alt="Close" />
      </button>
      <div className="information-popover__content">
        <h3>{t("information-title-usage")}</h3>
        <h3>{t("information-title-uml")}</h3>
      </div>
    </div>
  )
}
