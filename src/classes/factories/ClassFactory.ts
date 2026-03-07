import { ClassSynec } from "@/classes/classifiers/ClassSynec";
import { EntityFactory } from "./EntityFactory";

export class ClassFactory extends EntityFactory {
    createEntity(): ClassSynec {
        const classElement = new ClassSynec(`Entity ${EntityFactory.createdEntities.length}`);
        this.addEntity(classElement);
        return classElement;
    }
}