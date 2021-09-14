import * as PIXI from 'pixi.js';
import { CustomRoundedShape } from '../../extensions/customRoundedShape';

export class TextRoundedRect extends CustomRoundedShape {
  fieldText: PIXI.Text;

  constructor(style: PIXI.TextStyle) {
    super();
    this.fieldText = new PIXI.Text('', style);
  }

  setText(text: string) {
    this.fieldText.text = text;
  }

  reflesh() {}
}
