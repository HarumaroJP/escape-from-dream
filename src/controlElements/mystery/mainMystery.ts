import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../core/assetLoader'
import { CmdHandler } from '../../core/cmdHandler'
import { ChatElement } from '../applications/chat/chatElement/chatElement'
import { TextChatElement } from '../applications/chat/chatElement/textChatElement'
import { Mystery } from './mystery'

export class MainMystery extends Mystery {
  constructor(id: number, isRepeat: boolean) {
    super(id, AssetLoader.getMysteryLineData(id), isRepeat)

    this.onChatLogic = async (chat) => {
      if (chat.id == 1) {
        //if command
        await CmdHandler.Execute(chat.line)
      } else if (chat.id == 2) {
        //if player
        const lines: string[] = chat.line.split(',')

        lines.forEach((str) => {
          const element: ChatElement = new TextChatElement(0, str)
          this.selectMenu.addElement(element)
        })

        this.paused = true

        await this.waitUntil(() => !this.paused)
      } else {
        //if friend
        const element: ChatElement = new TextChatElement(chat.id, chat.line)
        element.setIcon(PIXI.Texture.WHITE)
        this.scrollView.setMessage(element)
      }
    }
  }
}
