import type { Position as PositionInterface } from "@/interfaces/Position.interface";
import { makeAutoObservable } from "mobx";

export class Position implements PositionInterface {
    x: number;
    y: number;

    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        makeAutoObservable(this);
    }

    public setPosition(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }
}