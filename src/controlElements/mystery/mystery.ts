import { ScrollView } from '../applications/chat/scrollView'
import { SelectMenu } from '../applications/chat/selectMenu'

export class Mystery {
  id: number
  lines: { id: number; line: string }[]
  lineIterator: IterableIterator<[number, { id: number; line: string }]>
  chatInterval: number
  maxChatCount: number
  scrollView: ScrollView
  selectMenu: SelectMenu

  paused: boolean = false
  isRepeat: boolean = false

  isCleard: boolean = false

  onCleared: () => void
  onChatLogic: (chat: any) => Promise<void>

  constructor(id: number, lines: { id: number; line: string }[], isRepeat: boolean) {
    this.id = id
    this.lines = lines
    this.lineIterator = lines.entries()
    this.maxChatCount = lines.length

    this.isRepeat = isRepeat
  }

  async startMystery() {
    await new Promise((resolve) => setTimeout(resolve, this.chatInterval * 1000))
    await this.waitUntil(() => !this.paused)

    const iteratable = this.lineIterator.next()
    const chat = iteratable.value[1]

    await this.onChatLogic(chat)

    this.scrollView.sendMessage()

    //チャットが終了するまでループ(iterator.doneはなぜか動かない)
    const done = iteratable.value[0] == this.maxChatCount - 1

    if (this.isCleard) {
      this.reset()
      this.onCleared()

      return
    }

    if (!done) {
      this.startMystery()
    } else if (this.isRepeat) {
      this.lineIterator = this.lines.entries()
      this.startMystery()
    }

    return
  }

  reset() {
    this.paused = false
    this.lineIterator = this.lines.entries()
  }

  waitUntil(conditionFunction) {
    const poll = (resolve) => {
      if (conditionFunction()) resolve()
      else setTimeout((_) => poll(resolve), 400)
    }

    return new Promise(poll)
  }
}
