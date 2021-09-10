import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

export class Application extends PIXI.Sprite {
  appName: string = 'noname';

  spriteSize: number;

  constructor(appName: string, texture: PIXI.Texture, appSize: number) {
    super(texture);
    this.appName = appName;
    this.spriteSize = appSize;

    this.interactive = true;
    this.buttonMode = true;

    this.anchor.set(0.5);

    this.setAnimations();

    this.reflesh();
  }

  scaleTween: gsap.core.Tween = gsap.to(this.scale, {
    duration: 0.2,
    x: 0.13,
    y: 0.13,
    paused: true,
  });

  setAnimations() {
    this.on('pointerover', this.onMouseEnter).on('pointerout', this.onMouseExit);
  }

  onMouseEnter() {
    this.scaleTween.play();
  }

  onMouseExit() {
    this.scaleTween.reverse();
  }

  reflesh() {
    this.width = this.spriteSize;
    this.height = this.spriteSize;
  }
}
