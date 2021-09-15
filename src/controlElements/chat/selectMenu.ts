import * as PIXI from 'pixi.js'
import { CustomRoundedShape } from '../../extensions/customRoundedShape'

export class SelectMenu extends CustomRoundedShape {
  hintTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: 'hirakaku',
    fontSize: '22px',
    fill: 0xffffff,
  })
  hintText: PIXI.Text = new PIXI.Text('メッセージを選択', this.hintTextStyle)
  hintTextOffsetY: number = 30

  constructor() {
    super()
    this.hintText.anchor.x = 0.5
    this.addChild(this.hintText)
  }

  addElement() {}

  reflesh(r: number, w: number, h: number) {
    this.drawCustomRect(r, w, h, 0x343434, false, false, true, false)
    this.hintText.x = w * 0.5
    this.hintText.y = this.hintTextOffsetY
  }
}
