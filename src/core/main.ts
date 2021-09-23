import * as PIXI from 'pixi.js' // node_modulesから PIXI.jsをインポート
import { PlayerLoop } from './playerLoop'
import { Renderable } from './renderable'
import { Taskbar } from '../controlElements/taskbar/taskbar'
import { TimeBar } from '../controlElements/timeBar/timeBar'
import { AssetLoader } from './assetLoader'
import { gsap } from 'gsap'
import PixiPlugin from 'gsap/PixiPlugin'
import WebFont from 'webfontloader'
import { TitlePanel } from '../controlElements/title/titlePanel'

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

export let gameScene: PIXI.Container
export let winZIndex: number = 0

let titlePanel: TitlePanel
let taskBar: Taskbar
let timeBar: TimeBar

const createGameScene = () => {
  playerLoop.removeAllScene()
  playerLoop.removeAllGameLoops()

  gameScene = new PIXI.Container()
  app.stage.addChild(gameScene)

  titlePanel = new TitlePanel()
  gameScene.addChild(titlePanel)
  renderables.push(titlePanel)

  titlePanel.onStart = () => {
    taskBar = new Taskbar()
    timeBar = new TimeBar()

    //titlePanelだけだからpopで対応
    renderables.pop()

    addGameScene(taskBar.create())
    addGameScene(timeBar.create())

    gameScene.removeChild(titlePanel)
  }

  animate()
}

export const frontContainer = (container: PIXI.Container) => {
  winZIndex++
  container.zIndex = winZIndex

  gameScene.children.sort((itemA, itemB) => itemA.zIndex - itemB.zIndex)
}

export const backContainer = (container: PIXI.Container) => {
  container.zIndex = -10

  gameScene.children.sort((itemA, itemB) => itemA.zIndex - itemB.zIndex)
}

export const addGameScene = (window: PIXI.Container & Renderable) => {
  gameScene.addChild(window)
  renderables.push(window)
}

export const removeGameScene = (window: PIXI.Container & Renderable) => {
  gameScene.removeChild(window)
  const idx = renderables.findIndex((elem) => elem == window)
  renderables.splice(idx, 1)
}

const resize = () => {
  console.log('resize')
  app.renderer.resize(window.innerWidth, window.innerHeight)
  renderables.forEach((r) => {
    if (r != undefined) {
      r.onResize()
    }
  })
}

function animate() {
  requestAnimationFrame(animate)

  // render the stage
  app.render()
}

gsap.registerPlugin(PixiPlugin)
PixiPlugin.registerPIXI(PIXI)

WebFont.load({
  google: {
    families: ['Inter'],
  },
  custom: {
    families: ['hirakaku'],
    urls: ['css/localfont.css'],
  },
  active: () => {
    loader.load(createGameScene)
  },
})
