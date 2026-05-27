import { observer } from "mobx-react-lite"
import { attributeVisibility, attributeType } from "@/types/interface.types"
import type { PropertySynec } from "@/classes/members/PropertySynec"
import "./PropertySelector.scss"
import { useTranslation } from "react-i18next"
interface PropertySelectorProps<T extends PropertySynec> {
  value: T
  onChange: (
    value: string,
    type: "name" | "type" | "visibility",
    property: T,
  ) => void
  formId: string | number
}

const PropertySelector = observer(
  <T extends PropertySynec>({
    value,
    onChange,
    formId,
  }: PropertySelectorProps<T>) => {
    const { t } = useTranslation()
    return (
      <>
        <select
          id={`property-type-${formId}`}
          className="entity-form__select-property entity-form__select-property--alone"
          value={value.type}
          onChange={(e) => onChange(e.target.value, "type", value)}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {Object.values(attributeType).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="entity-form__field-wrapper">
          <input
            id={`property-name-${formId}`}
            className="entity-form__input-property"
            autoComplete="off"
            value={value.name}
            onChange={(e) => onChange(e.target.value, "name", value)}
            onMouseDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            placeholder={t("name-placeholder")}
          />
          <select
            id={`property-visibility-${formId}`}
            className="entity-form__select-property"
            value={value.visibility}
            onChange={(e) => onChange(e.target.value, "visibility", value)}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {Object.values(attributeVisibility).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </>
    )
  },
)

export default PropertySelector
