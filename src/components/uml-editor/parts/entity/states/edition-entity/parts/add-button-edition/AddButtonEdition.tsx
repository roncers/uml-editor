import "./AddButtonEdition.scss"
import AddSvg from "@/assets/svg/common/add.svg?react"
import type { ButtonHTMLAttributes } from "react"

interface AddButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  action: () => void
}

export default function AddButton({
  action,
  ...rest
}: AddButtonProps) {
  return (
    <button
      type="button"
      onClick={action}
      onDoubleClick={(e) => e.stopPropagation()}
      className="entity-form__add-button"
      {...rest}
    >
      <AddSvg />
    </button>
  )
}