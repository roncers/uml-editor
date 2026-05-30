import "./InformationPopover.scss"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import closeSvg from "@/assets/svg/common/close.svg"
import AddButton from "@/components/uml-editor/parts/buttons-menu/buttons/add-button/AddButton"
import DeleteButton from "@/components/uml-editor/parts/buttons-menu/buttons/delete-button/DeleteButton"
import InterchangeButton from "@/components/uml-editor/parts/buttons-menu/buttons/interchange-button/InterchangeButton"
import Entity from "@/components/uml-editor/parts/entity/Entity"
import { ClassSynec } from "@/classes/classifiers/ClassSynec"
import { RelationshipIcons } from "@/utils/iconsBundle"
import DummyRelationshipsRenderer from "./parts/DummyRelationshipsRenderer"
import { useResponsiveT } from "@/utils/functions/translateUtils"

export default function InformationPopover() {
  const tR = useResponsiveT()
  const { t } = useTranslation()
  const [popoverEl, setPopoverEl] = useState<HTMLDivElement | null>(null)
  const [arrowContainerEl, setArrowContainerEl] =
    useState<HTMLDivElement | null>(null)
  const mockEntity1 = useMemo(() => new ClassSynec(tR("right-click-me")), [tR])
  const mockEntity2 = useMemo(() => new ClassSynec(t("relate-me")), [t])
  const mockEntity3 = useMemo(() => new ClassSynec(t("relate-me-too")), [t])

  function joinMockRelationship(targetId: string) {
    const owner = [mockEntity2, mockEntity3].find((e) =>
      e.relationships.some((rel) => rel.destination === ""),
    )
    if (!owner || owner.id === targetId) return
    owner.setRelationshipDestiny(targetId)
  }
  const relationshipTypes = [
    "dependency",
    "association",
    "implementation",
    "inheritance",
    "aggregation",
    "composition",
  ]
  const isMobile = window.innerWidth < 768
  // const popoverEle = document.getElementById(
  //   "information-popover",
  // ) as HTMLElement
  return (
    <div
      ref={setPopoverEl}
      className="popover-container"
      popover="auto"
      id="information-popover"
    >
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
              <h4 className="g-mimic-text">{t("title-moving-usage")}</h4>
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-moving-usage")}
                </p>
              </section>
            </article>
          </section>

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
                <p className="information-card__info-text information-card__entity-toggling-text g-background-dashed">
                  {tR("information-edition-usage-1")}
                </p>
                <div className="information-card__info-test information-card__entity-toggling-test g-background-dashed">
                  <Entity entity={mockEntity1} dialogDestination={popoverEl!} />
                </div>
              </section>
            </article>
          </section>

          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">
                {t("information-relationships-handling-title")}
              </h4>
              <section className="information-card__info-data">
                <div className="information-card__info-text information-card__entity-toggling-text g-background-dashed">
                  <p>{tR("information-edition-usage-2")}</p>
                  <p>{tR("information-edition-usage-3")}</p>
                </div>
                {isMobile ? null : (
                  <div
                    ref={setArrowContainerEl}
                    className="information-card__info-test information-card__entity-toggling-test g-background-dashed"
                    style={{ position: "relative", overflow: "hidden" }}
                  >
                    <div style={{ display: "flex", gap: "20vw" }}>
                      <Entity
                        entity={mockEntity2}
                        onClick={() => joinMockRelationship(mockEntity2.id)}
                        dialogDestination={popoverEl!}
                      />
                      <Entity
                        entity={mockEntity3}
                        onClick={() => joinMockRelationship(mockEntity3.id)}
                        dialogDestination={popoverEl!}
                      />
                    </div>
                    <DummyRelationshipsRenderer
                      entities={[mockEntity2, mockEntity3]}
                      container={arrowContainerEl}
                      dialogTarget={popoverEl!}
                    />
                  </div>
                )}
              </section>
            </article>
          </section>

          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">{t("title-deletion-usage")}</h4>
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-deletion-usage")}
                </p>
                <div className="information-card__info-test information-card__padding-del-button g-background-dashed">
                  <DeleteButton disabled />
                </div>
              </section>
            </article>
          </section>

          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">{t("title-exchange-usage")}</h4>
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-exchange-usage")}
                </p>
                <div className="information-card__info-test information-card__padding-add-button g-background-dashed">
                  <InterchangeButton disabled />
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
              <h4 className="g-mimic-text">{t("information-classes-title")}</h4>
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-uml-classes")}
                </p>
              </section>
            </article>
          </section>
          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">
                {t("information-interfaces-title")}
              </h4>
              <section className="information-card__info-data">
                <p className="information-card__info-text g-background-dashed">
                  {t("information-uml-interfaces")}
                </p>
              </section>
            </article>
          </section>
          <section className="information-card__information-container">
            <article className="information-card__information">
              <h4 className="g-mimic-text">
                {t("information-relationships-title")}
              </h4>
              <section className="information-card__info-grid">
                {relationshipTypes.map((type) => (
                  <p
                    key={type}
                    className="information-card__info-text g-background-dashed"
                  >
                    <strong>{t(`relationship-${type}`)}</strong>
                    <img src={RelationshipIcons[type]} alt={type} />
                    {t(`information-relationships-usage-${type}`)}
                  </p>
                ))}
              </section>
            </article>
          </section>
          <div className="background-dots">
            {Array.from({ length: 36 }, (_, i) => {
              return <div className="dot" key={i}></div>
            })}
          </div>
          <footer className="information-card__footer">
            <p>{t("information-footer")}</p>
          </footer>
        </section>
      </div>
    </div>
  )
}
