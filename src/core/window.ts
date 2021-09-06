import * as PIXI from "pixi.js";
import { app } from "./main";

export class Window extends PIXI.Container {
	edge: PIXI.Graphics = new PIXI.Graphics();
	titleBar: PIXI.Graphics = new PIXI.Graphics();

	//window property
	winWidth: number;
	winHeight: number;

	winX: number;
	winY: number;

	winColor: number = 0x424242;

	//title property
	titleHeight: number = 20;

	//edge property
	radius: number = 10;
	thickness: number = 3;

	isPointing: boolean;

	createWindow() {
		this.titleBar.interactive = true;
		this.titleBar.buttonMode = true;

		this.titleBar.on("mousedown", (e: PIXI.InteractionEvent) => {
            this.isPointing = true;
		});

		this.titleBar.on("mousemove", (e: PIXI.InteractionEvent) => {
			if (!this.isPointing) return;

			const point = e.data.getLocalPosition(this.titleBar);

			this.x = point.x;
			this.y = point.y;
		});

		this.titleBar.on("mouseup", () => {
			this.isPointing = false;
		});

		this.titleBar.on("mouseout", () => {
			this.isPointing = false;
		});

		this.addChild(this.edge);
		this.addChild(this.titleBar);
	}

	setWindowPivot(w: number, h: number) {
		this.winWidth = w;
		this.winHeight = h;

		this.winX = (app.screen.width - w) * 0.5;
		this.winY = (app.screen.height - h) * 0.5 + this.titleHeight;
	}

	refleshWindow() {
		this.titleBar.x = this.winX;
		this.titleBar.y = this.winY - this.titleHeight;
		this.titleBar
			.beginFill(this.winColor)
			.drawRect(0, 0, this.winWidth, this.titleHeight)
			.endFill();

		this.edge.x = this.titleBar.x - this.thickness;
		this.edge.y = this.titleBar.y - this.thickness;

		this.edge
			.beginFill(this.winColor)
			.drawRoundedRect(
				0,
				0,
				this.winWidth + this.thickness * 2,
				this.winHeight + this.titleHeight + this.thickness * 2,
				this.radius
			)
			.endFill();
	}
}
