import * as PIXI from 'pixi.js'

export class MathUtils {
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }
}

export class PIXIUtils {
  static resizeSprite(sprite: PIXI.Sprite, maxHeight: number) {
    const aspect = maxHeight / sprite.height
    sprite.width = sprite.width * aspect
    sprite.height = maxHeight
  }
}
