import type { UMLClassProps } from "../../Entity.types"
import { observer } from "mobx-react-lite"
import { attributeVisibility } from "@/types/interface.types"
import "./DefaultEntity.scss"

const DefaultEntity = observer(({ entity }: UMLClassProps) => {
  return (
    <div className="entity__content">
      <h3 className="entity__title entity--with-padding">{entity.name}</h3>
      {entity.properties.length > 0 && (
        <section className="entity__elements entity--with-padding">
          {entity.properties.map((prop, indx) => (
            <p key={indx}>{prop.name}</p>
          ))}
        </section>
      )}
      {entity.functions.length > 0 && (
        <section className="entity__elements entity--with-padding">
          {entity.functions.map(
            (func, indx) =>
              func.name && (
                <p key={indx}>
                  {func.visibility === attributeVisibility.public ? "+" : "-"}
                  {func.name}()
                </p>
              ),
          )}
        </section>
      )}
    </div>
  )
})

export default DefaultEntity
