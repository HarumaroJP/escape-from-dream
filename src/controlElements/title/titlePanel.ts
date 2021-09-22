import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../core/assetLoader'
import { Renderable } from '../../core/renderable'
import { PIXIUtils } from '../../extensions/utils'
import { gsap } from 'gsap'

export class TitlePanel extends PIXI.Graphics implements Renderable {
  titleLogo: PIXI.Sprite
  // titleLogoStyle: PIXI.TextStyle = new PIXI.TextStyle({
  //   align: 'center',
  //   fontFamily: 'hirakaku',
  //   fontSize: '100px',
  //   fill: 0xffffff,
  // })

  titleText: PIXI.Text
  titleTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: 'hirakaku',
    lineHeight: 40,
    fontSize: '25px',
    fill: 0xffffff,
  })

  startText: PIXI.Text
  isFading: boolean

  onStart: () => void

  constructor() {
    super()
    this.interactive = true

    this.titleLogo = new PIXI.Sprite(AssetLoader.getSprite('title-logo'))
    // this.titleLogo = new PIXI.Text('僕らの予知夢からの脱出', this.titleLogoStyle)
    this.titleLogo.anchor.set(0.5)
    this.titleLogo.x = window.innerWidth * 0.5
    this.titleLogo.y = 250

    // this.titleLogo.y = window.innerHeight * 0.5

    PIXIUtils.resizeSprite(this.titleLogo, window.innerHeight * 0.5)

    this.beginFill(0x000000).drawRect(0, 0, window.innerWidth, window.innerHeight).endFill()

    const titleText =
      'ある日、あなたと友人たちは奇妙な夢を見た。\nそれは、正午に地下鉄全域が突如封鎖され、\nその1時間後に大規模な爆発が起きる夢だった。\n次の日、地下鉄の爆破事故は本当に起きてしまい、\n友人が巻き込まれてしまう。\n地下鉄に閉じ込められた友人を助ける為、\n僕らの脱出劇が始まる・・・！'

    this.titleText = new PIXI.Text(titleText, this.titleTextStyle)
    this.titleText.anchor.set(0.5)
    this.titleText.x = window.innerWidth * 0.5
    this.titleText.y = window.innerHeight * 0.5 + 150

    const startText = 'クリックで開始 ▶'

    this.startText = new PIXI.Text(startText, this.titleTextStyle)
    this.startText.anchor.set(0.5, 0)
    this.startText.x = window.innerWidth * 0.5
    this.startText.y = window.innerHeight - 100

    gsap
      .to(this.startText, {
        y: window.innerHeight - 100 + 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'Power2.easeInOut',
      })
      .play()

    this.addChild(this.titleLogo)
    this.addChild(this.titleText)
    this.addChild(this.startText)

    this.on('pointerdown', () => {
      if (this.isFading) return

      this.isFading = true
      gsap
      .to(this, {
          alpha: 0,
          duration: 2,
          ease: 'Power2.easeInOut',
          onComplete: () => {
            this.onStart()
          },
        })
        .play()
    })
  }

  onResize(): void {
    this.beginFill(0x000000).drawRect(0, 0, window.innerWidth, window.innerHeight).endFill()

    this.titleLogo.x = window.innerWidth * 0.5
    this.titleLogo.y = window.innerHeight * 0.5

    this.titleText.x = window.innerWidth * 0.5
    this.titleText.y = window.innerHeight * 0.5 + 100

    this.startText.x = window.innerWidth * 0.5
    this.startText.y = window.innerHeight - 100
  }
}
