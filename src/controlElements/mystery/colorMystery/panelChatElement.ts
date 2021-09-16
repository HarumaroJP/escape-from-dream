import * as PIXI from 'pixi.js'
import { SpriteChatElement } from '../../chat/chatElement/spriteChatElement'

export class PanelChatElement extends SpriteChatElement {
  constructor(target: number, panelInfo: boolean[]) {
    super(target, PIXI.Texture.WHITE)
  }

  
}
