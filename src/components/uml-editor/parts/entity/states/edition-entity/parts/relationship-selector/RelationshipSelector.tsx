import {
  type RelationshipType,
  relationshipType,
} from "@/types/interface.types"
import { useTranslation } from "react-i18next"
import dependencySvg from "@/assets/svg/relationships/dependency.svg"
import associationSvg from "@/assets/svg/relationships/association.svg"
import aggregationSvg from "@/assets/svg/relationships/aggregation.svg"
import compositionSvg from "@/assets/svg/relationships/composition.svg"
import implementationSvg from "@/assets/svg/relationships/implementation.svg"
import inheritanceSvg from "@/assets/svg/relationships/inheritance.svg"
import addSvg from "@/assets/svg/common/add.svg"

import "./RelationshipSelector.scss"

interface RelationshipProps {
  onSelection: (type: RelationshipType) => void
  entityType: string
}

const relationshipIcons: Record<RelationshipType, string> = {
  [relationshipType.inheritance]: inheritanceSvg,
  [relationshipType.dependency]: dependencySvg,
  [relationshipType.association]: associationSvg,
  [relationshipType.aggregation]: aggregationSvg,
  [relationshipType.composition]: compositionSvg,
  [relationshipType.implementation]: implementationSvg,
}

export default function RelationshipsSelector({
  onSelection,
  entityType,
}: RelationshipProps) {
  const { t } = useTranslation()
  const { implementation, ...rest } = relationshipType

  const relationshipTypes =
    entityType === "InterfaceSynec" ? { implementation } : rest

  const types = Object.values(relationshipTypes)
  const total = types.length

  return (
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
            style={{ '--i': index, '--total': total } as React.CSSProperties}
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
