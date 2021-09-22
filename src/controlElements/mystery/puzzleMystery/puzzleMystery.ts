import { AssetLoader } from '../../../core/assetLoader'
import { CmdHandler } from '../../../core/cmdHandler'
import { frontContainer, gameScene } from '../../../core/main'
import { TextChatElement } from '../../applications/chat/chatElement/textChatElement'
import { Mystery } from '../mystery'
import { LightsoutPanel } from './LightsoutPanel'

export class PuzzleMystery extends Mystery {
  panel: LightsoutPanel = new LightsoutPanel()

  constructor(id: number, isRepeat: boolean) {
    super(id, AssetLoader.getMysteryLineData(id), isRepeat)

    this.onChatLogic = async (chat) => {
      if (chat.id == 0) {
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
