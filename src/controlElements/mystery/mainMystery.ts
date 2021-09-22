import { AssetLoader } from '../../core/assetLoader'
import { CmdHandler } from '../../core/cmdHandler'
import { ChatElement } from '../applications/chat/chatElement/chatElement'
import { TextChatElement } from '../applications/chat/chatElement/textChatElement'
import { Mystery } from './mystery'

export class MainMystery extends Mystery {
  constructor(id: number, isRepeat: boolean) {
    super(id, AssetLoader.getMysteryLineData(id), isRepeat)

    this.onChatLogic = async (chat) => {
      if (chat.id == 0) {
        //if player
        const lines: string[] = chat.line.split(',')

        lines.forEach((str) => {
          const element: ChatElement = new TextChatElement(0, str)
          this.selectMenu.addElement(element)
        })

        this.paused = true

        await this.waitUntil(() => !this.paused)
      } else if (chat.id == 1) {
        //if friend
        this.scrollView.setMessage(new TextChatElement(chat.id, chat.line))
      } else {
        //if command
       await CmdHandler.Execute(chat.line)
      }
    }
  }
}
