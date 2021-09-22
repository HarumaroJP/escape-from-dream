import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../../core/assetLoader'
import { Window } from '../../../core/window'
import { CustomRoundedShape } from '../../../extensions/customRoundedShape'
import { PIXIUtils } from '../../../extensions/utils'
import { YochimuScrollView } from './yochimuScrollView'

export class YochimuDisplay extends Window {
  backGround: PIXI.Sprite
  maxBackgroundHeight: number = 800
  scrollView: YochimuScrollView = new YochimuScrollView()
  backGroundColor: number = 0xffffff

  cavWidth: number = 300
  cavHeight: number = 600
  bodyWidthOffset: number = 30

  constructor() {
    super('予知夢フォルダー')
  }

  create(): Window {
    this.backGround = new PIXI.Sprite(AssetLoader.getSprite('yochimu_Background'))
    PIXIUtils.resizeSpriteByHeight(this.backGround, this.maxBackgroundHeight)

    this.addChild(this.backGround)
    this.addChild(this.scrollView.create())
    this.createWindow(true)
    this.reflesh()

    this.scrollView.addSprite(AssetLoader.getSprite('mystery-1-manual'))
    this.scrollView.addSprite(AssetLoader.getSprite('mystery-1-manual'))
    this.scrollView.addSprite(AssetLoader.getSprite('mystery-1-manual'))
    this.scrollView.addSprite(AssetLoader.getSprite('mystery-1-manual'))

    this.titleBar.renderable = false

    this.close()
    return this
  }

  reflesh() {
    this.setWindowSize(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.backGround.x = this.winWidth + this.cavWidth + this.bodyWidthOffset

    this.scrollView.reflesh(
      this.winX + this.bodyWidthOffset,
      this.winY,
      this.cavWidth - this.bodyWidthOffset * 2,
      this.winHeight
    )
  }
}
