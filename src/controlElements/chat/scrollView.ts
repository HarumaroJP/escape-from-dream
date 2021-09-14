import { Scrollbox } from 'pixi-scrollbox'
import * as PIXI from 'pixi.js'
import { Target } from './chatDisplay'
import { ChatElement } from './chatElement'

export class ScrollView extends Scrollbox {
  scrollBox: PIXI.Graphics = new PIXI.Graphics()
  elements: ChatElement[] = []
  private generalOffset: number = 20

  create() {
    this.overflow = 'hidden'
    this.content.addChild(this.scrollBox)

    return this
  }

  reflesh(x: number, y: number, w: number, h: number) {
    this.x = x
    this.y = y

    this.boxWidth = w
    this.boxHeight = h
    this.scrollBox.beginFill(0x9bcde8).drawRect(0, 0, w, h).endFill()
    this.scrollBox.width = w
    this.scrollBox.height = h

    this.update()

    this.refleshElements()
  }

  refleshElements() {
    let count = 0
    this.elements.forEach((e) => {
      e.reflesh(count)
      this.scrollBox.y -= e.elemHeight
      count += 1
    })
  }

  enableScroll: boolean = false

  addElement(target: Target, str: string) {
    const element = new ChatElement(target, str, this.elements.length, this.generalOffset)
    this.elements.push(element)

    if (!this.enableScroll) {
      let elementsHeight: number = this.generalOffset
      this.elements.forEach((elem) => (elementsHeight += elem.elemHeight + this.generalOffset))

      if (elementsHeight >= this.scrollBox.height) {
        this.enableScroll = true
      }
    }

    if (this.enableScroll) {
      let height = this.generalOffset
      height += (element.elemHeight + this.generalOffset) * this.elements.length
      this.scrollBox.beginFill(0x9bcde8).drawRect(0, 0, this.scrollBox.width, height).endFill()
      this.scrollTop = height
    }

    this.update()

    this.content.addChild(element)
  }
}
