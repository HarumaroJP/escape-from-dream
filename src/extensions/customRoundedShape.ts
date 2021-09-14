import * as PIXI from 'pixi.js';
import { MathUtils } from './mathUtils';

export class CustomRoundedShape extends PIXI.Graphics {
  drawCustomRect(
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

  drawCustomCapusle(
    w: number, //width
    h: number, //height
    c: number, //color
    rl: boolean, //left
    rr: boolean //right
  ) {
    const halfH = h / 2;
    // r = MathUtils.clamp(r, 0, halfHeight);

    this.beginFill(c);

    this.moveTo(halfH, 0);

    if (rr) {
      this.lineTo(w - halfH, 0)
        .arcTo(w, 0, w, halfH, halfH)
        .arcTo(w, h, w - halfH, h, halfH);
    } else {
      this.lineTo(w, 0).lineTo(w, h);
    }

    if (rl) {
      this.lineTo(halfH, h).arcTo(0, h, 0, halfH, halfH).arcTo(0, 0, halfH, 0, halfH);
    } else {
      this.lineTo(0, h).lineTo(0, 0).lineTo(halfH, 0);
    }

    this.endFill();
  }
}
