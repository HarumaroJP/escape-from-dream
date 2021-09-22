import * as PIXI from 'pixi.js'
import { gsap } from 'gsap'

export class ChatElement extends PIXI.Graphics {
  target: number
  chatMaxWidth: number = 200
  chatOffsetX: number = 10

  elemWidth: number
  elemHeight: number = 30

  icon: PIXI.Sprite
  iconSize: number = 30
  iconOffset: number = 10
  hasIcon: boolean = false

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

  setIcon(texture: PIXI.Texture) {
    this.hasIcon = true
    this.icon = new PIXI.Sprite(texture)

    this.icon.width = this.iconSize
    this.icon.height = this.iconSize

    this.addChild(this.icon)

    this.icon.x = -this.iconSize - this.iconOffset
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

      if (this.hasIcon) {
        x += this.iconSize + this.iconOffset
      }
    }

    y = posY
    this.setPosition(x, y)
  }
}
