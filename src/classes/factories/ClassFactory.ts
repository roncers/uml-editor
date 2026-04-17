import { ClassSynec } from "@/classes/classifiers/ClassSynec"
import { EntityFactory } from "./EntityFactory"
import { getRandomName } from "@/utils/functions/randomName"

export class ClassFactory extends EntityFactory {
  createEntity(position: [number, number] = [0, 0]): ClassSynec {
    const classElement = new ClassSynec(getRandomName(), position)
    this.addEntity(classElement)
    return classElement
  }
}
