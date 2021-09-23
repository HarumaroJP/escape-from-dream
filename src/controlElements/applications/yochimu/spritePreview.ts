import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../../core/assetLoader'
import { addGameScene } from '../../../core/main'
import { Renderable } from '../../../core/renderable'
import { PIXIUtils } from '../../../extensions/utils'

export class SpritePreview extends PIXI.Container implements Renderable {
  background: PIXI.Graphics = new PIXI.Graphics()
  backgroundColor: number = 0x000000

  sprite: PIXI.Sprite
  spriteHeightOffset: number = 150

  closeButton: PIXI.Sprite
  closeButtonSize: number = 40

  onClose: () => void

  constructor(texture: PIXI.Texture) {
    super()

    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor.set(0.5)

    this.closeButton = new PIXI.Sprite(AssetLoader.getSprite('close-button'))
    this.closeButton.width = this.closeButtonSize
    this.closeButton.height = this.closeButtonSize
    this.closeButton.anchor.set(0.5)

    this.onResize()

    this.addChild(this.background)
    this.addChild(this.closeButton)
    this.addChild(this.sprite)

    this.interactive = true

    this.closeButton.interactive = true
    this.closeButton.buttonMode = true
    this.closeButton.on('pointerdown', () => this.onClose())
  }

  onResize(): void {
    PIXIUtils.resizeSpriteByHeight(this.sprite, window.innerHeight - this.spriteHeightOffset * 2)
    this.background
      .clear()
      .beginFill(this.backgroundColor)
      .drawRect(0, 0, window.innerWidth, window.innerHeight)
      .endFill()

    this.background.alpha = 0.5

    this.sprite.x = window.innerWidth * 0.5
    this.sprite.y = window.innerHeight * 0.5

    this.closeButton.x = this.sprite.x + (this.sprite.width + this.closeButton.width) * 0.5
    this.closeButton.y = this.sprite.y - (this.sprite.height + this.closeButton.height) * 0.5
  }
}
