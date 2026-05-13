import "./InformationPopover.scss"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import closeSvg from "@/assets/svg/common/close.svg"
import AddButton from "@/components/uml-editor/parts/buttons-menu/buttons/add-button/AddButton"
import Entity from "@/components/uml-editor/parts/entity/Entity"
import { ClassSynec } from "@/classes/classifiers/ClassSynec"
import { RelationshipIcons } from "@/utils/iconsBundle"
import RelationshipArrow from "@/components/uml-editor/parts/renderers/relationships-renderer/relationship-arrow/RelationshipArrow"

export default function InformationPopover() {
  const { t } = useTranslation()
  const mockEntity1 = useMemo(() => new ClassSynec(t("right-click-me")), [t])
  const mockEntity2 = useMemo(() => new ClassSynec(t("I am related!")), [t])
  const mockEntity3 = useMemo(() => new ClassSynec(t("Me too!")), [t])
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
                  <Entity entity={mockEntity1} />
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
                  <div style={{ display: "flex", gap: "5vw" }}>
                    <Entity entity={mockEntity2} />
                    <Entity entity={mockEntity3} />
                  </div>
                  <RelationshipArrow
                    from={{ x: 0, y: 0 }}
                    to={{ x: 100, y: 100 }}
                    type="association"
                    scale={1}
                    onDelete={() => {}}
                  />
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
              <section className="information-card__info-grid">
                <p className="information-card__info-text g-background-dashed">
                  <strong>{t("relationship-dependency")}</strong>
                  <img src={RelationshipIcons.dependency} alt="Dependency" />
                  {t("information-relationships-usage-dependency")}
                </p>
                <p className="information-card__info-text no-margin g-background-dashed">
                  <strong>{t("relationship-association")}</strong>
                  <img src={RelationshipIcons.association} alt="Association" />
                  {t("information-relationships-usage-association")}
                </p>
                <p className="information-card__info-text no-margin g-background-dashed">
                  <strong>{t("relationship-implementation")}</strong>
                  <img src={RelationshipIcons.implementation} alt="Implementation" />
                  {t("information-relationships-usage-implementation")}
                </p>
                <p className="information-card__info-text g-background-dashed">
                  <strong>{t("relationship-inheritance")}</strong>
                  <img src={RelationshipIcons.inheritance} alt="Inheritance" />
                  {t("information-relationships-usage-inheritance")}
                </p>
                <p className="information-card__info-text no-margin g-background-dashed">
                  <strong>{t("relationship-aggregation")}</strong>
                  <img src={RelationshipIcons.aggregation} alt="Aggregation" />
                  {t("information-relationships-usage-aggregation")}
                </p>
                <p className="information-card__info-text no-margin g-background-dashed">
                  <strong>{t("relationship-composition")}</strong>
                  <img src={RelationshipIcons.composition} alt="Composition" />
                  {t("information-relationships-usage-composition")}
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
