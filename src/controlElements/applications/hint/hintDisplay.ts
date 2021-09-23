import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../../core/assetLoader'
import { Window } from '../../../core/window'
import { CustomRoundedShape } from '../../../extensions/customRoundedShape'
import { PIXIUtils } from '../../../extensions/utils'

export class HintDisplay extends Window {
  spritePaths: string[] = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8']
  sprites: PIXI.Sprite[] = []
  background: CustomRoundedShape = new CustomRoundedShape()
  backGroundColor: number = 0x000000

  cavWidth: number = 750
  cavHeight: number = 400

  constructor() {
    super('チュートリアル')
  }

  create(): Window {
    this.addChild(this.background)
    this.createWindow(true)
    this.reflesh()

    this.spritePaths.forEach((path) => this.sprites.push(new PIXI.Sprite(AssetLoader.getSprite(path))))
    this.sprites.forEach((sprite) => {
      this.addChild(sprite)

      sprite.x = this.winX
      sprite.y = this.winY

      PIXIUtils.resizeSpriteByHeight(sprite, this.cavHeight)
    })

    this.close()
    return this
  }

  reflesh() {
    this.setWindowSize(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.background.x = this.winX
    this.background.y = this.winY

    this.background
      .clear()
      .drawCustomRect(this.round, this.cavWidth, this.cavHeight, this.backGroundColor, false, false, true, true)
  }
}
