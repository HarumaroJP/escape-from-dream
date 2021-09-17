import * as PIXI from 'pixi.js'
import { app } from '../../core/main'
import { Renderable } from '../../core/renderable'
import { CustomRoundedShape } from '../../extensions/customRoundedShape'

export class TimeBar extends PIXI.Container implements Renderable {
  timeBar: CustomRoundedShape = new CustomRoundedShape()

  textStyle: PIXI.TextStyle = new PIXI.TextStyle({
    fill: '#f0f0f0',
    fontFamily: 'Inter',
    fontSize: 30,
  })
  timeText: PIXI.Text = new PIXI.Text('0000/00/00 00:00:00', this.textStyle)

  barWidth: number = 400
  barHeight: number = 80
  barColor: number = 0x2e2e2e

  edgeOffset: number = 20

  create(): PIXI.Container {
    this.timeBar.alpha = 0.5
    this.timeText.anchor.set(0.5)

    this.addChild(this.timeBar)
    this.addChild(this.timeText)

    this.setTimer()

    this.reflesh()

    return this
  }

  setTimer() {
    window.setInterval(() => {
      const now = new Date()

      // "YYYY/MM/DD HH:MM:SS"の形式にフォーマット
      // 可読性無視で
      const text = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(
        now.getDate()
      ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(
        2,
        '0'
      )}:${String(now.getSeconds()).padStart(2, '0')}`

      this.timeText.text = text
    }, 1000)
  }

  reflesh() {
    const barSideRadius = this.barHeight * 0.5

    this.x = app.screen.width - this.barWidth - barSideRadius - this.edgeOffset
    this.y = app.screen.height - this.barHeight - this.edgeOffset

    this.timeBar.drawCustomCapusle(this.barWidth, this.barHeight, this.barColor, true, true)
    this.timeBar.alpha = 0.5

    this.timeText.x = this.barWidth * 0.5
    this.timeText.y = this.barHeight * 0.5

    this.timeBar.alpha = 0.3
  }

  onResize(): void {
    this.reflesh()
  }
}
