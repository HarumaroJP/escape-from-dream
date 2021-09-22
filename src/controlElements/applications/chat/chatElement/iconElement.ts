import * as PIXI from 'pixi.js'

export class IconElement extends PIXI.Sprite {
  iconSize: number = 20
  textOffset: number = 10

  constructor(texture: PIXI.Texture) {
    super(texture)
  }
}
