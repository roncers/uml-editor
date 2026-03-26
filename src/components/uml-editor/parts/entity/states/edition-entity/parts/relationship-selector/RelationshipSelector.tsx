import {
  type RelationshipType,
  relationshipType,
} from "@/types/interface.types"
import { useTranslation } from "react-i18next"
import dependencySvg from "@/assets/svg/dependency.svg"
import associationSvg from "@/assets/svg/association.svg"
import aggregationSvg from "@/assets/svg/aggregation.svg"
import compositionSvg from "@/assets/svg/composition.svg"
import implementationSvg from "@/assets/svg/implementation.svg"
import inheritanceSvg from "@/assets/svg/inheritance.svg"
import './RelationshipSelector.scss'

interface RelationshipProps {
  onSelection: (type: RelationshipType) => void
}

const relationshipIcons: Record<RelationshipType, string> = {
  [relationshipType.dependency]: dependencySvg,
  [relationshipType.association]: associationSvg,
  [relationshipType.aggregation]: aggregationSvg,
  [relationshipType.composition]: compositionSvg,
  [relationshipType.implementation]: implementationSvg,
  [relationshipType.inheritance]: inheritanceSvg,
}

export default function RelationshipsSelector({
  onSelection,
}: RelationshipProps) {
  const { t } = useTranslation()

  return (
    <div className="entity-form__relationship-selector">
      <div className="entity-form__relationship-menu">
        {Object.values(relationshipType).map((type) => (
          <button
            key={type}
            type="button"
            className="entity-form__relationship-option"
            data-type={type}
            title={t(`relationship-${type}`)}
            onClick={() => onSelection(type)}
          >
            <img src={relationshipIcons[type]} alt={t(`relationship-${type}`)} />
          </button>
        ))}
      </div>
    </div>
  )
}
