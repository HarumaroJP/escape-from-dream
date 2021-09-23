import * as PIXI from 'pixi.js'

export class MathUtils {
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  static shuffle(array: any[]) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }
}

export class PIXIUtils {
  static resizeSpriteByHeight(sprite: PIXI.Sprite, maxHeight: number) {
    const aspect = maxHeight / sprite.height
    sprite.width = sprite.width * aspect
    sprite.height = maxHeight
  }

  static resizeSpriteByWidth(sprite: PIXI.Sprite, maxWidth: number) {
    const aspect = maxWidth / sprite.width
    sprite.height = sprite.height * aspect
    sprite.width = maxWidth
  }

  static array_equal(a: string | any[], b: string | any[]) {
    if (!Array.isArray(a)) return false
    if (!Array.isArray(b)) return false
    if (a.length != b.length) return false
    for (var i = 0, n = a.length; i < n; ++i) {
      if (a[i] !== b[i]) return false
    }
    return true
  }
}
