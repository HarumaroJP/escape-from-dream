import * as PIXI from "pixi.js";
import { TextInput } from "pixi-textinput-v5";
import { app } from "./main";
import { Renderable } from "./Renderable";

export class ChatDisplay implements Renderable {
  private container: PIXI.Container = new PIXI.Container();

  private cavWidth: number = 400;
  private cavHeight: number = 800;
  private cavRadius: number = 30;

  private header: PIXI.Graphics = new PIXI.Graphics();
  private navHeight = 110;

  private footer: PIXI.Graphics = new PIXI.Graphics();
  private fHeight = 120;

  private body: PIXI.Graphics = new PIXI.Graphics();

  private edge: PIXI.Graphics = new PIXI.Graphics();
  private thickness = 3;

  private iptWidthOffset = 80;
  private iptHeightOffset = 80;

  private inputField = new TextInput({
    input: {
      fontSize: "13pt",
      padding: "14px",
      width: this.cavWidth - this.iptWidthOffset + "px",
      height: this.fHeight - this.iptHeightOffset + "px",
      color: "#26272E",
    },
    box: {
      default: {
        fill: 0xdfe0eb,
        rounded: 100,
      },
      focused: {
        fill: 0xdadbe6,
        rounded: 100,
      },
      disabled: { fill: 0xdbdbdb, rounded: 100 },
    },
  });

  constructor() {
    this.reflesh();
  }

  reflesh(): void {
    const canvasX = app.screen.width / 2 - this.cavWidth / 2;
    const canvasY = app.screen.height / 2 - this.cavHeight / 2;

    this.header.x = canvasX;
    this.header.y = canvasY;

    this.header
      .beginFill(0x485a6e)
      .drawRoundedRect(0, 0, this.cavWidth, this.navHeight, this.cavRadius)
      .endFill();

    this.footer.x = canvasX;
    this.footer.y = app.screen.height / 2 + this.cavHeight / 2 - this.fHeight;
    this.footer
      .beginFill(0xf2f2f2)
      .drawRoundedRect(0, 0, this.cavWidth, this.fHeight, this.cavRadius)
      .endFill();

    this.inputField.x = canvasX + 10;
    this.inputField.y = this.footer.y + this.iptHeightOffset - 10;

    this.body.x = canvasX;
    this.body.y = canvasY + this.navHeight / 2;
    this.body
      .beginFill(0x9bcde8)
      .drawRect(
        0,
        0,
        this.cavWidth,
        this.cavHeight - this.navHeight / 2 - this.fHeight / 2
      )
      .endFill();

    this.edge.x = canvasX - this.thickness;
    this.edge.y = canvasY - this.thickness;
    this.edge
      .beginFill(0x424242)
      .drawRoundedRect(
        0,
        0,
        this.cavWidth + this.thickness * 2,
        this.cavHeight + this.thickness * 2,
        this.cavRadius
      )
      .endFill();
  }

  create(): PIXI.Container {
    this.container.addChild(this.edge);
    this.container.addChild(this.header);
    this.container.addChild(this.footer);
    this.container.addChild(this.body);
    this.container.addChild(this.inputField);

    return this.container;
  }

  onresize(): void {
    this.reflesh();
  }
}
