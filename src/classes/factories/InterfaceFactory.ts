import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"
import { EntityFactory } from "./EntityFactory"
import i18next from "i18next"

export class InterfaceFactory extends EntityFactory {
  createEntity(position: [number, number] = [0, 0]): InterfaceSynec {
    const count = EntityFactory.createdEntities.filter((e) => e instanceof InterfaceSynec).length + 1
    const interfaceElement = new InterfaceSynec(`${i18next.t("interface")} ${count}`, position)
    this.addEntity(interfaceElement)
    return interfaceElement
  }
}
