import FormElement from "./FormElement"

interface DefaultSelectorProps<T extends string> {
  elementId: string
  value: T
  options: readonly T[]
  onChange: (value: T) => void
}

const DefaultSelector = <T extends string>({ elementId, value, options, onChange }: DefaultSelectorProps<T>) => {
  return (
    <FormElement elementId={elementId}>
      <select
        id={elementId}
        className="entity-form__input-default"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </FormElement>
  )
}

export default DefaultSelector
