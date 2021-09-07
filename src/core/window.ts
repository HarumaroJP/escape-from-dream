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
		this.toDraggable(this.titleBar, this);

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

	toDraggable(draggable: PIXI.Container, movable: PIXI.Container) {
		draggable.interactive = true;
		draggable.buttonMode = true;
		movable.interactive = true;

		let isDraggable: boolean;
		let data: PIXI.InteractionData;
		let dragPoint: PIXI.Point;
		let lastDragPoint: PIXI.Point;

		draggable
			.on("pointerdown", (e: PIXI.InteractionEvent) => {
				data = e.data;
				lastDragPoint = data.getLocalPosition(movable.parent);
				isDraggable = true;
			})
			.on("pointermove", () => {
				if (!isDraggable) return;

				dragPoint = data.getLocalPosition(movable.parent);
				movable.transform.position.x += dragPoint.x - lastDragPoint.x;
				movable.transform.position.y += dragPoint.y - lastDragPoint.y;
				lastDragPoint = data.getLocalPosition(movable.parent);
			})
			.on("pointerup", () => {
				data = null;
				isDraggable = false;
			});
	}
}
