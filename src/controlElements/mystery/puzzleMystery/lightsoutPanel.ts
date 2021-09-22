import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'
import { AssetLoader } from '../../../core/assetLoader'
import { PIXIUtils } from '../../../extensions/utils'

export class LightsoutPanel extends PIXI.Graphics {
  venMachine: PIXI.Sprite
  buttonContainer: PIXI.Container = new PIXI.Container()

  lightButtons: LightsButton[][] = []
  lightButtonFlags: boolean[][] = []

  buttonCount: number = 4
  buttonSize: number = 70
  buttonSpaceX: number = 23
  buttonSpaceY: number = 30

  onClear: () => void

  constructor() {
    super()
    this.beginFill(0x000000).drawRect(0, 0, window.innerWidth, window.innerHeight).endFill()
    this.interactive = true

    for (let i = 0; i < this.buttonCount; i++) {
      this.lightButtons.push(new Array(this.buttonCount).fill(null))
    }

    for (let i = 0; i < this.buttonCount; i++) {
      this.lightButtonFlags.push(new Array(this.buttonCount).fill(false))
    }

    this.venMachine = new PIXI.Sprite(AssetLoader.getSprite('vending-machine'))
    this.venMachine.interactive = true
    this.venMachine.anchor.set(0.5)
    this.venMachine.x = window.innerWidth * 0.5
    this.venMachine.y = window.innerHeight * 0.5

    this.addChild(this.venMachine)

    this.buttonContainer.x = -215
    this.buttonContainer.y = -240

    this.venMachine.addChild(this.buttonContainer)

    for (let i = 1; i <= this.buttonCount; i++) {
      for (let j = 1; j <= this.buttonCount; j++) {
        this.createButton(i, j)
      }
    }

    this.alpha = 0
  }

  createButton(c: number, r: number) {
    const tex_off_name = `${r}-${c}-off`
    const tex_on_name = `${r}-${c}-on`

    const button: LightsButton = new LightsButton(
      c,
      r,
      AssetLoader.getSprite(tex_on_name),
      AssetLoader.getSprite(tex_off_name),
      this.buttonSize
    )

    PIXIUtils.resizeSpriteByHeight(button, this.buttonSize)

    this.lightButtons[c - 1][r - 1] = button

    button.x = (this.buttonSize + this.buttonSpaceX) * (c - 1)
    button.y = (this.buttonSize + this.buttonSpaceY) * (r - 1)

    this.buttonContainer.addChild(button)

    button.on('pointerdown', () => {
      this.switchButtonRange(button)
      this.checkAllClear()
    })
  }

  switchButtonRange(button: LightsButton) {
    button.switch()

    const idxC = button.c - 1
    const idxR = button.r - 1

    this.lightButtonFlags[idxC][idxR] = button.isActive

    this.switchButtonFrom(button, 1, 0)
    this.switchButtonFrom(button, 0, 1)
    this.switchButtonFrom(button, -1, 0)
    this.switchButtonFrom(button, 0, -1)
  }

  switchButtonFrom(originButton: LightsButton, x: number, y: number) {
    const idxC = originButton.c - 1
    const idxR = originButton.r - 1

    if (this.checkCanSwitch(originButton, x, y)) {
      const button = this.lightButtons[idxC + x][idxR + y]
      button.switch()
      this.lightButtonFlags[idxC + x][idxR + y] = button.isActive
    }
  }

  checkCanSwitch(button: LightsButton, offsetX: number, offsetY: number): boolean {
    let c = button.c + offsetX
    let r = button.r + offsetY

    return c >= 1 && c <= 4 && r >= 1 && r <= 4
  }

  checkAllClear() {
    const isClear = this.lightButtonFlags.every((flags) => flags.every((f) => f == true))

    if (isClear) {
      this.onClear()
    }
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

  hide(onCompleted: () => void) {
    gsap
      .to(this, {
        alpha: 0,
        duration: 2,
        ease: 'Power2.easeInOut',
        onComplete: () => {
          onCompleted()
        },
      })
      .play()
  }
}

class LightsButton extends PIXI.Sprite {
  c: number
  r: number

  isActive: boolean = false
  tex_on: PIXI.Texture
  tex_off: PIXI.Texture
  size: number

  constructor(c: number, r: number, tex_on: PIXI.Texture, tex_off: PIXI.Texture, size: number) {
    super(tex_off)

    this.c = c
    this.r = r
    this.size = size

    this.tex_off = tex_off
    this.tex_on = tex_on

    this.interactive = true
    this.buttonMode = true
  }

  switch() {
    this.isActive = !this.isActive
    this.texture = this.isActive ? this.tex_on : this.tex_off
  }
}
