const icons = import.meta.glob('@/assets/svg/relationships/*.svg', {
  eager: true,
  query: '?url',
  import: 'default'
})

export const RelationshipIcons = Object.entries(icons).reduce((acc, [path, url]) => {
  const name = path.split('/').pop()?.replace('.svg', '') || path;
  acc[name] = url as string;
  return acc;
}, {} as Record<string, string>);

// React components for inline SVG usage
import InheritanceSvg from "@/assets/svg/relationships/inheritance.svg?react"
import DependencySvg from "@/assets/svg/relationships/dependency.svg?react"
import AssociationSvg from "@/assets/svg/relationships/association.svg?react"
import AggregationSvg from "@/assets/svg/relationships/aggregation.svg?react"
import CompositionSvg from "@/assets/svg/relationships/composition.svg?react"
import ImplementationSvg from "@/assets/svg/relationships/implementation.svg?react"

export const RelationshipComponents = {
  inheritance: InheritanceSvg,
  dependency: DependencySvg,
  association: AssociationSvg,
  aggregation: AggregationSvg,
  composition: CompositionSvg,
  implementation: ImplementationSvg,
} as const