import "./InformationPopover.scss"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import closeSvg from "@/assets/svg/common/close.svg"
import AddButton from "@/components/uml-editor/parts/buttons-menu/buttons/add-button/AddButton"
import Entity from "@/components/uml-editor/parts/entity/Entity"
import { ClassSynec } from "@/classes/classifiers/ClassSynec"

export default function InformationPopover() {
  const { t } = useTranslation()
  const mockEntity = useMemo(() => new ClassSynec(t("right-click-me")), [t])
  return (
    <div className="popover-container" popover="auto" id="information-popover">
      <div className="information-card">
        <section className="information-card__header">
          <h2 className="g-mimic-text">{t("information")}</h2>
          <button
            className="mimic-button"
            onClick={() =>
              document.getElementById("information-popover")?.hidePopover()
            }
            aria-label={t("aria-label-close-info")}
          >
            <img src={closeSvg} alt="Close" />
          </button>
        </section>
        <section className="information-card__content">
          <h3 className="g-mimic-text">{t("information-title-usage")}</h3>
          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">{t("title-creation-usage")}</h4>
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-creation-usage")}
                </p>
                <div className="information-card__info-test information-card__padding-add-button g-background-dashed">
                  <AddButton disabled />
                </div>
              </section>
            </article>
          </section>

          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">{t("title-edition-usage")}</h4>
              <section className="information-card__info-data">
                <div className="information-card__info-text information-card__entity-toggling-text g-background-dashed">
                  <p>{t("information-edition-usage-1")}</p>
                  <p>{t("information-edition-usage-2")}</p>
                </div>
                <div className="information-card__info-test information-card__entity-toggling-test g-background-dashed">
                  <Entity entity={mockEntity} />
                </div>
              </section>
            </article>
          </section>

          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">{t("title-relationships-usage")}</h4>
              <section className="information-card__info-data">
                <p className="information-card__info-text information-card__entity-toggling-text g-background-dashed">
                  {t("information-relationships-usage-1")}
                </p>
                <div className="information-card__info-test information-card__entity-toggling-test g-background-dashed">
                  <Entity entity={mockEntity} />
                </div>
              </section>
            </article>
          </section>

          <h3 className="g-mimic-text">{t("information-title-uml")}</h3>
          <section className="information-card__information-container">
            <article className="information-card__information">
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-uml-definition")}
                </p>
              </section>
            </article>
          </section>

          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">{t("information-relationships-title")}</h4>
              {/* TODO: putting them in a responsive display grid */}
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-relationships-usage-dependency")}
                </p>
              </section>
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-relationships-usage-association")}
                </p>
              </section>
            </article>
          </section>
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
