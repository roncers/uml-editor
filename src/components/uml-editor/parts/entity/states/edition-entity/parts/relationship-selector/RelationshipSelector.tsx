import {
  type RelationshipType,
  relationshipType,
} from "@/types/interface.types"
import { useTranslation } from "react-i18next"
import { RelationshipIcons } from "@/utils/iconsBundle"
import addSvg from "@/assets/svg/common/add.svg"

import "./RelationshipSelector.scss"

interface RelationshipProps {
  onSelection: (type: RelationshipType) => void
  entityType: string
}

const relationshipIcons: Record<RelationshipType, string> = {
  [relationshipType.inheritance]: RelationshipIcons.inheritance,
  [relationshipType.dependency]: RelationshipIcons.dependency,
  [relationshipType.association]: RelationshipIcons.association,
  [relationshipType.aggregation]: RelationshipIcons.aggregation,
  [relationshipType.composition]: RelationshipIcons.composition,
  [relationshipType.implementation]: RelationshipIcons.implementation,
}

export default function RelationshipsSelector({
  onSelection,
  entityType,
}: RelationshipProps) {
  const { t } = useTranslation()

  const types = Object.values(relationshipType)
  const total = types.length

  return entityType === "InterfaceSynec" ? (
    <> </>
  ) : (
    <span
      role="button"
      className="entity-form__relationship-selector"
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      <img src={addSvg} alt="" aria-hidden="true" />
      <div className="entity-form__relationship-menu">
        {types.map((type, index) => (
          <button
            key={type}
            type="button"
            className="entity-form__relationship-option"
            style={{ "--i": index, "--total": total } as React.CSSProperties}
            data-type={type}
            title={t(`relationship-${type}`)}
            onClick={() => onSelection(type)}
          >
            <img
              src={relationshipIcons[type]}
              alt={t(`relationship-${type}`)}
            />
          </button>
        ))}
      </div>
    </span>
  )
}
