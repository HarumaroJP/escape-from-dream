import * as PIXI from 'pixi.js'
import imageDatabase from './imageDatabase.json'
import videoDatabase from './videoDatabase.json'
import axios from 'axios'
import { devVersion } from './main'
import { GameData } from './GameData'

export class AssetLoader {
  private static gameData: GameData = new GameData()
  private static loader: PIXI.Loader = PIXI.Loader.shared
  private static spriteResources: Map<string, PIXI.Texture> = new Map<string, PIXI.Texture>()
  private static videoResources: Map<string, string> = new Map<string, string>()

  async loadSpriteAssets() {
    const spriteDirName = imageDatabase.spriteDir + '/'

    await Promise.all(
      imageDatabase.subDirList.map(async (subDir) => {
        subDir.spriteList.map((spriteName) => {
          // const texture = await loadSvg(
          //   dirName + subDir.name + '/' + spriteName + '.svg',
          //   100,
          //   100
          // )
          // AssetLoader.spriteResources.set(spriteName, texture)

          let extension: string

          if (spriteName.slice(-3) == 'png') {
            spriteName = spriteName.slice(0, -4)
            extension = '.png'
          } else if (spriteName.slice(-3) == 'jpg') {
            spriteName = spriteName.slice(0, -4)
            extension = '.jpg'
          } else {
            extension = '.svg'
          }

          AssetLoader.spriteResources.set(
            spriteName,
            PIXI.Texture.from(spriteDirName + subDir.name + '/' + spriteName + extension, {
              scaleMode: PIXI.SCALE_MODES.LINEAR,
            })
          )
        })
      })
    )

    const videoDirName = videoDatabase.videoDir + '/'

    await Promise.all(
      videoDatabase.videoList.map(async (video) => {
        const videoName = video.slice(0, -4)

        AssetLoader.videoResources.set(videoName, videoDirName + videoName + '.mp4')
      })
    )
  }

  load(callback: () => void): void {
    // preload
    AssetLoader.loader.load(async () => {
      console.log('PIXI loaded. \n\n-- Project N 僕らの予知夢からの脱出 -- \ndevVersion : ' + devVersion)

      await this.loadSpriteAssets()

      // 起動時にスプレットシートからgetする
      try {
        const res = await axios.get(
          'https://script.google.com/macros/s/AKfycbyQVt4nKc3ZZLpV5HDkZjHEWbbwwCWD4QQXFs3CeHI3IGTqHMNe4liu5AWieyH1A0R1FA/exec'
        )

        AssetLoader.gameData.applyData(res.data)
        callback()
      } catch (error) {
        console.log(error)

        const { status, statusText } = error.response
        console.log(`通信に失敗しました！ ${status} : ${statusText}`)
      }
    })
  }

  static getVideoTexture(name: string): PIXI.Texture {
    return PIXI.Texture.from(AssetLoader.videoResources.get(name),{})
  }

  static getTexture(name: string): PIXI.Texture<PIXI.Resource> {
    return AssetLoader.spriteResources.get(name)
  }

  static getNameById(id: number): string {
    return this.gameData.nameList.get(id)
  }

  static getMysteryLineData(id: number): { id: number; line: string }[] {
    return this.gameData.mysteryLines.find((elem) => elem.id == id).line
  }

  static getIconById(id: number): PIXI.Texture<PIXI.Resource> {
    switch (id) {
      case 3:
        return this.getTexture(this.getConfigByKey('chat_icon_A'))

      case 4:
        return this.getTexture(this.getConfigByKey('chat_icon_B'))

      case 5:
        return this.getTexture(this.getConfigByKey('chat_icon_C'))

      default:
        return undefined
    }
  }

  static getConfigByKey(key: string): any {
    return this.gameData.configList.get(key)
  }
}
