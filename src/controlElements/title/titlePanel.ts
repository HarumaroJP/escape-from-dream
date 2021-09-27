import * as PIXI from 'pixi.js'
import { AssetLoader } from '../../core/assetLoader'
import { Renderable } from '../../core/renderable'
import { PIXIUtils } from '../../extensions/utils'
import { gsap } from 'gsap'
import { VideoPanel } from '../../core/videoPanel'
import { gameScene, videoScene } from '../../core/main'

export class TitlePanel extends PIXI.Graphics implements Renderable {
  titleContainer: PIXI.Container = new PIXI.Container()
  tradeContainer: PIXI.Container = new PIXI.Container()

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
  tradeMarkText: PIXI.Text
  tradeMarkTextStyle: PIXI.TextStyle = new PIXI.TextStyle({
    align: 'center',
    fontFamily: 'hirakaku',
    lineHeight: 40,
    fontSize: '25px',
    fill: 0xffffff,
  })

  isFading: boolean

  infoPanelHeight: number = 90
  infoPanelOffsetX: number = 90
  infoPanelSpace: number = 20
  info_title: PIXI.Sprite = new PIXI.Sprite(AssetLoader.getTexture('info_title'))
  info_ei: PIXI.Sprite = new PIXI.Sprite(AssetLoader.getTexture('info_ei'))
  info_jiro: PIXI.Sprite = new PIXI.Sprite(AssetLoader.getTexture('info_jiro'))
  info_taro: PIXI.Sprite = new PIXI.Sprite(AssetLoader.getTexture('info_taro'))

  onStart: () => void

  constructor() {
    super()
    this.interactive = true

    this.titleLogo = new PIXI.Sprite(AssetLoader.getTexture('title-logo'))
    this.titleLogo.anchor.set(0.5)
    this.titleLogo.x = window.innerWidth * 0.5
    this.titleLogo.y = 250

    PIXIUtils.resizeSpriteByHeight(this.titleLogo, window.innerHeight * 0.5)

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

    const tradeMark =
      '授業主催： N・S高\n協力：株式会社SCRAP\n企画制作：N・S高生\n「リアル脱出ゲーム」は株式会社SCRAPの登録商標です。\n\n株式会社SCRAPとN・S高で実施した授業「リアル脱出ゲームの作り方」の一環で\n生徒が制作したものであり、SCRAPが主催/公認するものではありません。'

    this.tradeMarkText = new PIXI.Text(tradeMark, this.tradeMarkTextStyle)
    this.tradeMarkText.anchor.set(0.5, 0.5)
    this.tradeMarkText.x = window.innerWidth * 0.5
    this.tradeMarkText.y = window.innerHeight * 0.5

    this.info_title.anchor.set(0, 1)
    this.info_ei.anchor.set(0, 1)
    this.info_jiro.anchor.set(0, 1)
    this.info_taro.anchor.set(0, 1)

    PIXIUtils.resizeSpriteByHeight(this.info_title, this.infoPanelHeight - 40)
    PIXIUtils.resizeSpriteByHeight(this.info_ei, this.infoPanelHeight)
    PIXIUtils.resizeSpriteByHeight(this.info_jiro, this.infoPanelHeight)
    PIXIUtils.resizeSpriteByHeight(this.info_taro, this.infoPanelHeight)

    this.info_title.x = this.infoPanelOffsetX + this.info_title.width * 0.25
    this.info_title.y = window.innerHeight - this.infoPanelHeight * 4 - this.infoPanelSpace * 3

    this.info_ei.x = this.infoPanelOffsetX
    this.info_ei.y = window.innerHeight - this.infoPanelHeight * 3 - this.infoPanelSpace * 2

    this.info_jiro.x = this.infoPanelOffsetX
    this.info_jiro.y = window.innerHeight - this.infoPanelHeight * 2 - this.infoPanelSpace

    this.info_taro.x = this.infoPanelOffsetX
    this.info_taro.y = window.innerHeight - this.infoPanelHeight

    gsap
      .to(this.startText, {
        y: window.innerHeight - 100 + 20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'Power2.easeInOut',
      })
      .play()

    this.addChild(this.titleContainer)
    this.addChild(this.tradeContainer)

    this.tradeContainer.alpha = 0

    this.titleContainer.addChild(this.titleLogo)
    this.titleContainer.addChild(this.titleText)
    this.titleContainer.addChild(this.startText)
    this.titleContainer.addChild(this.info_title)
    this.titleContainer.addChild(this.info_ei)
    this.titleContainer.addChild(this.info_jiro)
    this.titleContainer.addChild(this.info_taro)

    this.tradeContainer.addChild(this.tradeMarkText)

    this.on('pointerdown', () => {
      if (this.isFading) return

      this.isFading = true
      const fadeLine = gsap.timeline()

      fadeLine.to(this.titleContainer, {
        alpha: 0,
        duration: 2,
        ease: 'Power2.easeInOut',
      })

      fadeLine.to(this.tradeContainer, {
        alpha: 1,
        duration: 3,
        ease: 'Power2.easeInOut',
      })

      fadeLine.to(this.tradeContainer, {
        alpha: 0,
        duration: 3,
        ease: 'Power2.easeInOut',
        delay: 1,
        onComplete: () => {
          const video: { src: any; panel: PIXI.Graphics } = VideoPanel.play('op', 30, () => {
            this.onStart()
          })
          videoScene.addChild(video.panel)
        },
      })
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
