import "./ConfirmationDialog.scss"

import { forwardRef, useImperativeHandle } from 'react'
import { useTranslation } from 'react-i18next'

export interface ConfirmationDialogRef {
  openDialog: () => void
  closeDialog: () => void
}

const ConfirmationDialog = forwardRef<ConfirmationDialogRef, {
  action: () => void
  children: React.ReactNode
  id?: string
}>(({ action, children, id = crypto.randomUUID() }, ref) => {
  const { t } = useTranslation()
  function closeDialog() {
    const dialog = document.getElementById(id) as HTMLDialogElement
    if (dialog) {
      dialog.close()
    }
  }

  function openDialog() {
    const dialog = document.getElementById(id) as HTMLDialogElement
    if (dialog) {
      dialog.showModal()
    }
  }

  // this provides the functions to the ref
  useImperativeHandle(ref, () => ({
    openDialog,
    closeDialog
  }))

  return (
    <dialog className="confirmation-dialog" id={id}>
      {children}
      <button onClick={action}>{t("confirm")}</button>
      <form method="dialog">
        <button>{t("cancel")}</button>
      </form>
    </dialog>
  )
})

export default ConfirmationDialog
