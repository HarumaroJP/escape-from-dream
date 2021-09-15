import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../core/assetLoader'
import { ScrollView } from './scrollView'

export class ChatSequencer {
  lineIterator: IterableIterator<[number, { id: number; line: string }]>
  maxChatCount: number
  scrollView: ScrollView

  chatInterval: number = 2

  constructor(scrollView: ScrollView) {
    console.log(AssetLoader.lineData)

    this.lineIterator = AssetLoader.lineData.entries()
    this.maxChatCount = AssetLoader.lineData.length
    this.scrollView = scrollView
  }

  async start() {
    await new Promise((resolve) => setTimeout(resolve, this.chatInterval * 1000))

    const iteratable = this.lineIterator.next()
    const chat = iteratable.value[1]

    this.scrollView.addElement(chat.id, chat.line)

    //チャットが終了するまでループ(iterator.doneはなぜか動かない)
    const done = iteratable.value[0] == this.maxChatCount - 1

    if (!done) {
      this.start()
    }
  }
}
