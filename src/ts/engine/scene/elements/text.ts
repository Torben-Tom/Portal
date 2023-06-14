import Label from "./label.js";

class Text extends Label {
  constructor(
    x: number,
    y: number,
    foreground: string,
    font: string,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline,
    text: string,
    visible: boolean
  ) {
    super(
      x,
      y,
      0, ///TODO: Calculate based on text
      0, //TODO: Calculate based on text
      "rgba(0, 0, 0, 0)",
      foreground,
      "rgba(0, 0, 0, 0)",
      1,
      font,
      textAlign,
      textBaseline,
      text,
      visible
    );
  }
}

export default Text;
