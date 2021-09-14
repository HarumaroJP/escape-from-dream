import * as PIXI from 'pixi.js' // node_modulesから PIXI.jsをインポート
import { PlayerLoop } from './playerLoop'
import { ChatDisplay } from '../controlElements/chat/chatDisplay'
import { Renderable } from './renderable'
import { Taskbar } from '../controlElements/taskbar/taskbar'
import { TimeBar } from '../controlElements/timeBar/timeBar'
import { AssetLoader } from './assetLoader'
import WebFont from 'webfontloader'

export const devVersion: string = '1.1d'

//pixiの初期化処理
export const app = new PIXI.Application({
  resolution: window.devicePixelRatio || 1,
  resizeTo: window,
  antialias: true,
})

document.body.appendChild(app.view)

export const loader = new AssetLoader()

//canvasのcss
const canvasStyle: CSSStyleDeclaration = app.renderer.view.style

canvasStyle.position = 'relative'
canvasStyle.width = '100%'
canvasStyle.height = '100%'
canvasStyle.display = 'block'
document.body.style.margin = '0'

app.renderer.backgroundColor = 0x036372

const renderables: Renderable[] = []

//画面リサイズ時にレンダラーもリサイズ
window.onresize = () => resize()

const playerLoop = new PlayerLoop(app)

let chatDisplay: ChatDisplay
let taskBar: Taskbar
let timeBar: TimeBar

const createGameScene = () => {
  playerLoop.removeAllScene()
  playerLoop.removeAllGameLoops()

  const gameScene = new PIXI.Container()
  app.stage.addChild(gameScene)

  chatDisplay = new ChatDisplay()
  gameScene.addChild(chatDisplay.create())

  taskBar = new Taskbar()
  gameScene.addChild(taskBar.create())

  timeBar = new TimeBar()
  gameScene.addChild(timeBar.create())

  renderables.push(chatDisplay)
  renderables.push(taskBar)
  renderables.push(timeBar)

  animate()
}

const resize = () => {
  console.log('resize')
  app.renderer.resize(window.innerWidth, window.innerHeight)
  renderables.forEach((r) => r.onResize())
}

function animate() {
  requestAnimationFrame(animate)

  // render the stage
  app.render()
}

WebFont.load({
  google: {
    families: ['Inter'],
  },
  active: () => {
    loader.load(createGameScene)
  },
})
