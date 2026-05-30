import "./RelationshipArrow.scss"
import { useEffect, useId, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useTranslation } from "react-i18next"
import type { RelationshipType } from "@/types/interface.types"
import ArrowMarkerDefs from "./parts/ArrowMarkerDefs"
import RelationshipLine from "./parts/RelationshipLine"
import ConfirmationDialog, {
  type ConfirmationDialogRef,
} from "@/components/overlays/confirmation-dialog/ConfirmationDialog"
import deleteSvg from "@/assets/svg/common/delete.svg"

interface RelationshipArrowProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  type: RelationshipType
  scale?: number
  onDelete?: () => void
  portalTarget?: HTMLElement | null
  buttonPosition?: { x: number; y: number }
}

const STROKE_COLOR = "#555"
const HOVER_COLOR = "var(--color-secondary)"

export default function RelationshipArrow({
  from,
  to,
  type,
  scale = 1,
  onDelete,
  portalTarget,
  buttonPosition,
}: RelationshipArrowProps) {
  const uid = useId()
  const idPrefix = uid.replace(/:/g, "")
  const [hovered, setHovered] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const color = hovered ? HOVER_COLOR : STROKE_COLOR
  const dialogRef = useRef<ConfirmationDialogRef>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    if (!showDelete) return
    function onDocMouseDown(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (buttonRef.current?.contains(target)) return
      if (target.closest("dialog[open]")) return
      setShowDelete(false)
    }
    document.addEventListener("mousedown", onDocMouseDown, true)
    return () => document.removeEventListener("mousedown", onDocMouseDown, true)
  }, [showDelete])

function toggleDeleteButton(e: React.MouseEvent) {
  e.preventDefault()
  if (hovered) {
    setShowDelete(true)
  }
}

  return (
    <>
      <g
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onContextMenu={(e) => {
          toggleDeleteButton(e)
        }}
        onDoubleClick={(e) => {
          toggleDeleteButton(e)
        }}
      >
        <ArrowMarkerDefs idPrefix={idPrefix} color={color} />
        <RelationshipLine
          from={from}
          to={to}
          type={type}
          scale={scale}
          idPrefix={idPrefix}
          color={color}
        />
      </g>
      {showDelete &&
        createPortal(
          <>
            <button
              ref={buttonRef}
              type="button"
              className="relationship-delete-button"
              style={
                {
                  left: `${(buttonPosition ?? to).x}px`,
                  top: `${(buttonPosition ?? to).y}px`,
                  "--from-x": `${from.x - to.x}px`,
                  "--from-y": `${from.y - to.y}px`,
                } as React.CSSProperties
              }
              onClick={(e) => {
                e.stopPropagation()
                dialogRef.current?.openDialog()
              }}
              onContextMenu={(e) => {
                setShowDelete(false)
                e.preventDefault()
                e.stopPropagation()
              }}
              aria-label={t("delete")}
            >
              <img src={deleteSvg} alt={t("delete")} />
            </button>
            <ConfirmationDialog
              ref={dialogRef}
              portalDestination={portalTarget ?? document.body}
              action={() => {
                onDelete?.()
                setShowDelete(false)
              }}
            >
              <p>{t("dialog-delete-relationship-text")}</p>
            </ConfirmationDialog>
          </>,
          portalTarget ?? document.body,
        )}
    </>
  )
}
