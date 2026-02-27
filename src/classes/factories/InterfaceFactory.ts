import { InterfaceSynec } from "@/classes/InterfaceSynec";
import { EntityFactory } from "./EntityFactory";

export class InterfaceFactory extends EntityFactory {
    createEntity(): InterfaceSynec {
        const interfaceElement = new InterfaceSynec();
        this.addEntity(interfaceElement);
        return interfaceElement;
    }
}