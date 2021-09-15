import { Scrollbox } from 'pixi-scrollbox'
import * as PIXI from 'pixi.js'
import { ChatElement } from './chatElement'
import { TextRoundedRect } from './textRoundedRect'

export class ScrollView extends Scrollbox {
  scrollBox: PIXI.Graphics = new PIXI.Graphics()
  inputField: TextRoundedRect
  elements: ChatElement[] = []
  private generalOffset: number = 20

  create(inputField: TextRoundedRect) {
    this.overflow = 'hidden'
    this.content.addChild(this.scrollBox)
    this.inputField = inputField

    return this
  }

  reflesh(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y

    this.boxWidth = w
    this.boxHeight = h
    this.scrollBox.beginFill(0x575757).drawRect(0, 0, w, h).endFill()
    this.scrollBox.width = w
    this.scrollBox.height = h

    this.update()

    this.refleshElements()
  }

  refleshElements() {
    let count = 0
    this.elements.forEach((e) => {
      e.setScrollView(count, this.generalOffset, this.boxWidth)
      this.scrollBox.y -= e.elemHeight
      count += 1
    })
  }

  enableScroll: boolean = false
  currentElem: ChatElement = null

  setMessage(element: ChatElement) {
    this.currentElem = element
    this.inputField.setText(element.message.text)
  }

  sendMessage() {
    if (this.currentElem == null) return

    this.currentElem.setScrollView(this.elements.length, this.generalOffset, this.boxWidth)
    this.elements.push(this.currentElem)

    if (!this.enableScroll) {
      let elementsHeight: number = this.generalOffset
      this.elements.forEach((elem) => (elementsHeight += elem.elemHeight + this.generalOffset))

      if (elementsHeight >= this.scrollBox.height) {
        this.enableScroll = true
      }
    }

    if (this.enableScroll) {
      let height = this.generalOffset
      height += (this.currentElem.elemHeight + this.generalOffset) * this.elements.length
      this.scrollBox.beginFill(0x575757).drawRect(0, 0, this.scrollBox.width, height).endFill()
      this.scrollTop = height
    }

    this.update()

    this.currentElem.setParent(this.content)
    this.inputField.setText('')
    this.currentElem = null
  }
}
