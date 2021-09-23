import * as PIXI from 'pixi.js'
import { Window } from '../../../core/window'
import { CustomRoundedShape } from '../../../extensions/customRoundedShape'

export class HintDisplay extends Window {
  sprites: PIXI.Sprite[] = []
  background: CustomRoundedShape = new CustomRoundedShape()
  backGroundColor: number = 0xf7f7f7

  cavWidth: number = 600
  cavHeight: number = 400

  constructor() {
    super('ヒント')
  }

  create(): Window {
    this.addChild(this.background)
    this.createWindow(true)
    this.reflesh()

    this.close()
    return this
  }

  reflesh() {
    this.setWindowSize(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.background.x = this.winX
    this.background.y = this.winY

    this.background
      .clear()
      .drawCustomRect(this.round, this.cavWidth, this.cavHeight, this.backGroundColor, false, false, true, true)
  }
}
