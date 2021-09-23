import * as PIXI from 'pixi.js'
import { CustomRoundedShape } from '../extensions/customRoundedShape'
import { AssetLoader } from './assetLoader'
import { app, backContainer, frontContainer } from './main'
import { Renderable } from './renderable'

export class Window extends PIXI.Container implements Renderable {
  titleBar: CustomRoundedShape = new CustomRoundedShape()
  titleText: PIXI.Text
  titleTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: 'hirakaku',
    fontSize: '18px',
    fill: 0x000000,
  })

  isClosable: boolean = false
  closeButton: PIXI.Sprite
  closeButtonSizeOffset: number = 10

  //window property
  winWidth: number
  winHeight: number

  winX: number
  winY: number

  winColor: number = 0xededed

  //title property
  magicOffset: number = 50

  titleHeight: number = 30
  roundOffset: number = 20

  //edge property
  round: number = 10
  thickness: number = 3

  isPointing: boolean

  constructor(titleText: string) {
    super()
    this.titleText = new PIXI.Text(titleText, this.titleTextStyle)
    this.titleText.anchor.set(0.5)
  }

  onResize(): void {}

  createWindow(isClosable: boolean) {
    this.toDraggable(this.titleBar, this)
    this.addChild(this.titleBar)
    this.titleBar.addChild(this.titleText)

    this.interactive = true
    this.children.forEach((c) => (c.interactive = true))

    this.isClosable = isClosable

    if (isClosable) {
      this.closeButton = new PIXI.Sprite(AssetLoader.getTexture('close-button'))
      this.closeButton.interactive = true
      this.closeButton.buttonMode = true
      this.closeButton.on('pointerdown', () => {
        this.close()
      })

      const buttonSize = this.titleHeight - this.closeButtonSizeOffset
      this.closeButton.width = buttonSize
      this.closeButton.height = buttonSize

      this.addChild(this.closeButton)
    }
  }

  setWindowSize(w: number, h: number) {
    this.winWidth = w
    this.winHeight = h

    this.winX = (app.screen.width - w) * 0.5
    this.winY = (app.screen.height - h) * 0.5 + this.titleHeight - this.roundOffset - this.magicOffset
  }

  refleshWindow() {
    this.titleBar.x = this.winX
    this.titleBar.y = this.winY - this.titleHeight
    this.titleBar
      .clear()
      .drawCustomRect(this.round, this.winWidth, this.titleHeight, this.winColor, true, true, false, false)

    this.titleText.x = this.winWidth * 0.5
    this.titleText.y = this.titleHeight * 0.5

    if (this.isClosable) {
      this.closeButton.x = this.winX + this.winWidth - this.titleHeight + this.closeButtonSizeOffset * 0.5
      this.closeButton.y = this.winY - this.titleHeight + this.closeButtonSizeOffset * 0.5
    }
    // this.edge.x = this.titleBar.x - this.thickness;
    // this.edge.y = this.titleBar.y - this.thickness;

    // this.edge
    //   .beginFill(this.winColor)
    //   .drawRoundedRect(
    //     0,
    //     0,
    //     this.winWidth + this.thickness * 2,
    //     this.winHeight + this.titleHeight + this.thickness * 2,
    //     this.radius
    //   )
    //   .endFill();
  }

  open() {
    frontContainer(this)
    this.renderable = true
    this.enable()
  }

  close() {
    backContainer(this)
    this.renderable = false
    this.disable()
  }

  enable() {
    this.titleBar.renderable = true
    this.titleBar.interactive = true
    this.titleBar.buttonMode = true

    this.closeButton.renderable = true
    this.closeButton.interactive = true
    this.closeButton.buttonMode = true
  }

  disable() {
    this.titleBar.renderable = false
    this.titleBar.interactive = false
    this.titleBar.buttonMode = false

    this.closeButton.renderable = false
    this.closeButton.interactive = false
    this.closeButton.buttonMode = false
  }

  toDraggable(draggable: PIXI.Container, movable: PIXI.Container) {
    draggable.interactive = true
    draggable.buttonMode = true
    movable.interactive = true

    let isDraggable: boolean
    let data: PIXI.InteractionData
    let dragPoint: PIXI.Point

    let pointOffset: PIXI.Point

    draggable
      .on('pointerdown', (e: PIXI.InteractionEvent) => {
        data = e.data
        pointOffset = data.getLocalPosition(movable)
        isDraggable = true
      })
      .on('pointermove', () => {
        if (!isDraggable) return

        dragPoint = data.getLocalPosition(movable.parent)
        movable.x = dragPoint.x - pointOffset.x
        movable.y = dragPoint.y - pointOffset.y
      })
      .on('pointerup', () => {
        data = null
        isDraggable = false
      })
  }
}
