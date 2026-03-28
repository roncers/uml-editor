import { InterfaceSynec } from "@/classes/classifiers/InterfaceSynec";
import { EntityFactory } from "./EntityFactory";

export class InterfaceFactory extends EntityFactory {
    createEntity(): InterfaceSynec {
        const interfaceElement = new InterfaceSynec(`Interface ${EntityFactory.createdEntities.length}`);
        this.addEntity(interfaceElement);
        return interfaceElement;
    }
}