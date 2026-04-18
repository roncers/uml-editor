import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec"
import { EntityFactory } from "./EntityFactory"
import { getRandomName } from "@/utils/functions/randomName"

export class InterfaceFactory extends EntityFactory {
  createEntity(position: [number, number] = [0, 0]): InterfaceSynec {
    const interfaceElement = new InterfaceSynec(getRandomName(), position)
    this.addEntity(interfaceElement)
    return interfaceElement
  }
}
