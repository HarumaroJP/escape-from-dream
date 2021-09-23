import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../../core/assetLoader'
import { CmdHandler } from '../../../core/cmdHandler'
import { ChatElement } from '../../applications/chat/chatElement/chatElement'
import { TextChatElement } from '../../applications/chat/chatElement/textChatElement'
import { Mystery } from '../mystery'

export class BombMystery extends Mystery {
  requestedOp: string
  operations: { id: string; panelIdx: number }[] = []
  panelInfo: boolean[] = Array(6).fill(false)

  isAlreadyFailed: boolean = false
  attempt: number = 1
  maxAttempt: number = 3

  readonly clearPattern: number[] = [0, 1, 3]

  constructor(id: number, isRepeat: boolean) {
    super(id, AssetLoader.getMysteryLineData(id), isRepeat)

    this.registerOps()

    this.onChatLogic = async (chat) => {
      if (chat.id == 1) {
        //if command
        await CmdHandler.Execute(chat.line)
      } else if (chat.id == 2) {
        //if player
        const lines: string[] = chat.line.split(',')
        const ops: { line: string; op: string }[] = []

        //parse to operation
        lines.forEach((li) => {
          const msgs = li.split(':')
          const op = msgs.length == 1 ? undefined : msgs[1]
          ops.push({ line: msgs[0], op: op })
        })

        //add chatElement
        ops.forEach((msg) => {
          const element: ChatElement = new TextChatElement(2, msg.line)
          this.selectMenu.addElement(element)

          if (msg.op != undefined) {
            element.onClick.push(() => {
              this.requestedOp = msg.op
            })
          }
        })

        this.paused = true

        await this.waitUntil(() => !this.paused)
      } else {
        //if friend
        const element: ChatElement = new TextChatElement(chat.id, chat.line)
        element.setIcon(AssetLoader.getIconById(chat.id))
        this.scrollView.setMessage(element)
      }
    }
  }

  getOperation(key: string): { id: string; panelIdx: number } {
    return this.operations.find((opElm) => opElm.id == key)
  }

  getPatternAt(idx: number): number[] {
    return this.clearPattern.slice(0, idx)
  }

  nextAttempt() {
    console.log(this.panelInfo)

    const currentPattern = this.getPatternAt(this.attempt - 1)

    const isClear = currentPattern.every((idx) => this.panelInfo[idx] == true)

    if (!this.isAlreadyFailed && !isClear) {
      this.isAlreadyFailed = true
    }

    if (this.attempt == this.maxAttempt) {
      if (!this.isAlreadyFailed) {
        console.log('clear')

        this.isCleard = true
      }

      this.resetButtons()
      this.attempt = 1
      this.isAlreadyFailed = false

      return
    }

    this.attempt++
  }

  resetButtons() {
    this.operations.forEach((obj) => (this.panelInfo[obj.panelIdx] = false))
  }

  registerOps() {
    this.operations.push({ id: 'cut-red', panelIdx: 0 })
    this.operations.push({ id: 'cut-blue', panelIdx: 1 })
    this.operations.push({ id: 'cut-yellow', panelIdx: 2 })
    this.operations.push({ id: 'cut-green', panelIdx: 3 })
    this.operations.push({ id: 'cut-pink', panelIdx: 4 })
    this.operations.push({ id: 'cut-brown', panelIdx: 5 })
  }
}
