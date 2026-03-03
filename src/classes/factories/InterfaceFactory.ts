import { InterfaceSynec } from "@/classes/InterfaceSynec";
import { EntityFactory } from "./EntityFactory";

export class InterfaceFactory extends EntityFactory {
    createEntity(): InterfaceSynec {
        return new InterfaceSynec();
    }
}