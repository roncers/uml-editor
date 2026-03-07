import type { ClassStateType } from "@/types/entity.types";
import { ClassStateEnum as states } from "@/types/entity.types";
export class ClassState {
    private state: ClassStateType;

    constructor() {
        this.state = states.default;
    }

    getState() {
        return this.state;
    }

    toggleEdition() {
        if (this.state === states.editing) {
            this.toggleToDefault()
        } else {
            this.toggleToEdition()
        }
    }

    toggleSelection() {
        if (this.state === states.selected) {
            this.toggleToDefault()
        } else {
            this.toggleToSelected()
        }
    }

    toggleToEdition() {
        this.state = states.editing;
    }

    toggleToDefault() {
        this.state = states.default;
    }

    toggleToSelected() {
        this.state = states.selected;
    }
}