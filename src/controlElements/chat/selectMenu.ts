import * as PIXI from 'pixi.js'
import { CustomRoundedShape } from '../../extensions/customRoundedShape'
import { ChatElement } from './chatElement/chatElement'
import { ScrollView } from './scrollView'

export class SelectMenu extends CustomRoundedShape {
  hintTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: 'hirakaku',
    fontSize: '22px',
    fill: 0xffffff,
  })
  hintText: PIXI.Text = new PIXI.Text('メッセージを選択', this.hintTextStyle)
  hintTextOffsetY: number = 30
  chatElementOffsetX: number = 20

  elements: ChatElement[] = []

  scrollView: ScrollView

  menuWidth: number
  menuHeight: number
  menuPadding: number = 5

  chatSpace: number = 10

  constructor(scrollView: ScrollView) {
    super()
    this.hintText.anchor.x = 0.5
    this.addChild(this.hintText)
    this.scrollView = scrollView
  }

  addElement(element: ChatElement) {
    let x = (this.menuWidth - element.elemWidth) * 0.5
    let y = this.hintText.height + this.hintTextOffsetY + this.menuPadding + this.chatElementOffsetX

    this.elements.forEach((elem) => {
      y += elem.elemHeight + this.chatSpace
    })

    element.setPosition(x, y)

    element.interactive = true
    element.buttonMode = true
    element.onClick.push(() => {
      this.scrollView.setMessage(element)
    })
    this.elements.push(element)
    this.addChild(element)
  }

  clearElements() {
    this.elements.forEach((elem) => {
      this.removeChild(elem)
      elem.destroy()
    })

    this.elements.splice(0)
  }

  reflesh(r: number, w: number, h: number) {
    this.menuWidth = w
    this.menuHeight = h

    this.drawCustomRect(r, w, h, 0x343434, false, false, true, false)
    this.hintText.x = w * 0.5
    this.hintText.y = this.hintTextOffsetY
  }
}
