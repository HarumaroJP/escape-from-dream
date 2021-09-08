import * as PIXI from "pixi.js"; // node_modulesから PIXI.jsをインポート
import * as PIXI_SOUND from "pixi-sound"; // node_modulesから PIXI_SOUNDをインポート
import axios from "axios";
import { PlayerLoop } from "./playerLoop";
import { ChatDisplay } from "../controlElements/chat/chatDisplay";
import { Renderable } from "./renderable";
import { Taskbar } from "../controlElements/taskbar/taskbar";

const devVersion: string = "1.1d";

//pixiの初期化処理
export const app = new PIXI.Application({
	resolution: window.devicePixelRatio || 1,
	resizeTo: window,
	antialias: true,
});

//サウンドの初期化
PIXI_SOUND.default.init();

//bodyに追加
document.body.appendChild(app.view);

//canvasのcss
const canvasStyle: CSSStyleDeclaration = app.renderer.view.style;

canvasStyle.position = "relative";
canvasStyle.width = "100%";
canvasStyle.height = "100%";
canvasStyle.display = "block";
document.body.style.margin = "0";

app.renderer.backgroundColor = 0x5ab7e8;

const renderables: Renderable[] = [];

//画面リサイズ時にレンダラーもリサイズ
window.onresize = () => resize();

const playerLoop = new PlayerLoop(app);

let chatDisplay: ChatDisplay;
let taskBar: Taskbar;

const createGameScene = () => {
	playerLoop.removeAllScene();
	playerLoop.removeAllGameLoops();

	const gameScene = new PIXI.Container();
	app.stage.addChild(gameScene);

	chatDisplay = new ChatDisplay();
	gameScene.addChild(chatDisplay.create());

	taskBar = new Taskbar();
	gameScene.addChild(taskBar.create());

	renderables.push(chatDisplay);

	animate();
};

const resize = () => {
	console.log("resize");
	app.renderer.resize(window.innerWidth, window.innerHeight);
	renderables.forEach((r) => r.onresize());
};

function animate() {
	requestAnimationFrame(animate);

	// render the stage
	app.render();
}

// preload
PIXI.Loader.shared.load(async (loader, resources) => {
	console.log(
		"PIXI loaded. \n\n-- Project N 僕らの予知夢からの脱出 -- \ndevVersion : " +
			devVersion
	);

	// 起動時にスプレットシートからgetする
	try {
		const res = await axios.get(
			"https://script.google.com/macros/s/AKfycbyQVt4nKc3ZZLpV5HDkZjHEWbbwwCWD4QQXFs3CeHI3IGTqHMNe4liu5AWieyH1A0R1FA/exec"
		);

		console.log(res.data);
		createGameScene();
	} catch (error) {
		console.log(error);
		
		const { status, statusText } = error.response;
		console.log(`通信に失敗しました！ ${status} : ${statusText}`);
	}
});
