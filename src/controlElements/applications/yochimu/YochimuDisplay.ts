import { AssetLoader } from '../../../core/assetLoader'
import { Window } from '../../../core/window'
import { CustomRoundedShape } from '../../../extensions/customRoundedShape'
import { YochimuScrollView } from './yochimuScrollView'

export class YochimuDisplay extends Window {
  backGround: CustomRoundedShape = new CustomRoundedShape()
  scrollView: YochimuScrollView = new YochimuScrollView()
  backGroundColor: number = 0xffffff

  cavWidth: number = 400
  cavHeight: number = 700
  bodyWidthOffset: number = 30

  constructor() {
    super('予知夢フォルダー')
  }

  create(): Window {
    this.addChild(this.backGround)
    this.addChild(this.scrollView.create())
    this.createWindow(true)
    this.reflesh()

    this.scrollView.addSprite(AssetLoader.getSprite('mystery-1-manual'))
    this.scrollView.addSprite(AssetLoader.getSprite('mystery-1-manual'))

    this.close()
    return this
  }

  reflesh() {
    this.setWindowSize(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.backGround.x = this.winX
    this.backGround.y = this.winY
    this.backGround
      .clear()
      .drawCustomRect(this.round, this.cavWidth, this.cavHeight, this.backGroundColor, false, false, true, true)

    this.scrollView.reflesh(
      this.winX + this.bodyWidthOffset,
      this.winY,
      this.cavWidth - this.bodyWidthOffset * 2,
      this.winHeight
    )
  }
}
