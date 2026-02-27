import { ClassSynec } from "@/classes/ClassSynec";
import { EntityFactory } from "./EntityFactory";

export class ClassFactory extends EntityFactory {
    createEntity(): ClassSynec {
        const classElement = new ClassSynec('TODO: Delete');
        this.addEntity(classElement);
        return classElement;
    }
}