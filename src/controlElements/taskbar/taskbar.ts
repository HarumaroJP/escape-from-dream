import * as PIXI from 'pixi.js';
import { AssetLoader } from '../../core/assetLoader';
import { app } from '../../core/main';
import { Renderable } from '../../core/renderable';
import { Application } from './application';

export class Taskbar extends PIXI.Container implements Renderable {
  barColor: number = 0x2e2e2e;
  taskBar: PIXI.Graphics = new PIXI.Graphics();
  taskBarLeft: PIXI.Graphics = new PIXI.Graphics();
  taskBarRight: PIXI.Graphics = new PIXI.Graphics();

  appSize: number = 55;
  appSpace: number = 40;
  appSideSpace: number = 20;

  barWidth: number;
  barHeight: number;
  barHeightOffset: number = 35;
  barYOffset: number = 20;

  Searcher: Application;
  Messenger: Application;
  Calculator: Application;
  applications: Application[] = [];

  create(): PIXI.Container {
    let alphaFilter = new PIXI.filters.AlphaFilter();
    alphaFilter.alpha = 0.5;
    alphaFilter.resolution = window.devicePixelRatio || 1;
    this.taskBar.filters = [alphaFilter];

    this.addChild(this.taskBar);

    this.Searcher = this.createApplication('searcher', AssetLoader.getSprite('search'));
    this.Messenger = this.createApplication('messenger', AssetLoader.getSprite('messenger'));
    this.Calculator = this.createApplication('calculator', AssetLoader.getSprite('calculator'));

    this.reflesh();

    return this;
  }

  createApplication(name: string, texture: PIXI.Texture): Application {
    const app = new Application(name, texture, this.appSize);
    this.applications.push(app);
    this.addChild(app);

    return app;
  }

  alignApplications() {
    let appCount = 1;
    let appHalfSize = this.appSize * 0.5;
    this.applications.forEach((app: PIXI.Container) => {
      //isBarSide
      const space = appCount == 1 ? 0 : this.appSpace;

      app.x = this.appSideSpace + (space + this.appSize) * (appCount - 1) + appHalfSize;
      app.y = this.barHeightOffset * 0.5 + appHalfSize;

      appCount += 1;
    });
  }

  reflesh() {
    //taskBar
    this.barWidth =
      this.applications.length * (this.appSize + this.appSpace) -
      this.appSpace +
      this.appSideSpace * 2;

    this.barHeight = this.appSize + this.barHeightOffset;

    this.x = (app.screen.width - this.barWidth) * 0.5;
    this.y = app.screen.height - (this.barYOffset + this.appSize + this.barHeightOffset);

    this.taskBar.beginFill(this.barColor).drawRect(0, 0, this.barWidth, this.barHeight).endFill();

    //taskBarSide
    const barSideRadius = this.barHeight * 0.5;

    this.taskBarLeft.beginFill(this.barColor).drawCircle(0, barSideRadius, barSideRadius).endFill();

    this.taskBarRight
      .beginFill(this.barColor)
      .drawCircle(this.barWidth, barSideRadius, barSideRadius)
      .endFill();

    this.taskBar.addChild(this.taskBarLeft);
    this.taskBar.addChild(this.taskBarRight);

    this.alignApplications();
  }
  onResize(): void {
    this.reflesh();
  }
}
