import * as PIXI from 'pixi.js'
import { ChatElement } from './chatElement'

export class SpriteChatElement extends ChatElement {
  sprite: PIXI.Sprite

  spritePadding: number = 10
  maxSpriteHeight: number = 120

  constructor(target: number, texture: PIXI.Texture) {
    super(target)

    this.updateSprite(texture)
    this.sprite.anchor.set(0.5)

    this.sprite.x = this.elemWidth * 0.5
    this.sprite.y = this.elemHeight * 0.5

    this.addChild(this.sprite)
  }

  updateSprite(texture: PIXI.Texture) {
    this.sprite = new PIXI.Sprite(texture)

    //画像のリサイズ
    const aspectY = this.maxSpriteHeight / this.sprite.height
    this.sprite.width = this.sprite.width * aspectY
    this.sprite.height = this.maxSpriteHeight

    this.elemWidth = this.sprite.width + this.spritePadding
    this.elemHeight = this.sprite.height + this.spritePadding
    this.beginFill(0x77ff00).drawRoundedRect(0, 0, this.elemWidth, this.elemHeight, 40).endFill()
  }

  getContent(): any {
    return this.sprite
  }
}
