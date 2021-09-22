import { Scrollbox } from 'pixi-scrollbox'
import * as PIXI from 'pixi.js'
import { TextRoundedRect } from '../../../extensions/textRoundedRect'
import { ChatElement } from './chatElement/chatElement'

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
    let nextElementPosY: number = this.generalOffset
    this.elements.forEach((e) => {
      e.setScrollView(nextElementPosY, this.boxWidth)
      this.scrollBox.y -= e.elemHeight
      nextElementPosY += e.elemHeight + this.generalOffset
    })
  }

  enableScroll: boolean = false
  currentElem: ChatElement = null

  setMessage(element: ChatElement) {
    this.currentElem = element

    console.log(element.target)

    if (element.isText && element.target == 2) {
      this.inputField.setText(element.getContent())
    }
  }

  sendMessage() {
    if (this.currentElem == null) return

    this.addElement(this.currentElem)

    this.inputField.setText('')
    this.currentElem = null
  }

  nextElementPosY: number = this.generalOffset

  addElement(element: ChatElement) {
    element.setScrollView(this.nextElementPosY, this.boxWidth)
    this.nextElementPosY += element.elemHeight + this.generalOffset
    this.elements.push(element)

    if (!this.enableScroll) {
      let elementsHeight: number = this.generalOffset
      this.elements.forEach((elem) => {
        elementsHeight += elem.elemHeight + this.generalOffset
      })

      if (elementsHeight >= this.scrollBox.height) {
        this.enableScroll = true
      }
    }

    if (this.enableScroll) {
      let height = this.nextElementPosY
      this.scrollBox.beginFill(0x575757).drawRect(0, 0, this.scrollBox.width, height).endFill()
      this.scrollTop = height
    }

    this.update()

    element.setParent(this.content)
  }
}
