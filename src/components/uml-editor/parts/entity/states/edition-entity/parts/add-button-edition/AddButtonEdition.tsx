import './AddButtonEdition.scss'
import AddSvg from '@/assets/svg/common/add.svg?react'
export default function AddButton({ action }: { action: () => void }) {
  return (
    <button type="button" onClick={() => action()} onDoubleClick={(e) => e.stopPropagation()} className="entity-form__add-button">
      <AddSvg />
    </button>
  )
}
