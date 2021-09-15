import * as PIXI from 'pixi.js'
import { CustomRoundedShape } from '../../extensions/customRoundedShape'

export class TextRoundedRect extends CustomRoundedShape {
  fieldText: PIXI.Text
  offsetX: number = 15

  constructor(style: PIXI.TextStyle) {
    super()
    this.fieldText = new PIXI.Text('', style)
    this.fieldText.anchor.y = 0.5

    this.addChild(this.fieldText)
  }

  setText(text: string) {
    this.fieldText.text = text
  }

  reflesh(w: number, h: number) {
    this.fieldText.x = this.offsetX
    this.fieldText.y = h * 0.5
  }
}
