import "./DeleteButton.scss"
import SyButton from "@/components/shared/sy-button/SyButton"
import ConfirmationDialog from "@/components/overlays/confirmation-dialog/ConfirmationDialog"
import { useTranslation } from "react-i18next"

export default function DeleteButton() {
  function openDialog() {
    const dialog = document.getElementById("deleteDialog") as HTMLDialogElement
    if (dialog) {
      dialog.showModal()
    }
  }

  function closeDialog() {
    const dialog = document.getElementById("deleteDialog") as HTMLDialogElement
    if (dialog) {
      dialog.close()
    }
  }

  function deleteAll() {
    closeDialog()
    // TODO: Implement delete all logic
  }
  const { t } = useTranslation()
  return (
    <>
      <SyButton className="delete-button" onClick={() => openDialog()}>
        <span className="delete-button__icon">🗑️</span>
        <span className="delete-button__text">{t("delete")}</span>
      </SyButton>
      <ConfirmationDialog id="deleteDialog" action={deleteAll}>
        <p>Are you sure you want to delete this item?</p>
      </ConfirmationDialog>
    </>
  )
}
