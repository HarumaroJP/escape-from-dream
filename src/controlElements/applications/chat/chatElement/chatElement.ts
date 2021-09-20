import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'

export class ChatElement extends PIXI.Graphics {
  target: number
  chatMaxWidth: number = 200
  chatOffsetX: number = 10

  elemWidth: number
  elemHeight: number = 30

  isText: boolean = false

  onClick: (() => void)[] = []

  buttonFade: gsap.core.Tween = gsap.to(this, {
    pixi: {
      tint: 0xc9c9c9,
    },
    duration: 0.1,
    paused: true,
  })

  constructor(target: number) {
    super()
    this.target = target

    this.on('mouseover', () => {
      this.buttonFade.play()
    })
    this.on('mouseout', () => {
      this.buttonFade.reverse()
    })

    this.on('pointerdown', () => {
      this.onClick.map((event) => event())
    })
  }

  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }

  getContent(): any {
    return null
  }

  setScrollView(posY: number, viewWidth: number) {
    let x: number, y: number

    if (this.target == 0) {
      x = viewWidth - this.elemWidth - this.chatOffsetX
    } else {
      x = this.chatOffsetX
    }

    y = posY
    this.setPosition(x, y)
  }
}
