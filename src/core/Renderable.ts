import * as PIXI from "pixi.js";

export interface Renderable {
  addChild(stage: PIXI.Container): void;
}
