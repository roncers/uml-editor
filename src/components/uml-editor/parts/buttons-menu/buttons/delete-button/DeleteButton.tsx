import "./DeleteButton.scss"
import SyButton from "@/components/shared/sy-button/SyButton"
import ConfirmationDialog from "@/components/overlays/confirmation-dialog/ConfirmationDialog"
import { useRef } from "react"
import { useTranslation } from "react-i18next"
import { useEntityContext } from "@/components/uml-editor/parts/EntityContext"
import type { ConfirmationDialogRef } from "@/components/overlays/confirmation-dialog/ConfirmationDialog"
import deleteSvg from "@/assets/svg/common/delete.svg"

export default function DeleteButton({ disabled }: { disabled?: boolean }) {
  const deleteDialogRef = useRef<ConfirmationDialogRef>(null)
  const { clearEntities } = useEntityContext()

  function deleteAll() {
    if (disabled) return
    clearEntities()
  }
  const { t } = useTranslation()
  return (
    <>
      <SyButton
        className="buttons-menu__delete-button"
        aria-label={t("delete-all")}
        title={t("delete-all")}
        onClick={() => deleteDialogRef.current?.openDialog()}
      >
        <img src={deleteSvg} alt={t("delete-all")} />
      </SyButton>
      <ConfirmationDialog ref={deleteDialogRef} action={deleteAll}>
        <p dangerouslySetInnerHTML={{ __html: t("dialog-delete-all-text") }} />
      </ConfirmationDialog>
    </>
  )
}
