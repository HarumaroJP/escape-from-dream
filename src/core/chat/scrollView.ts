import * as PIXI from "pixi.js";
import { Target } from "./chatDisplay";
import { ChatElement } from "./chatElement";

export class ScrollView {
  view: PIXI.Graphics = new PIXI.Graphics();
  elements: ChatElement[] = [];
  private elemCount: number = 0;

  reflesh(x: number, y: number, w: number) {
    this.view.x = x;
    this.view.y = y;
    this.view.width = w;

    this.view.interactive = true; // <-- required
    this.view.on("scroll", (ev) => {
      this.view.y -= ev.wheelDelta;
    });

    this.refleshElements();
  }

  refleshElements() {
    let count = 0;
    this.elements.forEach((e) => {
      e.reflesh(count);
      this.view.y -= e.elemHeight;
      count += 1;
    });
  }

  addElement(target: Target,str: string) {
    const element = new ChatElement(target, str, this.elemCount);

    this.elemCount += 1;
    this.view.y -= element.elemHeight;
    this.elements.push(element);
    this.view.addChild(element);

    this.view.drawRect(0, 0, this.view.width, this.view.height);
  }
}
