import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { AssetLoader } from '../../../core/assetLoader'
import { Window } from '../../../core/window'
import { CustomRoundedShape } from '../../../extensions/customRoundedShape'
import { PIXIUtils } from '../../../extensions/utils'

export class HintDisplay extends Window {
  spritePaths: string[] = ['page1', 'page2', 'page3', 'page4', 'page5', 'page6', 'page7', 'page8']
  sprites: PIXI.Sprite[] = []
  spriteContainer: PIXI.Container = new PIXI.Container()
  background: CustomRoundedShape = new CustomRoundedShape()
  backgroundMask: PIXI.Graphics = new PIXI.Graphics()
  backGroundColor: number = 0xffffff

  cavWidth: number = 1100
  cavHeight: number = 620

  centerButton: PIXI.Sprite
  rightButton: PIXI.Sprite
  leftButton: PIXI.Sprite

  buttonSize: number = 50
  buttonOffset: number = 20

  currentIndex: number = 0

  constructor() {
    super('チュートリアル')
  }

  create(): Window {
    this.addChild(this.background)
    this.addChild(this.backgroundMask)
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

    this.backgroundMask.x = this.winX
    this.backgroundMask.y = this.winY - this.titleHeight
    this.backgroundMask.beginFill(0x000000).drawRoundedRect(0, 0, this.cavWidth, this.cavHeight, this.round).endFill()
    this.spriteContainer.mask = this.backgroundMask

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

    this.setActiveButtons(true)

    this.centerButton.on('pointerdown', () => {
      this.currentIndex += 1
      gsap
        .to(this.spriteContainer, {
          duration: 0.5,
          x: -this.cavWidth * this.currentIndex,
        })
        .play()
      this.update()
    })
    this.rightButton.on('pointerdown', () => {
      this.currentIndex += 1
      gsap
        .to(this.spriteContainer, {
          duration: 0.5,
          x: -this.cavWidth * this.currentIndex,
        })
        .play()
      this.update()
    })
    this.leftButton.on('pointerdown', () => {
      this.currentIndex -= 1
      gsap
        .to(this.spriteContainer, {
          duration: 0.5,
          x: -this.cavWidth * this.currentIndex,
        })
        .play()
      this.update()
    })

    this.update()

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

    this.y += 50

    this.close()
    return this
  }

  update() {
    this.setActiveButtons(false)

    if (this.currentIndex == 0) {
      this.centerButton.interactive = true
      this.centerButton.buttonMode = true
      this.centerButton.renderable = true
    } else {
      this.leftButton.interactive = true
      this.leftButton.buttonMode = true
      this.leftButton.renderable = true

      if (this.currentIndex + 1 < this.sprites.length) {
        this.rightButton.interactive = true
        this.rightButton.buttonMode = true
        this.rightButton.renderable = true
      }
    }
  }

  setActiveButtons(value: boolean) {
    this.centerButton.interactive = value
    this.centerButton.buttonMode = value
    this.centerButton.renderable = value
    this.rightButton.interactive = value
    this.rightButton.buttonMode = value
    this.rightButton.renderable = value
    this.leftButton.interactive = value
    this.leftButton.buttonMode = value
    this.leftButton.renderable = value
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
