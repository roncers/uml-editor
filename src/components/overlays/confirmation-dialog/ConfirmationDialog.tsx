import "./ConfirmationDialog.scss"
import { forwardRef, useImperativeHandle, useRef } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"

export interface ConfirmationDialogRef {
  openDialog: () => void
  closeDialog: () => void
}

const ConfirmationDialog = forwardRef<
  ConfirmationDialogRef,
  {
    action: () => void
    onClose?: () => void
    portalDestination?: HTMLElement
    children: React.ReactNode
  }
>(({ action, onClose = () => { }, portalDestination, children }, ref) => {
  const { t } = useTranslation()
  const dialogRef = useRef<HTMLDialogElement>(null)

  useImperativeHandle(ref, () => ({
    openDialog: () => { dialogRef.current?.showModal(); dialogRef.current?.focus() },
    closeDialog: () => dialogRef.current?.close(),
  }))

  return createPortal(
    <dialog
      onDoubleClick={(e) => e.stopPropagation()}
      onClose={() => dialogRef.current?.close()}
      onMouseDown={(e) => e.stopPropagation()}
      ref={dialogRef}
      className="confirmation-dialog"
    >
      <div className="confirmation-dialog__content">{children}</div>
      <form method="dialog" className="confirmation-dialog__actions">
        <button value="cancel" onClick={() => onClose?.()}>{t("cancel")}</button>
        <button type="button" onClick={() => { action(); dialogRef.current?.close() }}>
          {t("delete")}
        </button>
      </form>
    </dialog>,
    portalDestination || document.body,
  )
})

export default ConfirmationDialog