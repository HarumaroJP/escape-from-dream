import * as PIXI from 'pixi.js'
import { Renderable } from '../../core/renderable'
import { Window } from '../../core/window'
import { ScrollView } from './scrollView'
import { CustomRoundedShape } from '../../extensions/customRoundedShape'
import { TextRoundedRect } from './textRoundedRect'
import { AssetLoader } from '../../core/assetLoader'
import { SelectMenu } from './selectMenu'
import { ChatSequencer } from './chatSequencer'

export type Target = 'me' | 'you'

export class ChatDisplay extends Window implements Renderable {
  private cavWidth: number = 1200
  private cavHeight: number = 500
  private selectMenuWidth: number = 300

  private chatSequencer: ChatSequencer

  private header: PIXI.Graphics = new PIXI.Graphics()
  private targetTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'left',
    fontFamily: 'hirakaku',
    fontSize: '22px',
    fill: 0xffffff,
  })
  private targetName: PIXI.Text = new PIXI.Text('', this.targetTextStyle)
  private targetNameOffset: number = 30
  private navHeight = 45

  private footer: CustomRoundedShape = new CustomRoundedShape()
  private fHeight = 60

  private inputField: TextRoundedRect = new TextRoundedRect(this.titleTextStyle)
  private fieldOffsetW = 300
  private fieldOffsetH = 22
  private fiendOffsetX = 150

  private selectMenu: SelectMenu = new SelectMenu()
  private sendButton: CustomRoundedShape = new CustomRoundedShape()
  private buttonTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: 'hirakaku',
    fontSize: '22px',
    fill: 0x000000,
  })
  private buttonWidth: number = 100
  private buttonHeight: number = 40

  private buttonText: PIXI.Text = new PIXI.Text('送信', this.buttonTextStyle)
  private buttonTextOffset: number = 15

  private buttonIcon: PIXI.Sprite = new PIXI.Sprite(AssetLoader.getSprite('sendIcon'))
  private buttonIconOffset: number = 60

  private buttonIconSize: number = 25

  private scrollView: ScrollView = new ScrollView()

  constructor() {
    super('LIME')
    this.reflesh()
  }

  create(): PIXI.Container {
    this.createWindow()

    this.targetName.text = AssetLoader.getNameById(1)

    this.addChild(this.header)
    this.header.addChild(this.targetName)
    this.addChild(this.footer)
    this.footer.addChild(this.sendButton)
    this.sendButton.addChild(this.buttonText)
    this.sendButton.addChild(this.buttonIcon)
    this.addChild(this.selectMenu)
    this.addChild(this.scrollView.create())

    this.footer.addChild(this.inputField)

    this.chatSequencer = new ChatSequencer(this.scrollView)
    this.chatSequencer.start()

    return this
  }

  reflesh(): void {
    this.setWindowPivot(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.selectMenu.x = this.winX + this.winWidth - this.selectMenuWidth
    this.selectMenu.y = this.winY
    this.selectMenu.reflesh(
      this.round,
      this.selectMenuWidth,
      this.winHeight + this.fHeight + this.navHeight
    )

    const mainBodyWidth = this.winWidth - this.selectMenuWidth

    this.header.x = this.winX
    this.header.y = this.winY
    this.header.beginFill(0x1b1b1b).drawRect(0, 0, mainBodyWidth, this.navHeight).endFill()
    this.targetName.anchor.y = 0.5
    this.targetName.x = this.targetNameOffset
    this.targetName.y = this.navHeight * 0.5

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
      0xd6d6d6,
      true,
      true
    )

    this.sendButton.interactive = true
    this.sendButton.buttonMode = true
    this.sendButton.x = mainBodyWidth - this.buttonWidth - 10
    this.sendButton.y = (this.fHeight - this.buttonHeight) * 0.5
    this.sendButton.drawCustomCapusle(this.buttonWidth, this.buttonHeight, 0x77ff00, true, true)
    this.sendButton.on('pointerdown', () => this.scrollView.addElement(0, ''))

    this.buttonText.anchor.set(0.5)
    this.buttonText.x = this.buttonText.width * 0.5 + this.buttonTextOffset
    this.buttonText.y = this.buttonHeight * 0.5

    this.buttonIcon.anchor.set(0.5)
    this.buttonIcon.x = this.buttonIconSize * 0.5 + this.buttonIconOffset
    this.buttonIcon.y = this.buttonHeight * 0.5
    this.buttonIcon.width = this.buttonIcon.height = this.buttonIconSize

    this.scrollView.reflesh(this.winX, this.winY + this.navHeight, mainBodyWidth, this.winHeight)
  }

  onResize(): void {
    this.reflesh()
  }
}
