import * as PIXI from 'pixi.js';
import { app } from '../../core/main';
import { Application } from './application';

export class Taskbar extends PIXI.Container {
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

  Calculator: Application;
  applications: Application[] = [];

  constructor() {
    super();
  }

  create(): PIXI.Container {
    let alphaFilter = new PIXI.filters.AlphaFilter();
    alphaFilter.alpha = 0.5;
    alphaFilter.resolution = window.devicePixelRatio || 1;
    this.taskBar.filters = [alphaFilter];

    this.addChild(this.taskBar);

    this.Calculator = this.createApplication('calculator');
    this.createApplication('calculator');
    this.createApplication('calculator');

    this.reflesh();

    return this;
  }

  createApplication(name: string): Application {
    const app = new Application(name, this.appSize);
    this.applications.push(app);
    this.addChild(app);

    return app;
  }

  alignApplications() {
    let appCount = 1;
    this.applications.forEach((app: PIXI.Container) => {
      //isBarSide
      const space = appCount == 1 ? 0 : this.appSpace;

      app.x += this.appSideSpace + (space + this.appSize) * (appCount - 1);
      app.y += this.barHeightOffset * 0.5;

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
}
