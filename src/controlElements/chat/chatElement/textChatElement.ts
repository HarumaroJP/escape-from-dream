import * as PIXI from 'pixi.js'
import { ChatElement } from './chatElement'

export class TextChatElement extends ChatElement {
  message: PIXI.Text

  textLength = 22
  textOffsetX: number = 10
  textOffsetY: number = 5
  textPadding: number = 10
  textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fontFamily: 'hirakaku',
    fill: '#121212',
    fontSize: 15,
  })

  constructor(target: number, text: string) {
    super(target)

    this.isText = true
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

  getContent(): any {
    return this.message.text
  }
}
