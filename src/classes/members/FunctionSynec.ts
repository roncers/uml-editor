import type { FunctionSynec as FunctionSynecInterface } from "../../interfaces/FunctionSynec.interface";
import { attributeVisibility, type AttributeVisibility } from "../../types/interface.types";
import { makeAutoObservable } from "mobx";

export class FunctionSynec implements FunctionSynecInterface {
    name: string;
    visibility: AttributeVisibility;

    constructor(
        name = '',
        visibility: AttributeVisibility = attributeVisibility.public
    ) {
        this.name = name;
        this.visibility = visibility;
        makeAutoObservable(this);
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setVisibility(visibility: AttributeVisibility): void {
        this.visibility = visibility;
    }
}
