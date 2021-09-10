import * as PIXI from 'pixi.js';
import { CustomRoundedRect } from '../extensions/customRoundedRect';
import { app } from './main';

export class Window extends PIXI.Container {
  // edge: PIXI.Graphics = new PIXI.Graphics();
  titleBar: CustomRoundedRect = new CustomRoundedRect();

  //window property
  winWidth: number;
  winHeight: number;

  winX: number;
  winY: number;

  winColor: number = 0x2b2b2b;

  //title property
  titleHeight: number = 50;
  roundOffset: number = 20;

  //edge property
  round: number = 10;
  thickness: number = 3;

  isPointing: boolean;

  createWindow() {
    this.toDraggable(this.titleBar, this);

    // this.addChild(this.edge);
    this.addChild(this.titleBar);
  }

  setWindowPivot(w: number, h: number) {
    this.winWidth = w;
    this.winHeight = h;

    this.winX = (app.screen.width - w) * 0.5;
    this.winY = (app.screen.height - h) * 0.5 + this.titleHeight - this.roundOffset;
  }

  refleshWindow() {
    this.titleBar.x = this.winX;
    this.titleBar.y = this.winY - this.titleHeight;
    this.titleBar.draw(
      this.round,
      this.winWidth,
      this.titleHeight,
      this.winColor,
      true,
      true,
      false,
      false
    );
    // this.edge.x = this.titleBar.x - this.thickness;
    // this.edge.y = this.titleBar.y - this.thickness;

    // this.edge
    //   .beginFill(this.winColor)
    //   .drawRoundedRect(
    //     0,
    //     0,
    //     this.winWidth + this.thickness * 2,
    //     this.winHeight + this.titleHeight + this.thickness * 2,
    //     this.radius
    //   )
    //   .endFill();
  }

  toDraggable(draggable: PIXI.Container, movable: PIXI.Container) {
    draggable.interactive = true;
    draggable.buttonMode = true;
    movable.interactive = true;

    let isDraggable: boolean;
    let data: PIXI.InteractionData;
    let dragPoint: PIXI.Point;

    let pointOffset: PIXI.Point;

    draggable
      .on('pointerdown', (e: PIXI.InteractionEvent) => {
        data = e.data;
        pointOffset = data.getLocalPosition(draggable);
        isDraggable = true;
      })
      .on('pointermove', () => {
        if (!isDraggable) return;

        dragPoint = data.getLocalPosition(movable.parent);
        movable.x = dragPoint.x - this.winX - pointOffset.x;
        movable.y = dragPoint.y - this.winY - pointOffset.y + this.titleHeight;
      })
      .on('pointerup', () => {
        data = null;
        isDraggable = false;
      });
  }
}
