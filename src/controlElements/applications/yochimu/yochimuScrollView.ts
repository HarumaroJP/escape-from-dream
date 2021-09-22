import { Scrollbox } from 'pixi-scrollbox'
import * as PIXI from 'pixi.js'
import { TextRoundedRect } from '../../../extensions/textRoundedRect'
import { PIXIUtils } from '../../../extensions/utils'

export class YochimuScrollView extends Scrollbox {
  scrollBox: PIXI.Graphics = new PIXI.Graphics()
  elements: PIXI.Sprite[] = []

  private generalOffset: number = 30

  create() {
    this.overflow = 'hidden'
    this.content.addChild(this.scrollBox)

    return this
  }

  reflesh(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y

    this.boxWidth = w
    this.boxHeight = h

    this.scrollBox.drawRect(0, 0, w, h)

    this.update()
  }

  enableScroll: boolean = false
  nextElementPosY: number = this.generalOffset

  addSprite(texture: PIXI.Texture) {
    const sprite = new PIXI.Sprite(texture)
    PIXIUtils.resizeSpriteByWidth(sprite, this.boxWidth)

    sprite.y += this.nextElementPosY

    this.nextElementPosY += sprite.height + this.generalOffset
    this.elements.push(sprite)

    if (!this.enableScroll) {
      let elementsHeight: number = this.generalOffset
      this.elements.forEach((elem) => {
        elementsHeight += elem.height + this.generalOffset
      })

      if (elementsHeight >= this.scrollBox.height) {
        this.enableScroll = true
      }
    }

    if (this.enableScroll) {
      let height = this.nextElementPosY
      this.scrollBox.drawRect(0, 0, this.scrollBox.width, height)
    }

    this.update()

    sprite.setParent(this.content)
  }
}
