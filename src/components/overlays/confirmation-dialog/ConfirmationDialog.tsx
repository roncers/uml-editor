import "./ConfirmationDialog.scss"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { useTranslation } from "react-i18next"

export interface ConfirmationDialogRef {
  openDialog: () => void
  closeDialog: () => void
}

const ConfirmationDialog = forwardRef<
  ConfirmationDialogRef,
  {
    action: () => void
    children: React.ReactNode
  }
>(({ action, children }, ref) => {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => ({
    openDialog: () => dialogRef.current?.showModal(),
    closeDialog: () => dialogRef.current?.close(),
  }))

  return (
    <dialog
      onClose={() => dialogRef.current?.close()}
      onMouseDown={(e) => e.stopPropagation()}
      ref={dialogRef}
      className="confirmation-dialog"
    >
      <div className="confirmation-dialog__content">{children}</div>
      <form method="dialog" className="confirmation-dialog__actions">
        <button type="button" onClick={() => { action(); dialogRef.current?.close() }}>
          {t("confirm")}
        </button>
        <button value="cancel">{t("cancel")}</button>
      </form>
    </dialog>
  )
})

export default ConfirmationDialog