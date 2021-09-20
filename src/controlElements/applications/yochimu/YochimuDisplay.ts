import * as PIXI from 'pixi.js'
import { Window } from '../../../core/window'
import { CustomRoundedShape } from '../../../extensions/customRoundedShape'

export class YochimuDisplay extends Window {
  backGround: CustomRoundedShape = new CustomRoundedShape()
  backGroundColor: number = 0xffffff

  cavWidth: number = 500
  cavHeight: number = 600

  constructor() {
    super('予知夢フォルダー')
    this.reflesh()
  }

  create(): Window {
    this.createWindow()

    this.addChild(this.backGround)
    return this
  }

  reflesh() {
    this.setWindowSize(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.backGround.x = this.winX
    this.backGround.y = this.winY
    this.backGround.drawCustomRect(
      this.round,
      this.cavWidth,
      this.cavHeight,
      this.backGroundColor,
      false,
      false,
      true,
      true
    )
  }
}
