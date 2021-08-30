import * as PIXI from "pixi.js"; // node_modulesから PIXI.jsをインポート
import * as PIXI_SOUND from "pixi-sound"; // node_modulesから PIXI_SOUNDをインポート
import { PlayerLoop } from "./playerLoop";
import { ChatDisplay } from "./chatDisplay";

//pixiの初期化処理
PIXI_SOUND.default.init();
export const app = new PIXI.Application({
  resolution: window.devicePixelRatio || 1,
  resizeTo: window,
  antialias: true,
});

//bodyに追加
document.body.appendChild(app.view);

//canvasのcss
const canvasStyle: CSSStyleDeclaration = app.renderer.view.style;

canvasStyle.position = "relative";
canvasStyle.width = "100%";
canvasStyle.height = "100%";
canvasStyle.display = "block";
document.body.style.margin = "0";

app.renderer.backgroundColor = 0xaed6f1;

const playerLoop = new PlayerLoop(app);

const createGameScene = () => {
  playerLoop.removeAllScene();
  playerLoop.removeAllGameLoops();

  const gameScene = new PIXI.Container();
  app.stage.addChild(gameScene);

  const chatDisplay = new ChatDisplay();
  gameScene.addChild(chatDisplay.create());
};

// preload
PIXI.Loader.shared.load((loader, resources) => {
  // 起動直後はゲームシーンを追加する
  createGameScene();
});
