import FormElement from "./FormElement"
import { attributeVisibility } from "@/types/interface.types"
import type { FunctionSynec } from "@/classes/members/FunctionSynec"

interface FunctionSelectorProps<T extends FunctionSynec> {
  value: T
  onChange: (value: T, type: 'name' | 'visibility') => void
}

const FunctionSelector = <T extends FunctionSynec>({
  value,
  onChange,
}: FunctionSelectorProps<T>) => {
  return (
    <FormElement elementId="methods">
      <div className="entity-form__field-wrapper">
        <input
          id="function-name"
          className="entity-form__input-function"
          autoComplete="off"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value } as T, 'name')}
        />
        <select
          id="function-visibility"
          className="entity-form__select-function"
          value={value.visibility}
          onChange={(e) => onChange({ ...value, visibility: e.target.value } as T, 'visibility')}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {Object.values(attributeVisibility).map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    </FormElement>
  )
}

export default FunctionSelector
