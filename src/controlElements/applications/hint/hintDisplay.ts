import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../../core/assetLoader'
import { Window } from '../../../core/window'
import { CustomRoundedShape } from '../../../extensions/customRoundedShape'
import { PIXIUtils } from '../../../extensions/utils'

export class HintDisplay extends Window {
  spritePaths: string[] = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8']
  sprites: PIXI.Sprite[] = []
  spriteContainer: PIXI.Container = new PIXI.Container()
  background: CustomRoundedShape = new CustomRoundedShape()
  backGroundColor: number = 0xffffff

  cavWidth: number = 750
  cavHeight: number = 400

  centerButton: PIXI.Sprite
  rightButton: PIXI.Sprite
  leftButton: PIXI.Sprite
  buttonSize: number = 50
  buttonOffset: number = 20

  constructor() {
    super('チュートリアル')
  }

  create(): Window {
    this.addChild(this.background)
    this.addChild(this.spriteContainer)

    this.centerButton = new PIXI.Sprite(AssetLoader.getSprite('right_arrow'))
    this.rightButton = new PIXI.Sprite(AssetLoader.getSprite('right_arrow'))
    this.leftButton = new PIXI.Sprite(AssetLoader.getSprite('left_arrow'))

    this.centerButton.anchor.set(0.5)
    this.rightButton.anchor.set(1, 0.5)
    this.leftButton.anchor.set(0, 0.5)

    this.addChild(this.centerButton)
    this.addChild(this.rightButton)
    this.addChild(this.leftButton)

    this.createWindow(true)
    this.reflesh()

    this.centerButton.width = this.buttonSize
    this.centerButton.height = this.buttonSize
    this.rightButton.width = this.buttonSize
    this.rightButton.height = this.buttonSize
    this.leftButton.width = this.buttonSize
    this.leftButton.height = this.buttonSize

    this.centerButton.x = this.winX + this.cavWidth * 0.5
    this.centerButton.y = this.winY + this.cavHeight * 0.5 + 10

    this.rightButton.x = this.winX + this.cavWidth - this.buttonOffset
    this.rightButton.y = this.winY + this.cavHeight * 0.5

    this.leftButton.x = this.winX + this.buttonOffset
    this.leftButton.y = this.winY + this.cavHeight * 0.5

    this.spritePaths.forEach((path) => {
      const sprite: PIXI.Sprite = new PIXI.Sprite(AssetLoader.getSprite(path))

      this.spriteContainer.addChild(sprite)
      this.sprites.push(sprite)
    })

    let idxCounter: number = 0

    this.sprites.forEach((sprite) => {
      PIXIUtils.resizeSpriteByHeight(sprite, this.cavHeight)

      let offset: number = this.cavWidth * idxCounter

      idxCounter++

      sprite.x = this.winX + offset
      sprite.y = this.winY
    })

    this.spriteContainer.x = (this.cavWidth - this.sprites[0].width) * 0.5

    this.close()
    return this
  }

  update() {}

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
