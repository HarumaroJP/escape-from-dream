import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../core/assetLoader'
import { addGameScene, app, gameScene } from '../../core/main'
import { Renderable } from '../../core/renderable'
import { Window } from '../../core/window'
import { LIMEDisplay } from '../applications/chat/limeDisplay'
import { YochimuDisplay } from '../applications/yochimu/yochimuDisplay'
import { Application } from './application'

export class Taskbar extends PIXI.Container implements Renderable {
  winZIndex: number = 0
  barColor: number = 0xf1f1f1
  taskBar: PIXI.Graphics = new PIXI.Graphics()

  appSize: number = 55
  appSpace: number = 40
  appSideSpace: number = 50

  barWidth: number
  barHeight: number
  barRound: number = 20
  barHeightOffset: number = 35
  barYOffset: number = 20

  Searcher: Application
  Messenger: Application
  Yochimu: Application
  static applications: Application[] = []

  create(): Taskbar {
    this.addChild(this.taskBar)

    const lime = new LIMEDisplay().create()
    const yochimu = new YochimuDisplay().create()

    addGameScene(lime)
    addGameScene(yochimu)

    this.Searcher = this.createApplication('searcher', AssetLoader.getSprite('search'), undefined)
    this.Messenger = this.createApplication('messenger', AssetLoader.getSprite('messenger'), lime)
    this.Yochimu = this.createApplication('yochimu', AssetLoader.getSprite('yochimu_icon'), yochimu)

    this.reflesh()

    return this
  }

  createApplication(name: string, icon: PIXI.Texture, window: Window): Application {
    const app = new Application(name, this.appSize, icon, window)
    Taskbar.applications.push(app)
    this.addChild(app)

    if (app.window != undefined) {
      app.window.on('pointerdown', () => {
        console.log('pointerdown')

        this.winZIndex++
        app.window.zIndex = this.winZIndex
        this.sortWindows()
      })
    }

    return app
  }

  sortWindows() {
    gameScene.children.sort((itemA, itemB) => itemA.zIndex - itemB.zIndex)
  }

  alignApplications() {
    let appCount = 1
    let appHalfSize = this.appSize * 0.5
    Taskbar.applications.forEach((app: PIXI.Container) => {
      //isBarSide
      const space = appCount == 1 ? 0 : this.appSpace

      app.x = this.appSideSpace + (space + this.appSize) * (appCount - 1) + appHalfSize
      app.y = this.barHeightOffset * 0.5 + appHalfSize

      appCount += 1
    })
  }

  reflesh() {
    //taskBar
    this.barWidth =
      Taskbar.applications.length * (this.appSize + this.appSpace) -
      this.appSpace +
      this.appSideSpace * 2

    this.barHeight = this.appSize + this.barHeightOffset

    this.x = (app.screen.width - this.barWidth) * 0.5
    this.y = app.screen.height - (this.barYOffset + this.appSize + this.barHeightOffset)

    this.taskBar
      .beginFill(this.barColor)
      .drawRoundedRect(0, 0, this.barWidth, this.barHeight, this.barRound)
      .endFill()

    this.alignApplications()
    this.taskBar.alpha = 0.3
  }

  onResize(): void {
    this.reflesh()
  }
}
