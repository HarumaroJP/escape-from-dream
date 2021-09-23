import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { PIXIUtils } from '../extensions/utils'
import { AssetLoader } from './assetLoader'
import { videoScene } from './main'

export class VideoPanel {
  static play(name: string, duration: number, onCompleted: () => void): { src: any; panel: PIXI.Graphics } {
    const background = new PIXI.Graphics()
    const video = new PIXI.Sprite(AssetLoader.getVideoTexture(name))
    PIXIUtils.resizeSpriteByHeight(video, window.innerHeight)

    background.beginFill(0x000000).drawRect(0, 0, window.innerWidth, window.innerHeight).endFill()

    background.addChild(video)

    video.width += 400
    video.x = video.width * 0.2
    const src: any = (video.texture.baseTexture.resource as any).source
    src.play()

    video.interactive = true
    background.interactive = true

    this.fadeAsync(background, duration, 2, () => onCompleted())

    return { src: src, panel: background }
  }

  static async fadeAsync(graphics: PIXI.Graphics, duration: number, fadeOffset: number, onCompleted: () => void) {
    duration -= fadeOffset
    await new Promise((resolve) => setTimeout(resolve, duration * 1000))

    gsap
      .to(graphics, {
        duration: fadeOffset,
        alpha: 0,
        onComplete: () => {
          videoScene.removeChild(graphics)
          graphics.destroy()
          onCompleted()
        },
      })
      .play()
  }
}
