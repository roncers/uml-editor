import { observer } from "mobx-react-lite" 
import { attributeVisibility } from "@/types/interface.types"
import type { FunctionSynec } from "@/classes/members/FunctionSynec"
import { useTranslation } from "react-i18next"

import "./FunctionSelector.scss"

interface FunctionSelectorProps<T extends FunctionSynec> {
  value: T
  onChange: (value: string, type: "name" | "visibility", method: T) => void
  formId: string | number
}

const FunctionSelector = observer(
  <T extends FunctionSynec>({
    value,
    onChange,
    formId,
  }: FunctionSelectorProps<T>) => {
    const { t } = useTranslation()
    return (
      <div className="entity-form__field-wrapper">
        <input
          id={`function-name-${formId}`}
          className="entity-form__input-function"
          autoComplete="off"
          value={value.name}
          onChange={(e) => onChange(e.target.value, "name", value)}
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
          placeholder={t('name-placeholder')}
        />
        <select
          id={`function-visibility-${formId}`}
          className="entity-form__select-function"
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
    )
  },
)

export default FunctionSelector
