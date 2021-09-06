import * as PIXI from "pixi.js";
import { TextInput } from "pixi-textinput-v5";
import { app } from "../main";
import { Renderable } from "../Renderable";
import { ScrollView } from "./scrollView";
import { Window } from "../window";

export type Target = "me" | "you";

export class ChatDisplay extends Window implements Renderable {
	private cavWidth: number = 400;
	private cavHeight: number = 800;

	private header: PIXI.Graphics = new PIXI.Graphics();
	private navHeight = 90;

	private footer: PIXI.Graphics = new PIXI.Graphics();
	private fHeight = 120;

	private body: PIXI.Graphics = new PIXI.Graphics();

	private iptWidthOffset = 80;
	private iptHeightOffset = 80;

	private sendButton: PIXI.Graphics = new PIXI.Graphics();
	private buttonRadius: number = 20;

	private scrollView: ScrollView = new ScrollView();

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
		super();
		this.reflesh();
	}

	create(): PIXI.Container {
		this.createWindow();

		this.addChild(this.header);
		this.addChild(this.footer);
		this.addChild(this.body);
		this.addChild(this.inputField);
		this.addChild(this.sendButton);
		this.addChild(this.scrollView);

		this.sendButton.on("pointertap", () => {
			this.scrollView.addElement("me", this.inputField.text);
			this.inputField.text = "";
		});

		return this;
	}

	reflesh(): void {
		this.setWindowPivot(this.cavWidth, this.cavHeight);
		this.refleshWindow();

		this.header.x = this.winX;
		this.header.y = this.winY;

		this.header
			.beginFill(0x485a6e)
			.drawRect(0, 0, this.winWidth, this.navHeight)
			.endFill();

		this.footer.x = this.winX;
		this.footer.y = this.winY + this.winHeight - this.fHeight;
		this.footer
			.beginFill(0xf2f2f2)
			.drawRoundedRect(0, 0, this.winWidth, this.fHeight, this.radius)
			.endFill();

		this.inputField.x = this.winX + 10;
		this.inputField.y = this.footer.y + this.iptHeightOffset - 10;

		this.sendButton.interactive = true;
		this.sendButton.buttonMode = true;
		this.sendButton.x =
			this.inputField.x + this.inputField.width + this.buttonRadius + 15;
		this.sendButton.y = this.inputField.y + this.buttonRadius - 1;
		this.sendButton
			.beginFill(0x2c79c7)
			.drawCircle(0, 0, this.buttonRadius)
			.endFill();

		this.body.x = this.winX;
		this.body.y = this.winY + this.navHeight * 0.5;
		this.body
			.beginFill(0x9bcde8)
			.drawRect(
				0,
				0,
				this.winWidth,
				this.winHeight - (this.navHeight + this.fHeight) * 0.5
			)
			.endFill();

		this.scrollView.reflesh(
			this.body.x,
			this.body.y + this.body.height,
			this.body.width
		);
	}

	onresize(): void {
		this.reflesh();
	}
}
