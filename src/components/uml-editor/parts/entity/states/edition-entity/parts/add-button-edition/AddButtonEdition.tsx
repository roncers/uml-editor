import './AddButtonEdition.scss'
export default function AddButton({ action }: { action: () => void }) {
  return (
    <button type="button" onClick={() => action()} className="entity-form__add-button">
      +
    </button>
  )
}
