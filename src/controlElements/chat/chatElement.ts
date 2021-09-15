import * as PIXI from 'pixi.js'
import { Target } from './chatDisplay'

export class ChatElement extends PIXI.Graphics {
  message: PIXI.Text
  elemWidth: number
  elemHeight: number = 30

  private textOffsetX: number = 10
  private textOffsetY: number = 5
  private textPadding: number = 10
  private textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: 'hirakaku',
    fill: '#121212',
    fontSize: 15,
  })

  private target: number
  private textLength = 22
  private chatMaxWidth: number = 200

  private chatOffsetX = 10

  constructor(target: number, text: string) {
    super()
    this.target = target

    this.message = new PIXI.Text('', this.textStyle)
    this.updateText(text.substr(0, this.textLength))

    this.message.x = this.textOffsetX
    this.message.y = this.textOffsetY
    this.addChild(this.message)
  }

  updateText(text: string) {
    this.message.text = text
    this.elemWidth = this.message.width + this.textPadding * 2
    this.beginFill(0x77ff00).drawRoundedRect(0, 0, this.elemWidth, this.elemHeight, 40).endFill()
  }

  setPosition(x: number, y: number) {
    this.x = x
    this.y = y
  }

  onClick(callback: () => void) {
    this.on('pointerdown', callback)
  }

  setScrollView(elemCount: number, chatSpace: number, viewWidth: number) {
    let x: number, y: number

    if (this.target == 0) {
      x = viewWidth - this.elemWidth - this.chatOffsetX
    } else {
      x = this.chatOffsetX
    }

    y = (this.elemHeight + chatSpace) * elemCount + chatSpace
    this.setPosition(x, y)
  }
}
