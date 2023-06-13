import Label from "./label.js";

class Text extends Label {
  constructor(
    x: number,
    y: number,
    visible: boolean,
    foreground: string,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline | undefined | null,
    font: string,
    text: string
  ) {
    super(
      x,
      y,
      0, ///TODO: Calculate based on text
      0, //TODO: Calculate based on text
      "rgba(0, 0, 0, 0)",
      "rgba(0, 0, 0, 0)",
      0,
      visible,
      foreground,
      textAlign,
      textBaseline,
      font,
      text
    );
  }
}

export default Text;
