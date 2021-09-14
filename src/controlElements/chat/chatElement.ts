import * as PIXI from 'pixi.js'
import { Target } from './chatDisplay'

export class ChatElement extends PIXI.Graphics {
  text: PIXI.Text
  private textOffsetX: number = 10
  private textOffsetY: number = 1.5
  private textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fill: '#121212',
    fontSize: 15,
    textBaseline: 'middle',
  })

  private target: Target
  private textLength = 22
  private chatWidth: number = 200
  chatHeight: number = 30
  private chatOffsetX_me = 480
  private chatOffsetX_you = 10
  private chatSpace: number

  get elemHeight(): number {
    return this.chatHeight
  }

  constructor(target: Target, text: string, elemCount: number, chatSpace: number) {
    super()
    this.target = target
    this.chatSpace = chatSpace
    text = text.substr(0, this.textLength)

    this.reflesh(elemCount)
    this.text = new PIXI.Text(text, this.textStyle)
    this.text.x = this.textOffsetX
    this.text.y = this.textOffsetY
    this.addChild(this.text)
  }

  reflesh(elemCount: number) {
    if (this.target == 'me') {
      this.x = this.chatOffsetX_me
    } else {
      this.x = this.chatOffsetX_you
    }

    this.y = (this.chatHeight + this.chatSpace) * elemCount + this.chatSpace
    this.beginFill(0x42d662).drawRoundedRect(0, 0, this.chatWidth, this.chatHeight, 40).endFill()
  }
}
