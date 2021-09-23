import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../../core/assetLoader'
import { Window } from '../../../core/window'
import { PIXIUtils } from '../../../extensions/utils'
import { YochimuScrollView } from './yochimuScrollView'

export class YochimuDisplay extends Window {
  backGround: PIXI.Sprite
  backgroundHitArea: PIXI.RoundedRectangle = new PIXI.RoundedRectangle()
  maxBackgroundHeight: number = 720
  scrollView: YochimuScrollView = new YochimuScrollView()
  backGroundColor: number = 0xffffff

  cavWidth: number = 300
  cavHeight: number = 600
  bodyWidthOffset: number = 30

  constructor() {
    super('予知夢フォルダー')
  }

  create(): YochimuDisplay {
    this.backGround = new PIXI.Sprite(AssetLoader.getTexture('yochimu_Background'))
    PIXIUtils.resizeSpriteByHeight(this.backGround, this.maxBackgroundHeight)

    this.addChild(this.backGround)
    this.addChild(this.scrollView.create())
    this.createWindow(true)
    this.reflesh()
    this.toDraggable(this.backGround, this)

    const yochimuSpritePaths: string[] = AssetLoader.getConfigByKey('yochimu_imgs').split(',')

    yochimuSpritePaths.forEach((path) => {
      this.scrollView.addSprite(AssetLoader.getTexture(path))
    })

    this.titleBar.renderable = false
    this.titleBar.interactive = false
    this.titleBar.buttonMode = false

    this.close()
    return this
  }

  enable() {
    this.backGround.interactive = true
    this.backGround.buttonMode = true

    this.closeButton.renderable = true
    this.closeButton.interactive = true
    this.closeButton.buttonMode = true

    this.scrollView.active()
  }

  disable() {
    this.backGround.interactive = false
    this.backGround.buttonMode = false

    this.closeButton.renderable = false
    this.closeButton.interactive = false
    this.closeButton.buttonMode = false

    this.scrollView.deactive()
  }

  reflesh() {
    this.setWindowSize(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.scrollView.reflesh(
      this.winX + this.bodyWidthOffset,
      this.winY,
      this.cavWidth - this.bodyWidthOffset * 2,
      this.winHeight
    )

    this.backGround.x = this.winX - (this.scrollView.boxWidth + this.bodyWidthOffset) * 0.5
    //TODO ここの計算方法わからん
    this.backGround.y = this.winY - 60

    this.backgroundHitArea.x = (this.scrollView.boxWidth + this.bodyWidthOffset) * 0.5
    this.backgroundHitArea.y = 30

    this.backgroundHitArea.width = this.backGround.width * 2.4
    this.backgroundHitArea.height = this.backGround.height * 2.8
    this.backgroundHitArea.radius = 200

    this.backGround.hitArea = this.backgroundHitArea
  }
}
