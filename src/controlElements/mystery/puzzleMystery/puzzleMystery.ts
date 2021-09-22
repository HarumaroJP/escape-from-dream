import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../../core/assetLoader'
import { CmdHandler } from '../../../core/cmdHandler'
import { frontContainer, gameScene } from '../../../core/main'
import { ChatElement } from '../../applications/chat/chatElement/chatElement'
import { TextChatElement } from '../../applications/chat/chatElement/textChatElement'
import { Mystery } from '../mystery'
import { LightsoutPanel } from './LightsoutPanel'

export class PuzzleMystery extends Mystery {
  panel: LightsoutPanel = new LightsoutPanel()

  constructor(id: number, isRepeat: boolean) {
    super(id, AssetLoader.getMysteryLineData(id), isRepeat)

    this.onChatLogic = async (chat) => {
      if (chat.id == 1) {
        //if command
        await CmdHandler.Execute(chat.line)
      } else if (chat.id == 2) {
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

  startLightsout() {
    gameScene.addChild(this.panel)
    frontContainer(this.panel)
    this.panel.onClear = () => {
      this.endLightsout()
    }
    this.panel.show()
  }

  endLightsout() {
    this.panel.hide(() => {
      gameScene.removeChild(this.panel)
      this.isCleard = true
    })
  }
}
