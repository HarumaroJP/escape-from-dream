import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { AssetLoader } from '../../../core/assetLoader'

export class LightsoutPanel extends PIXI.Graphics {
  venMachine: PIXI.Sprite

  buttonContainer: PIXI.Container = new PIXI.Container()

  buttonCount: number = 4
  buttonSpace: number = 10

  constructor() {
    super()
    this.beginFill(0x000000).drawRect(0, 0, window.innerWidth, window.innerHeight).endFill()

    console.log(AssetLoader.getSprite('vending-machine'))
    this.venMachine = new PIXI.Sprite(AssetLoader.getSprite('vending-machine'))
    this.venMachine.anchor.set(0.5)
    this.venMachine.x = window.innerWidth * 0.5
    this.venMachine.y = window.innerHeight * 0.5

    this.addChild(this.venMachine)

    this.buttonContainer.x = -220
    this.buttonContainer.y = -260

    this.venMachine.addChild(this.buttonContainer)

    for (let i = 0; i < this.buttonCount; i++) {

      
      for (let i = 0; i < this.buttonCount; i++) {

      }
    }

    this.alpha = 0
  }

  show() {
    gsap
      .to(this, {
        alpha: 1,
        duration: 2,
        ease: 'Power2.easeInOut',
      })
      .play()
  }
}
