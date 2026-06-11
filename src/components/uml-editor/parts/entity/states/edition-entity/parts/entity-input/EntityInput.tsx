import { useTranslation } from "react-i18next"
import FormElement from "../form-element/FormElement"
import "./EntityInput.scss"
import type { InputHTMLAttributes } from "react"

interface EntityInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: string
  onChange: (value: string) => void
}

const EntityInput = ({ value, onChange, ...rest }: EntityInputProps) => {
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
        onDoubleClick={(e) => e.stopPropagation()}
        placeholder={t("name-placeholder")}
        {...rest}
      />
    </FormElement>
  )
}

export default EntityInput
