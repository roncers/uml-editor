import { ClassSynec } from "@/classes/classifiers/ClassSynec"
import { EntityFactory } from "./EntityFactory"
import i18next from "i18next"
import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"

export class ClassFactory extends EntityFactory {
  createEntity(position: [number, number] = [0, 0]): ClassSynec {
    const count = EntityFactory.createdEntities.filter((e) => !(e instanceof InterfaceSynec)).length + 1
    const classElement = new ClassSynec(`${i18next.t("class")} ${count}`, position)
    this.addEntity(classElement)
    return classElement
  }
}
