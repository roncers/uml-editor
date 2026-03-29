import type { UMLClassProps } from "../../Entity.types"
import { observer } from "mobx-react-lite"
import { attributeVisibility } from "@/types/interface.types"
import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"
import "./DefaultEntity.scss"

const DefaultEntity = observer(({ entity }: UMLClassProps) => {
  return (
    <div className="entity__content">
      {entity instanceof InterfaceSynec && (
        <h3 className="entity__subtitle">&lt;&lt;Interface&gt;&gt;</h3>
      )}
      <h3 className="entity__title entity--with-padding">{entity.name}</h3>
      {entity.properties.length > 0 &&
        entity.properties.some((prop) => prop.name) && (
          <section className="entity__elements entity--with-padding">
            {entity.properties.map(
              (prop, indx) =>
                prop.name && (
                  <p key={indx}>
                    {prop.visibility === attributeVisibility.public ? "+" : "-"}
                    {prop.name}
                    {prop.type && `: ${prop.type}`}
                  </p>
                ),
            )}
          </section>
        )}
      {entity.functions.length > 0 &&
        entity.functions.some((func) => func.name) && (
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
