import * as PIXI from "pixi.js";

export class Application extends PIXI.Graphics {
	appName: string = "noname";

	spriteSize: number;

	constructor(appName: string, appSize: number) {
		super();
		this.appName = appName;
        this.spriteSize = appSize;

        this.reflesh();
	}

    reflesh() {
        this.width = this.spriteSize;
        this.height = this.spriteSize;

		this.beginFill(0xffffff)
			.drawRect(0, 0, this.spriteSize, this.spriteSize)
            .endFill();
	}
}
