import * as PIXI from 'pixi.js'
import { SelectMenu } from './selectMenu'
import { gsap } from 'gsap'
import { MysteryManager } from '../../mystery/mysteryManager'
import { CustomRoundedShape } from '../../../extensions/customRoundedShape'
import { TextRoundedRect } from '../../../extensions/textRoundedRect'
import { ChatScrollView } from './chatScrollView'
import { AssetLoader } from '../../../core/assetLoader'
import { Window } from '../../../core/window'

export type Target = 'me' | 'you'

export class LIMEDisplay extends Window {
  private cavWidth: number = 1200
  private cavHeight: number = 500
  private selectMenuWidth: number = 300

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
  fieldTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'left',
    fontFamily: 'hirakaku',
    fontSize: '22px',
    fill: 0x000000,
  })
  private inputField: TextRoundedRect = new TextRoundedRect(this.fieldTextStyle)
  private fieldOffsetW = 300
  private fieldOffsetH = 22
  private fiendOffsetX = 150

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

  private buttonIcon: PIXI.Sprite = new PIXI.Sprite(AssetLoader.getTexture('sendIcon'))
  private buttonIconOffset: number = 60

  private buttonIconSize: number = 25
  private buttonFade: gsap.core.Tween = gsap.to(this.sendButton, {
    pixi: {
      tint: 0xc9c9c9,
    },
    duration: 0.1,
    paused: true,
  })

  scrollView: ChatScrollView = new ChatScrollView()
  selectMenu: SelectMenu = new SelectMenu(this.scrollView)

  onSend: () => void

  constructor() {
    super('LIME')
  }

  create(): LIMEDisplay {
    this.targetName.text = AssetLoader.getNameById(0)

    this.addChild(this.header)
    this.header.addChild(this.targetName)
    this.addChild(this.footer)
    this.footer.addChild(this.sendButton)
    this.sendButton.addChild(this.buttonText)
    this.sendButton.addChild(this.buttonIcon)
    this.addChild(this.selectMenu)
    this.addChild(this.scrollView.create(this.inputField))

    this.footer.addChild(this.inputField)

    this.createWindow(true)

    this.reflesh()
    this.close()
    return this
  }

  reflesh(): void {
    this.setWindowSize(this.cavWidth, this.cavHeight)
    this.refleshWindow()

    this.selectMenu.x = this.winX + this.winWidth - this.selectMenuWidth
    this.selectMenu.y = this.winY
    this.selectMenu.reflesh(this.round, this.selectMenuWidth, this.winHeight + this.fHeight + this.navHeight)

    const mainBodyWidth = this.winWidth - this.selectMenuWidth

    this.header.x = this.winX
    this.header.y = this.winY
    this.header.clear().beginFill(0x1b1b1b).drawRect(0, 0, mainBodyWidth, this.navHeight).endFill()
    this.targetName.anchor.y = 0.5
    this.targetName.x = this.targetNameOffset
    this.targetName.y = this.navHeight * 0.5

    this.footer.x = this.winX
    this.footer.y = this.winY + this.navHeight + this.winHeight
    this.footer.clear().drawCustomRect(this.round, mainBodyWidth, this.fHeight, 0xf2f2f2, false, false, false, true)

    this.inputField.x = this.fiendOffsetX
    this.inputField.y = this.fieldOffsetH * 0.5
    this.inputField
      .clear()
      .drawCustomCapusle(mainBodyWidth - this.fieldOffsetW, this.fHeight - this.fieldOffsetH, 0xd6d6d6, true, true)
    this.inputField.reflesh(mainBodyWidth - this.fieldOffsetW, this.fHeight - this.fieldOffsetH)

    this.sendButton.interactive = true
    this.sendButton.buttonMode = true
    this.sendButton.x = mainBodyWidth - this.buttonWidth - 10
    this.sendButton.y = (this.fHeight - this.buttonHeight) * 0.5
    this.sendButton.clear().drawCustomCapusle(this.buttonWidth, this.buttonHeight, 0x77ff00, true, true)

    this.sendButton.on('mouseover', () => {
      this.buttonFade.play()
    })
    this.sendButton.on('mouseout', () => {
      this.buttonFade.reverse()
    })
    this.sendButton.on('pointerdown', () => {
      if (this.scrollView.currentElem == undefined) return

      this.scrollView.currentElem.interactive = false
      this.scrollView.currentElem.buttonMode = false
      const index = this.selectMenu.elements.indexOf(this.scrollView.currentElem)
      this.selectMenu.elements.splice(index, 1)

      this.scrollView.sendMessage()

      this.selectMenu.clearElements()
      this.onSend()
    })

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
