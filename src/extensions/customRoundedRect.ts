import * as PIXI from 'pixi.js';
import { MathUtils } from './mathUtils';

export class CustomRoundedRect extends PIXI.Graphics {
  draw(
    r: number, //round
    w: number, //width
    h: number, //height
    c: number, //color
    r1: boolean, //leftTop
    r2: boolean, //rightTop
    r3: boolean, //rightBottom
    r4: boolean //leftBottom
  ) {
    const minPoint = w <= h ? w : h;
    r = MathUtils.clamp(r, 0, minPoint);

    this.beginFill(c);

    this.moveTo(0, r);

    if (r1) {
      this.quadraticCurveTo(0, 0, r, 0);
    } else {
      this.lineTo(0, 0).lineTo(r, 0);
    }

    this.lineTo(w - r, 0);

    if (r2) {
      this.quadraticCurveTo(w, 0, w, r);
    } else {
      this.lineTo(w, 0).lineTo(w, r);
    }

    this.lineTo(w, h - r);

    if (r3) {
      this.quadraticCurveTo(w, h, w - r, h);
    } else {
      this.lineTo(w, h).lineTo(w - r, h);
    }

    this.lineTo(r, h);

    if (r4) {
      this.quadraticCurveTo(0, h, 0, h - r);
    } else {
      this.lineTo(0, h).lineTo(0, h - r);
    }

    this.lineTo(0, r);

    this.endFill();
  }
}
