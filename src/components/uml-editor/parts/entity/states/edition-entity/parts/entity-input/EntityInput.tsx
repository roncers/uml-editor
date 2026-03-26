import { useTranslation } from "react-i18next"
import FormElement from "../form-element/FormElement"
import "./EntityInput.scss"
interface EntityInputProps {
  value: string
  onChange: (value: string) => void
}

const EntityInput = ({ value, onChange }: EntityInputProps) => {
  const { t } = useTranslation()
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
        placeholder={t('name-placeholder')}
      />
    </FormElement>
  )
}

export default EntityInput
