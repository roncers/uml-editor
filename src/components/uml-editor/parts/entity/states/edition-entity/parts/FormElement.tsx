import { useTranslation } from "react-i18next"
import type { ReactNode } from "react"

interface FormElementProps {
  elementId: string
  children: ReactNode
}

export default function FormElement({ children, elementId }: FormElementProps) {
  const { t } = useTranslation()
  return (
    <div className="entity-form__field">
      <label htmlFor={elementId} className="entity-form__field-label">
        {t(elementId)}
      </label>
      {children}
    </div>
  )
}
