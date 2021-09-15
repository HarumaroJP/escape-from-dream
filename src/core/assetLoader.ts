import * as PIXI from 'pixi.js'
import assetDatabase from './assetDatabase.json'
import axios from 'axios'
import { devVersion } from './main'
import { GameData } from './GameData'
import { loadSvg } from './ImageLoader'

export class AssetLoader {
  private static gameData: GameData = new GameData()
  private static loader: PIXI.Loader = PIXI.Loader.shared
  private static spriteResources: Map<string, PIXI.Texture> = new Map<string, PIXI.Texture>()

  static get lineData(): { id: number; line: string }[] {
    return AssetLoader.gameData.lineList
  }

  async loadSpriteAssets() {
    const dirName = assetDatabase.spriteDir + '/'

    await Promise.all(
      assetDatabase.spriteList.map(async (name) => {
        const texture = await loadSvg(dirName + name + '.svg', 100, 100)
        AssetLoader.spriteResources.set(name, texture)
      })
    )
  }

  load(callback: () => void): void {
    // preload
    AssetLoader.loader.load(async () => {
      console.log(
        'PIXI loaded. \n\n-- Project N 僕らの予知夢からの脱出 -- \ndevVersion : ' + devVersion
      )

      await this.loadSpriteAssets()

      // 起動時にスプレットシートからgetする
      try {
        const res = await axios.get(
          'https://script.google.com/macros/s/AKfycbyQVt4nKc3ZZLpV5HDkZjHEWbbwwCWD4QQXFs3CeHI3IGTqHMNe4liu5AWieyH1A0R1FA/exec'
        )

        AssetLoader.gameData.applyData(res.data)

        console.log(res.data)
        callback()
      } catch (error) {
        console.log(error)

        const { status, statusText } = error.response
        console.log(`通信に失敗しました！ ${status} : ${statusText}`)
      }
    })
  }

  static getSprite(name: string): PIXI.Texture<PIXI.Resource> {
    return AssetLoader.spriteResources.get(name)
  }

  static getNameById(id: number): string {
    return this.gameData.nameList.get(id)
  }
}
