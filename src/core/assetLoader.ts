import * as PIXI from 'pixi.js';
import * as PIXI_SOUND from 'pixi-sound'; // node_modulesから PIXI_SOUNDをインポート
import assetDatabase from './assetDatabase.json';
import axios from 'axios';
import { devVersion } from './main';

export class AssetLoader {
  dirList: string[] = [];
  static loader: PIXI.Loader = PIXI.Loader.shared;

  constructor() {
    //サウンドの初期化
    PIXI_SOUND.default.init();
  }

  loadSpriteAssets() {
    const dirName = assetDatabase.spriteDir + '/';

    assetDatabase.spriteList.forEach((path) => {
      console.log(dirName + path + '.png');
      AssetLoader.loader.add(path, dirName + path + '.png');
    });
  }

  load(callback: () => void): void {
    this.loadSpriteAssets();
    // preload
    AssetLoader.loader.load(async () => {
      console.log(
        'PIXI loaded. \n\n-- Project N 僕らの予知夢からの脱出 -- \ndevVersion : ' + devVersion
      );

      // 起動時にスプレットシートからgetする
      try {
        const res = await axios.get(
          'https://script.google.com/macros/s/AKfycbyQVt4nKc3ZZLpV5HDkZjHEWbbwwCWD4QQXFs3CeHI3IGTqHMNe4liu5AWieyH1A0R1FA/exec'
        );

        console.log(res.data);
        callback();
      } catch (error) {
        console.log(error);

        const { status, statusText } = error.response;
        console.log(`通信に失敗しました！ ${status} : ${statusText}`);
      }
    });
  }
  static getSprite(name: string): PIXI.Texture {
    return this.loader.resources[name].texture;
  }
}
