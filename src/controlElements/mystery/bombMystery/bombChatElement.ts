import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../../core/assetLoader'
import { PIXIUtils } from '../../../extensions/utils'
import { SpriteChatElement } from '../../applications/chat/chatElement/spriteChatElement'

export class BombChatElement extends SpriteChatElement {
  btnSize: number = 30
  btnSpace: number = 5
  interacts: Interact[] = []

  wrapIndex: number = 2
  generalOffsetX: number = 185
  generalOffsetY: number = 110

  constructor(target: number, panelInfo: boolean[], buttonPattern: number[]) {
    super(target, AssetLoader.getTexture('bom_background'), 230)

    this.sprite.interactive = false
    this.sprite.buttonMode = false

    this.interacts.push(
      new Interact(0, 0, AssetLoader.getTexture('bom_button_red_off'), AssetLoader.getTexture('bom_button_red_on'))
    )

    this.interacts.push(
      new Interact(0, 0, AssetLoader.getTexture('bom_button_blue_off'), AssetLoader.getTexture('bom_button_blue_on'))
    )

    this.interacts.push(
      new Interact(0, 0, AssetLoader.getTexture('bom_button_yellow_off'), AssetLoader.getTexture('bom_button_yellow_on'))
    )

    this.interacts.push(
      new Interact(0, 0, AssetLoader.getTexture('bom_button_green_off'), AssetLoader.getTexture('bom_button_green_on'))
    )

    this.interacts.push(
      new Interact(0, 0, AssetLoader.getTexture('bom_button_pink_off'), AssetLoader.getTexture('bom_button_pink_on'))
    )

    this.interacts.push(
      new Interact(0, 0, AssetLoader.getTexture('bom_button_brown_off'), AssetLoader.getTexture('bom_button_brown_on'))
    )

    let btnCounter: number = 0
    let btnOffsetX: number = 0
    let btnOffsetY: number = 0

    buttonPattern.forEach((i) => {
      const interact = this.interacts[i]
      const isActive = panelInfo[i]

      PIXIUtils.resizeSpriteByHeight(interact, this.btnSize)
      interact.set(isActive)

      interact.x = this.generalOffsetX + btnOffsetX
      interact.y = this.generalOffsetY + btnOffsetY

      btnOffsetX += this.btnSize + this.btnSpace

      if (btnCounter == this.wrapIndex) {
        btnOffsetX = 0
        btnOffsetY = this.btnSize + this.btnSpace
      }

      btnCounter++
    })

    this.interacts.forEach((interact) => interact.anchor.set(0.5))

    this.interacts.forEach((interact) => this.addChild(interact))
  }
}

class Interact extends PIXI.Sprite {
  enabled: boolean = false

  tex_on: PIXI.Texture
  tex_off: PIXI.Texture

  constructor(x: number, y: number, tex_off: PIXI.Texture, tex_on: PIXI.Texture) {
    super(tex_off)

    this.x = x
    this.y = y

    this.tex_on = tex_on
    this.tex_off = tex_off
  }

  set(isActive: boolean) {
    this.enabled = isActive
    this.texture = isActive ? this.tex_on : this.tex_off
  }

  switch() {
    this.enabled = !this.enabled
    this.texture = this.enabled ? this.tex_on : this.tex_off
  }
}
