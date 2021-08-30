import * as PIXI from "pixi.js";
import { app } from "./main";
import { Renderable } from "./Renderable";

export class ChatDisplay implements Renderable {
  private container: PIXI.Container = new PIXI.Container();
  private canvas: PIXI.Graphics = new PIXI.Graphics();
  private width: number = 400;
  private height: number = 800;
  private radius: number = 10;

  constructor() {
    this.reflesh();
  }

  reflesh(): void {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.x = app.screen.width / 2 - this.width / 2;
    this.canvas.y = app.screen.height / 2 - this.height / 2;

    this.canvas
      .beginFill(0xffffff)
      .drawRoundedRect(0, 0, this.width, this.height, this.radius)
      .endFill();
  }

  create(): PIXI.Container {
    return this.container.addChild(this.canvas);
  }

  onresize(): void {
    this.reflesh();
  }
}
