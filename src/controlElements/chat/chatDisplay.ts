import * as PIXI from 'pixi.js';
import { Renderable } from '../../core/renderable';
import { Window } from '../../core/window';
import { ScrollView } from './scrollView';
import { CustomRoundedRect } from '../../extensions/customRoundedRect';

export type Target = 'me' | 'you';

export class ChatDisplay extends Window implements Renderable {
  private cavWidth: number = 800;
  private cavHeight: number = 400;

  private header: PIXI.Graphics = new PIXI.Graphics();
  private navHeight = 45;

  private footer: CustomRoundedRect = new CustomRoundedRect();
  private fHeight = 60;

  private body: PIXI.Graphics = new PIXI.Graphics();
  private sendButton: PIXI.Graphics = new PIXI.Graphics();
  private buttonRadius: number = 20;

  private scrollView: ScrollView = new ScrollView();

  constructor() {
    super();
    this.reflesh();
  }

  create(): PIXI.Container {
    this.createWindow();

    this.addChild(this.header);
    this.addChild(this.footer);
    this.addChild(this.body);
    this.addChild(this.scrollView);

    return this;
  }

  reflesh(): void {
    this.setWindowPivot(this.cavWidth, this.cavHeight);
    this.refleshWindow();

    this.header.x = this.winX;
    this.header.y = this.winY;

    this.header.beginFill(0x485a6e).drawRect(0, 0, this.winWidth, this.navHeight).endFill();

    this.body.x = this.winX;
    this.body.y = this.winY + this.navHeight;
    this.body.beginFill(0x9bcde8).drawRect(0, 0, this.winWidth, this.winHeight).endFill();

    this.footer.x = this.winX;
    this.footer.y = this.body.y + this.winHeight;
    this.footer.draw(this.round, this.winWidth, this.fHeight, 0xf2f2f2, false, false, true, true);

    this.sendButton.interactive = true;
    this.sendButton.buttonMode = true;
    this.sendButton.x = this.winWidth - this.buttonRadius * 2;
    this.sendButton.y = this.fHeight * 0.5;
    this.sendButton.beginFill(0x2c79c7).drawCircle(0, 0, this.buttonRadius).endFill();
    this.sendButton.on('pointerdown', () => this.scrollView.addElement('me', ''));
    this.footer.addChild(this.sendButton);

    this.scrollView.reflesh(this.body.x, this.body.y + this.body.height, this.body.width);
  }

  onResize(): void {
    this.reflesh();
  }
}
