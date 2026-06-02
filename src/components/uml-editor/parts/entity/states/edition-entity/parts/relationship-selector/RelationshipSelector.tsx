import {
  type RelationshipType,
  relationshipType,
} from "@/types/interface.types"
import { useTranslation } from "react-i18next"
import { RelationshipComponents } from "@/utils/iconsBundle"
import AddSvg from "@/assets/svg/common/add.svg?react"

import "./RelationshipSelector.scss"

interface RelationshipProps {
  onSelection: (type: RelationshipType) => void
  entityType: string
}

export default function RelationshipsSelector({
  onSelection,
  entityType,
}: RelationshipProps) {
  const { t } = useTranslation()

  const isInterface = entityType === "InterfaceSynec"
  const types = Object.values(relationshipType).filter(
    (type) => !(isInterface && type === relationshipType.implementation),
  )
  const total = types.length

  return (
    <span
      role="button"
      className="entity-form__relationship-selector"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <AddSvg aria-hidden="true" />
      <div className="entity-form__relationship-menu">
        {types.map((type, index) => {
          const IconComponent = RelationshipComponents[type]
          return (
            <button
              key={type}
              type="button"
              className="entity-form__relationship-option"
              style={{ "--i": index, "--total": total } as React.CSSProperties}
              data-type={type}
              title={t(`relationship-${type}`)}
              onClick={() => onSelection(type)}
            >
              <IconComponent />
            </button>
          )
        })}
      </div>
    </span>
  )
}
