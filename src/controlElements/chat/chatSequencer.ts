import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../core/assetLoader'
import { ChatElement } from './chatElement'
import { ScrollView } from './scrollView'
import { SelectMenu } from './selectMenu'

export class ChatSequencer {
  lineIterator: IterableIterator<[number, { id: number; line: string }]>
  maxChatCount: number
  scrollView: ScrollView
  selectMenu: SelectMenu
  waitingPlayerInput: boolean = false

  chatInterval: number

  constructor(scrollView: ScrollView, selectMenu: SelectMenu) {
    this.lineIterator = AssetLoader.lineData.entries()
    this.maxChatCount = AssetLoader.lineData.length
    this.scrollView = scrollView
    this.selectMenu = selectMenu

    this.chatInterval = AssetLoader.getConfigById(0)
  }

  async start() {
    await new Promise((resolve) => setTimeout(resolve, this.chatInterval * 1000))

    const iteratable = this.lineIterator.next()
    const chat = iteratable.value[1]

    if (chat.id == 0) {
      const lines: string[] = chat.line.split(',')

      lines.forEach((str) => {
        const element: ChatElement = new ChatElement(0, str)
        this.selectMenu.addElement(element)
      })

      this.waitingPlayerInput = true

      await this.waitUntil(() => !this.waitingPlayerInput)
    } else {
      this.scrollView.setMessage(new ChatElement(chat.id, chat.line))
    }

    this.scrollView.sendMessage()

    //チャットが終了するまでループ(iterator.doneはなぜか動かない)
    const done = iteratable.value[0] == this.maxChatCount - 1

    if (!done) {
      this.start()
    }
  }

  waitUntil(conditionFunction) {
    const poll = (resolve) => {
      if (conditionFunction()) resolve()
      else setTimeout((_) => poll(resolve), 400)
    }

    return new Promise(poll)
  }
}
