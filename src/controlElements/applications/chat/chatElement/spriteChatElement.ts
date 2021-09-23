import * as PIXI from 'pixi.js'
import { addGameScene, removeGameScene } from '../../../../core/main'
import { PIXIUtils } from '../../../../extensions/utils'
import { SpritePreview } from '../../yochimu/spritePreview'
import { ChatElement } from './chatElement'

export class SpriteChatElement extends ChatElement {
  sprite: PIXI.Sprite

  spritePadding: number = 15
  maxSpriteHeight: number = 300

  constructor(target: number, texture: PIXI.Texture, overrideMaxHeight: number) {
    super(target)

    if (overrideMaxHeight != -1) {
      this.maxSpriteHeight = overrideMaxHeight
    }

    this.updateSprite(texture)
    this.sprite.anchor.set(0.5)

    this.sprite.x = this.elemWidth * 0.5
    this.sprite.y = this.elemHeight * 0.5

    this.sprite.interactive = true
    this.sprite.buttonMode = true

    this.sprite.on('pointerdown', () => {
      const preview = new SpritePreview(texture)
      preview.onClose = () => {
        removeGameScene(preview)
      }
      addGameScene(preview)
    })

    this.addChild(this.sprite)
  }

  resizeContent() {
    //画像のリサイズ
    PIXIUtils.resizeSpriteByHeight(this.sprite, this.maxSpriteHeight)
  }

  updateSprite(texture: PIXI.Texture) {
    this.sprite = new PIXI.Sprite(texture)

    this.resizeContent()

    this.elemWidth = this.sprite.width + this.spritePadding
    this.elemHeight = this.sprite.height + this.spritePadding
    this.beginFill(0x77ff00).drawRoundedRect(0, 0, this.elemWidth, this.elemHeight, 15).endFill()
  }

  getContent(): any {
    return this.sprite
  }
}
