import * as PIXI from "pixi.js";
import { Target } from "./chatDisplay";
import { ChatElement } from "./chatElement";

export class ScrollView extends PIXI.Graphics {
  elements: ChatElement[] = [];
  private elemCount: number = 0;

  reflesh(x: number, y: number, w: number) {
    this.x = x;
    this.y = y;
    this.width = w;

    this.interactive = true; // <-- required
    this.on("scroll", (ev) => {
      this.y -= ev.wheelDelta;
    });

    this.refleshElements();
  }

  refleshElements() {
    let count = 0;
    this.elements.forEach((e) => {
      e.reflesh(count);
      this.y -= e.elemHeight;
      count += 1;
    });
  }

  addElement(target: Target,str: string) {
    const element = new ChatElement(target, str, this.elemCount);

    this.elemCount += 1;
    this.y -= element.elemHeight;
    this.elements.push(element);
    this.addChild(element);

    this.drawRect(0, 0, this.width, this.height);
  }
}
