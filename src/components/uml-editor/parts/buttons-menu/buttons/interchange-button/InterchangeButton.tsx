import { useTranslation } from "react-i18next"
import SyButtonOptions from "@/components/shared/sy-button-options/SyButtonOptions"
import interchangeSvg from "@/assets/svg/common/download.svg"
import { EntityFactory } from "@/classes/factories/EntityFactory"
import { useEntityContext } from "@/components/uml-editor/parts/EntityContext"
import "./InterchangeButton.scss"

const SIGNATURE_KEY = "john-ford"
const SIGNATURE_VALUE = "stagecoach"

export default function InterchangeButton() {
  const { t } = useTranslation()    
  const { refreshEntities } = useEntityContext()

  // Appends the signature object as the last element of the JSON array.
  function addKey(jsonText: string): string {
    const parsed = JSON.parse(jsonText || "[]") as unknown[]
    const list = Array.isArray(parsed) ? parsed : []
    list.push({ [SIGNATURE_KEY]: SIGNATURE_VALUE })
    return JSON.stringify(list, null, 2)
  }

  // Removes the signature object silently if present; warns if missing.
  // Returns the JSON text without the signature, ready for EntityFactory.fromString.
  function stripKey(jsonText: string): string {
    const parsed = JSON.parse(jsonText || "[]") as unknown[]
    if (!Array.isArray(parsed)) return jsonText

    const last = parsed[parsed.length - 1]
    const isSignature =
      !!last &&
      typeof last === "object" &&
      !Array.isArray(last) &&
      (last as Record<string, unknown>)[SIGNATURE_KEY] === SIGNATURE_VALUE

    if (isSignature) {
      parsed.pop()
    } else {
      console.warn(
        `[InterchangeButton] Missing signature "${SIGNATURE_KEY}": "${SIGNATURE_VALUE}" at the end of the imported file. \n Why would you touch it, John Ford is the best director. Watch Stagecoach(1939)!`,
      )
    }
    return JSON.stringify(parsed)
  }

  // DOWNLOAD
  function exportData() {
    const dataAsText = addKey(EntityFactory.toString())
    const element = document.createElement("a")
    element.setAttribute(
      "href",
      "data:application/json;charset=utf-8," + encodeURIComponent(dataAsText),
    )
    element.setAttribute("download", "uml-diagram-export.json")

    element.style.display = "none"
    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  }

  function importData() {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json,application/json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      const reader = new FileReader()

      reader.onload = (readerEvent) => {
        const content = readerEvent.target?.result
        const cleaned = stripKey(content as string)
        const convertedData = EntityFactory.fromString(cleaned)
        EntityFactory.setEntities(convertedData)
        refreshEntities()
      }

      reader.readAsText(file!)
    }
    input.click()
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
