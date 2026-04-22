import { useTranslation } from "react-i18next"
import SyButtonOptions from "@/components/shared/sy-button-options/SyButtonOptions"
import interchangeSvg from "@/assets/svg/common/download.svg"
import { EntityFactory } from "@/classes/factories/EntityFactory"
import "./InterchangeButton.scss"

export default function AddButton() {
  const { t } = useTranslation()

  // DOWNLOAD
  function exportData() {
    const dataAsText = EntityFactory.toString()
    // TODO: indent the data with \n
    const element = document.createElement("a")
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(dataAsText),
    )
    element.setAttribute("download", "travesuras.txt")

    element.style.display = "none"
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  function importData() {
    // TODO: desindent the document if needed
    const data = "data from a file"
    const convertedData = EntityFactory.fromString(data)
    EntityFactory.setEntities(convertedData)
  }

  return (
    <SyButtonOptions
      buttons={[
        {
          texts: { label: t("aria-label-export"), value: t("export") },
          onClick: () => exportData(),
        },
        {
          texts: { label: t("aria-label-import"), value: t("import") },
          onClick: () => importData(),
        },
      ]}
      label={t("aria-label-interchange-button")}
    >
      <img
        className="buttons-menu__interchange-button-img"
        src={interchangeSvg}
        alt={t("interchange-button")}
      />
    </SyButtonOptions>
  )
}
