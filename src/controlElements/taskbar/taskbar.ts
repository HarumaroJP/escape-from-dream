import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../core/assetLoader'
import { app } from '../../core/main'
import { Renderable } from '../../core/renderable'
import { CustomRoundedShape } from '../../extensions/customRoundedShape'
import { Application } from './application'

export class Taskbar extends PIXI.Container implements Renderable {
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
  Calculator: Application
  applications: Application[] = []

  create(): PIXI.Container {
    this.addChild(this.taskBar)

    this.Searcher = this.createApplication('searcher', AssetLoader.getSprite('search'))
    this.Messenger = this.createApplication('messenger', AssetLoader.getSprite('messenger'))
    this.Calculator = this.createApplication('calculator', AssetLoader.getSprite('calculator'))

    this.reflesh()

    return this
  }

  createApplication(name: string, texture: PIXI.Texture): Application {
    const app = new Application(name, this.appSize, texture)
    this.applications.push(app)
    this.addChild(app)

    return app
  }

  alignApplications() {
    let appCount = 1
    let appHalfSize = this.appSize * 0.5
    this.applications.forEach((app: PIXI.Container) => {
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
      this.applications.length * (this.appSize + this.appSpace) -
      this.appSpace +
      this.appSideSpace * 2

    this.barHeight = this.appSize + this.barHeightOffset

    this.x = (app.screen.width - this.barWidth) * 0.5
    this.y = app.screen.height - (this.barYOffset + this.appSize + this.barHeightOffset)

    this.taskBar
      .beginFill(this.barColor)
      .drawRoundedRect(0, 0, this.barWidth, this.barHeight, this.barRound)
      .endFill()

    this.taskBar.alpha = 0.3

    this.alignApplications()
  }

  onResize(): void {
    this.reflesh()
  }
}
