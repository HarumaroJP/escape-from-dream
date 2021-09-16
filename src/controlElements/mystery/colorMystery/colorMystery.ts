import { AssetLoader } from '../../../core/assetLoader'
import { CmdHandler } from '../../../core/cmdHandler'
import { ChatElement } from '../../chat/chatElement/chatElement'
import { TextChatElement } from '../../chat/chatElement/textChatElement'
import { Mystery } from '../mystery'

export class SubMystery1 extends Mystery {
  requestedOp: string
  operations: { id: string; panelIdx: number }[] = []
  panelInfo: boolean[] = Array(6).fill(false)

  constructor(id: number, isRepeat: boolean) {
    super(id, AssetLoader.getMysteryLineData(id), isRepeat)

    this.onChatLogic = async (chat) => {
      if (chat.id == 0) {
        //if player
        const lines: string[] = chat.line.split(',')
        const ops: { line: string; op: string }[] = []

        lines.forEach((li) => {
          const msgs = li.split(':')
          const op = msgs.length == 1 ? undefined : msgs[1]
          ops.push({ line: msgs[0], op: op })
        })

        ops.forEach((msg) => {
          const element: ChatElement = new TextChatElement(0, msg.line)
          this.selectMenu.addElement(element)

          if (msg.op != undefined) {
            element.onClick.push(() => {
              this.requestedOp = msg.op
            })
          }
        })

        this.paused = true

        await this.waitUntil(() => !this.paused)
      } else if (chat.id == 1) {
        //if friend
        this.scrollView.setMessage(new TextChatElement(chat.id, chat.line))
      } else {
        //if command
        CmdHandler.Execute(chat.line)
      }
    }
  }

  registerOps() {
    this.operations.push({ id: 'lever-cyan', panelIdx: 0 })
    this.operations.push({ id: 'lever-purple', panelIdx: 1 })
    this.operations.push({ id: 'lever-white', panelIdx: 2 })
    this.operations.push({ id: 'button-red', panelIdx: 3 })
    this.operations.push({ id: 'button-green', panelIdx: 4 })
    this.operations.push({ id: 'button-blue', panelIdx: 5 })
  }
}
