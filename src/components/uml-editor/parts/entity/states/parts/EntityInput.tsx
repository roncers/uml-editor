import FormElement from "./FormElement"

interface EntityInputProps {
  value: string
  onChange: (value: string) => void
  onConfirm?: () => void
}

const EntityInput = ({ value, onChange, onConfirm }: EntityInputProps) => {
  return (
    <FormElement elementId="name">
      <input
        id="name"
        className="entity__input-default"
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Enter" && onConfirm?.()}
      />
    </FormElement>
  )
}

export default EntityInput
