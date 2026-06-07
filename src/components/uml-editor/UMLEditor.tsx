import "./UMLEditor.scss"
import ButtonsMenu from "./parts/buttons-menu/ButtonsMenu"
import EntitiesRenderer from "./parts/renderers/entities-renderer/EntitiesRenderer"
import Board from "./parts/board/Board"
import { useRef, useEffect, } from "react"
import EntityCtxProvider from "./parts/EntityCtxProvider"
import SelectionMenuProvider from "./parts/board/SelectionMenuProvider"
import RelationshipsRenderer from "./parts/renderers/relationships-renderer/RelationshipsRenderer"
import { useEntityContext } from "./parts/EntityCtxProvider"
import { useSelectionStore } from "./parts/board/SelectionMenuProvider"
import ConfirmationDialog, { type ConfirmationDialogRef } from "../overlays/confirmation-dialog/ConfirmationDialog"
import { t } from "i18next"

export default function UMLEditor() {
  const boardSectionRef = useRef<HTMLElement | null>(null)

  return (
    <>
      <div className="uml-editor-frame">
        <div className="uml-editor-frame__border" />
        <div className="uml-editor">
          <EntityCtxProvider boardSectionRef={boardSectionRef}>
            <SelectionMenuProvider>
              <ButtonsMenu />
              <UMLEditorInner boardSectionRef={boardSectionRef} />
            </SelectionMenuProvider>
          </EntityCtxProvider>
        </div>
      </div>

    </>
  )
}

function UMLEditorInner({ boardSectionRef }: { boardSectionRef: React.RefObject<HTMLElement | null> }) {
  const confirmationDialogRef = useRef<ConfirmationDialogRef>(null)

  const { createdEntities, joinRelationship, createEntity, deleteEntity } = useEntityContext()
  const selectionStore = useSelectionStore()
  // Key event orchestator
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "f" &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement
        )
      ) {
        e.preventDefault()
        createEntity("class")
      } else if (selectionStore.selectedIds.length && (e.key === "Delete" || e.key === "Backspace")) {
        selectionStore.setDialogOpened(true)
        confirmationDialogRef.current?.openDialog()
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [createEntity, selectionStore])
  function onDialogDelete() {
    selectionStore.setDialogOpened(false)
    selectionStore.selectedIds.forEach((id) => {
      deleteEntity(id)
    })
  }
  function onDialogClose() {
    selectionStore.setDialogOpened(false)
  }
  return (
    <>
      <Board boardSectionRef={boardSectionRef}>
        <EntitiesRenderer entities={createdEntities} joinRelationship={joinRelationship} />
        <RelationshipsRenderer entities={createdEntities} />
      </Board>
      <ConfirmationDialog ref={confirmationDialogRef} action={onDialogDelete} onClose={onDialogClose}>
        <p>{t('dialog-delete-selected-entities')}</p>
      </ConfirmationDialog>
    </>
  )
}
