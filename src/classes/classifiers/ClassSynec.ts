import type { ClassSynec as ClassSynecInterface } from "../../interfaces/classes/ClassSynec.interface";
import type { PropertySynec } from "../../interfaces/PropertySynec.interface";
import type { FunctionSynec } from "../../interfaces/FunctionSynec.interface";
import type { RelationshipSynec } from "../../interfaces/RelationshipSynec.interface";
import { makeObservable, runInAction, action } from "mobx";
import { type ClassStateType, ClassStateEnum } from "@/types/entity.types";

export class ClassSynec implements ClassSynecInterface {
    id: string;
    name: string;
    properties: PropertySynec[];
    functions: FunctionSynec[];
    relationships: RelationshipSynec[];
    state: ClassStateType;
    isToggling: boolean;

    constructor(name = '', properties = [], functions = [], relationships = []) {
        this.id = self.crypto.randomUUID();
        this.name = name;
        this.properties = properties;
        this.functions = functions;
        this.relationships = relationships;
        this.state = ClassStateEnum.default;
        this.isToggling = false;
        makeObservable(this, {
            name: true,
            properties: true,
            functions: true,
            relationships: true,
            state: true,
            isToggling: true,
            setName: action,
            setProperties: action,
            setFunctions: action,
            addFunction: action,
            addRelationship: action,
            setRelationships: action,
            setRelationshipDestiny: action,
            addProperty: action,
            toggleEditionWithLock: action,
            toggleEdition: action
        });
    }

    public setName(name: string): void {
        this.name = name;
    }

    public setProperties(properties: PropertySynec[]): void {
        this.properties = properties;
    }

    public setFunctions(functions: FunctionSynec[]): void {
        this.functions = functions;
    }

    public setRelationships(relationships: RelationshipSynec[]): void {
        this.relationships = relationships;
    }

    public addProperty(property: PropertySynec): void {
        this.properties.push(property);
    }

    public addFunction(function_: FunctionSynec): void {
        this.functions.push(function_);
    }

    public addRelationship(relationship: RelationshipSynec): void {
        this.relationships.push(relationship);
    }

    public toggleEdition(): void {
        this.state = this.state === ClassStateEnum.editing
            ? ClassStateEnum.default
            : ClassStateEnum.editing;
    }

    public toggleEditionWithLock(lockMs = 150): void {
        if (this.isToggling) return;
        this.isToggling = true;
        this.toggleEdition();

        setTimeout(() => {
            runInAction(() => {
                this.isToggling = false;
            });
        }, lockMs);
    }

    public toggleSelection(): void {
        this.state = this.state === ClassStateEnum.selected
            ? ClassStateEnum.default
            : ClassStateEnum.selected;
    }

    public setRelationshipDestiny(entityId: string): void {
        const lastRelationship = this.relationships[this.relationships.length - 1];
        if (lastRelationship) {
            lastRelationship.destination = entityId;
        }
    }
}
