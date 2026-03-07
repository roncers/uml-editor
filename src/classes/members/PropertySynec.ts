import type { PropertySynec as PropertySynecInterface } from "../../interfaces/PropertySynec.interface";
import { attributeType, attributeVisibility, type AttributeType, type AttributeVisibility } from "../../types/interface.types";
import { makeAutoObservable } from "mobx";

export class PropertySynec implements PropertySynecInterface {
    name: string;
    type: AttributeType;
    visibility: AttributeVisibility;

    constructor(
        name = '',
        type: AttributeType = attributeType.string,
        visibility: AttributeVisibility = attributeVisibility.public
    ) {
        this.name = name;
        this.type = type;
        this.visibility = visibility;
        makeAutoObservable(this);
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setType(type: AttributeType): void {
        this.type = type;
    }

    public setVisibility(visibility: AttributeVisibility): void {
        this.visibility = visibility;
    }
}
