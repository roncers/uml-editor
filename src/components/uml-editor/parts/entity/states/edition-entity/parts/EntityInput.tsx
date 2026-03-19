import FormElement from "./FormElement"

interface EntityInputProps {
  value: string
  onChange: (value: string) => void
}

const EntityInput = ({ value, onChange }: EntityInputProps) => {
  return (
    <FormElement elementId="name">
      <input
        id="name"
        className="entity-form__input-default"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      />
    </FormElement>
  )
}

export default EntityInput
