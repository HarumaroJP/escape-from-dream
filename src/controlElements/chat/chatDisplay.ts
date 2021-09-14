import * as PIXI from 'pixi.js'
import { Renderable } from '../../core/renderable'
import { Window } from '../../core/window'
import { ScrollView } from './scrollView'
import { CustomRoundedShape } from '../../extensions/customRoundedShape'
import { TextRoundedRect } from './textRoundedRect'

export type Target = 'me' | 'you'

export class ChatDisplay extends Window implements Renderable {
  private cavWidth: number = 1000
  private cavHeight: number = 400
  private selectMenuWidth: number = 300

  private header: PIXI.Graphics = new PIXI.Graphics()
  private navHeight = 45

  private footer: CustomRoundedShape = new CustomRoundedShape()
  private fHeight = 60

  titleTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: 'Arial',
    fontSize: '18px',
    fill: 0x000000,
  })
  private inputField: TextRoundedRect = new TextRoundedRect(this.titleTextStyle)
  private fieldOffsetW = 100
  private fieldOffsetH = 22
  private fiendOffsetX = 10

  private selectMenu: CustomRoundedShape = new CustomRoundedShape()
  private sendButton: PIXI.Graphics = new PIXI.Graphics()
  private buttonRadius: number = 20

  private scrollView: ScrollView = new ScrollView()

  constructor() {
    super('LIME')
    this.reflesh()
  }

  create(): PIXI.Container {
    this.createWindow()

    this.addChild(this.header)
    this.addChild(this.footer)
    this.addChild(this.selectMenu)
    this.addChild(this.scrollView.create())

    this.footer.addChild(this.inputField)

    return this
  }

  reflesh(): void {
    this.setWindowPivot(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.selectMenu.x = this.winX + this.winWidth - this.selectMenuWidth
    this.selectMenu.y = this.winY
    this.selectMenu.drawCustomRect(
      this.round,
      this.selectMenuWidth,
      this.winHeight + this.fHeight + this.navHeight,
      0x2b3645,
      false,
      false,
      true,
      false
    )

    const mainBodyWidth = this.winWidth - this.selectMenuWidth

    this.header.x = this.winX
    this.header.y = this.winY
    this.header.beginFill(0x485a6e).drawRect(0, 0, mainBodyWidth, this.navHeight).endFill()

    this.footer.x = this.winX
    this.footer.y = this.winY + this.navHeight + this.winHeight
    this.footer.drawCustomRect(
      this.round,
      mainBodyWidth,
      this.fHeight,
      0xf2f2f2,
      false,
      false,
      false,
      true
    )

    this.inputField.x = this.fiendOffsetX
    this.inputField.y = this.fieldOffsetH * 0.5
    this.inputField.drawCustomCapusle(
      mainBodyWidth - this.fieldOffsetW,
      this.fHeight - this.fieldOffsetH,
      0xdedede,
      true,
      true
    )

    this.sendButton.interactive = true
    this.sendButton.buttonMode = true
    this.sendButton.x = mainBodyWidth - this.buttonRadius * 2
    this.sendButton.y = this.fHeight * 0.5
    this.sendButton.beginFill(0x2c79c7).drawCircle(0, 0, this.buttonRadius).endFill()
    this.sendButton.on('pointerdown', () => this.scrollView.addElement('me', ''))

    this.footer.addChild(this.sendButton)

    this.scrollView.reflesh(this.winX, this.winY + this.navHeight, mainBodyWidth, this.winHeight)
  }

  onResize(): void {
    this.reflesh()
  }
}
