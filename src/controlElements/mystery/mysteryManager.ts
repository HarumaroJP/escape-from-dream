import { AssetLoader } from '../../core/assetLoader'
import { CmdHandler } from '../../core/cmdHandler'
import { ScrollView } from '../chat/scrollView'
import { SelectMenu } from '../chat/selectMenu'
import { SpriteChatElement } from '../chat/chatElement/spriteChatElement'
import { MainMystery } from './mainMystery'
import { Mystery } from './mystery'
import { SubMystery1 as ColorMystery } from './colorMystery/colorMystery'
import { PanelChatElement } from './colorMystery/panelChatElement'

export class MysteryManager {
  currentMystery: Mystery
  mysteries: Mystery[] = []
  scrollView: ScrollView
  selectMenu: SelectMenu

  mainMys: MainMystery = new MainMystery(0, false)
  colorMys: ColorMystery = new ColorMystery(1, true)

  constructor(scrollView: ScrollView, selectMenu: SelectMenu) {
    this.scrollView = scrollView
    this.selectMenu = selectMenu

    this.mysteries.push(this.mainMys)
    this.mysteries.push(this.colorMys)
    this.mysteries.forEach((mys) => {
      mys.scrollView = scrollView
      mys.selectMenu = selectMenu
      mys.chatInterval = AssetLoader.getConfigById(0)
    })

    CmdHandler.Register('image', (args) => {
      const spriteName = args[0]
      this.scrollView.setMessage(new SpriteChatElement(1, AssetLoader.getSprite(spriteName)))
    })

    CmdHandler.Register('mystery', async (args) => {
      console.log(+args[0])
      const mysteryID = +args[0]

      //cant stop mainMystery
      if (mysteryID == 0) return

      const mystery = this.getMystery(mysteryID)

      this.pause(0)
      this.start(mysteryID)

      mystery.onCleared = () => {
        this.restart(0)
      }
    })

    CmdHandler.Register('mystery-result', () => {
      const op = this.colorMys.operations.find((opElm) => opElm.id == this.colorMys.requestedOp)

      if (op != undefined) {
        this.colorMys.panelInfo[op.panelIdx] = !this.colorMys.panelInfo[op.panelIdx]

        if (op.lampIdx != -1) {
          this.colorMys.panelInfo[op.lampIdx] = !this.colorMys.panelInfo[op.lampIdx]
        }
      }

      this.scrollView.setMessage(new PanelChatElement(1, this.colorMys.panelInfo))
      this.colorMys.requestedOp = ''
    })
  }

  start(id: number) {
    this.currentMystery = this.getMystery(id)
    this.currentMystery.startMystery()
  }

  pause(id: number) {
    this.getMystery(id).paused = true
  }

  restart(id: number) {
    this.getMystery(id).paused = false
  }

  getMystery(id: number): Mystery {
    return this.mysteries.find((mys) => mys.id == id)
  }
}
