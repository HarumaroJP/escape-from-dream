import * as PIXI from 'pixi.js';
import { app } from '../../core/main';
import { Renderable } from '../../core/renderable';

export class TimeBar extends PIXI.Container implements Renderable {
  timeBar: PIXI.Graphics = new PIXI.Graphics();
  timeBarLeft: PIXI.Graphics = new PIXI.Graphics();
  timeBarRight: PIXI.Graphics = new PIXI.Graphics();

  textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fill: '#f0f0f0',
    fontSize: 30,
  });
  timeText: PIXI.Text = new PIXI.Text('0000/00/00 00:00:00', this.textStyle);

  barWidth: number = 300;
  barHeight: number = 80;
  barColor: number = 0x2e2e2e;

  edgeOffset: number = 20;

  create(): PIXI.Container {
    let alphaFilter = new PIXI.filters.AlphaFilter();
    alphaFilter.alpha = 0.5;
    alphaFilter.resolution = window.devicePixelRatio || 1;
    this.timeBar.filters = [alphaFilter];

    this.addChild(this.timeBar);
    this.addChild(this.timeText);

    this.setTimer();

    this.reflesh();

    return this;
  }

  setTimer() {
    window.setInterval(() => {
      const now = new Date();

      // "YYYY/MM/DD HH:MM:SS"の形式にフォーマット
      // 可読性無視で
      const text = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(
        now.getDate()
      ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
        now.getMinutes()
      ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      this.timeText.text = text;
    }, 1000);
  }

  reflesh() {
    const barSideRadius = this.barHeight * 0.5;

    this.x = app.screen.width - this.barWidth - barSideRadius - this.edgeOffset;
    this.y = app.screen.height - this.barHeight - this.edgeOffset;

    this.timeBar.beginFill(this.barColor).drawRect(0, 0, this.barWidth, this.barHeight).endFill();

    this.timeBarLeft.beginFill(this.barColor).drawCircle(0, barSideRadius, barSideRadius).endFill();

    this.timeBarRight
      .beginFill(this.barColor)
      .drawCircle(this.barWidth, barSideRadius, barSideRadius)
      .endFill();

    this.timeBar.addChild(this.timeBarRight);
    this.timeBar.addChild(this.timeBarLeft);

    this.timeText.x = (this.barWidth - this.timeText.width) * 0.5;
    this.timeText.y = (this.barHeight - this.timeText.height) * 0.5;
  }

  copyThis: TimeBar = this;

  onResize(): void {
    this.reflesh();
  }
}
