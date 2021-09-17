import * as PIXI from 'pixi.js'
import assetDatabase from './assetDatabase.json'
import axios from 'axios'
import { devVersion } from './main'
import { GameData } from './GameData'

export class AssetLoader {
  private static gameData: GameData = new GameData()
  private static loader: PIXI.Loader = PIXI.Loader.shared
  private static spriteResources: Map<string, PIXI.Texture> = new Map<string, PIXI.Texture>()

  async loadSpriteAssets() {
    const dirName = assetDatabase.spriteDir + '/'

    await Promise.all(
      assetDatabase.subDirList.map(async (subDir) => {
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
          } else {
            extension = '.svg'
          }

          AssetLoader.spriteResources.set(
            spriteName,
            PIXI.Texture.from(dirName + subDir.name + '/' + spriteName + extension, {
              scaleMode: PIXI.SCALE_MODES.NEAREST,
            })
          )
        })
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

  static getSprite(name: string): PIXI.Texture<PIXI.Resource> {
    return AssetLoader.spriteResources.get(name)
  }

  static getNameById(id: number): string {
    return this.gameData.nameList.get(id)
  }

  static getMysteryLineData(id: number): { id: number; line: string }[] {
    return this.gameData.mysteryLines.find((elem) => elem.id == id).line
  }

  static getConfigById(index: number): any {
    return this.gameData.configList[index]
  }
}
