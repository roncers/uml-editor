import './ConfirmationDialog.scss'
export default function ConfirmationDialog({ action, children, id }: { action: () => void; children: React.ReactNode; id: string }) {
  return (
    <dialog className="confirmation-dialog" id={id}>
      {children}
      <button onClick={action}>Confirm</button>
      <button onClick={() => {}}>Cancel</button>
    </dialog>
  )
}