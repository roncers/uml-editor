import "./InformationPopover.scss"
import { useTranslation } from "react-i18next"
import closeSvg from "@/assets/svg/common/close.svg"
import AddButton from "@/components/uml-editor/parts/buttons-menu/buttons/add-button/AddButton"

export default function InformationPopover() {
  const { t } = useTranslation()
  return (
    <div className="popover-container" popover="auto" id="information-popover">
      <div className="information-card">
        <section className="information-card__header">
          <h2 className="mimic-text">{t("information")}</h2>
          <button
            onClick={() =>
              document.getElementById("information-popover")?.hidePopover()
            }
            aria-label={t("aria-label-close-info")}
          >
            <img src={closeSvg} alt="Close" />
          </button>
        </section>
        <section className="information-card__content">
          <h3 className="mimic-text">{t("information-title-usage")}</h3>
          <h4 className="mimic-text">{t("title-creation-usage")}</h4>
          <section className="information-card__add-elements">
            <p>{t("information-creation-usage")}</p>
            <AddButton />
          </section>
          <h4 className="mimic-text">{t("title-edition-usage")}</h4>
          <p>{t("information-edition-usage")}</p>
          <h3 className="mimic-text">{t("information-title-uml")}</h3>
          <div className="background-dots">
            {Array.from({ length: 36 }, (_, i) => {
              return <div className="dot" key={i}></div>
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
