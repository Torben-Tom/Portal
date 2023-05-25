//TODO: Rename x and y to sourceX and sourceY as they are the coordinates of the image on the source spirte sheet
class Texture {
  get htmlImageElement(): HTMLImageElement {
    throw new Error(
      `Texture ${this.constructor.name} does not implement the HtmlImageElement getter.`
    );
  }

  get x(): number {
    throw new Error(
      `Texture ${this.constructor.name} does not implement the x getter.`
    );
  }

  get y(): number {
    throw new Error(
      `Texture ${this.constructor.name} does not implement the y getter.`
    );
  }

  get width(): number {
    throw new Error(
      `Texture ${this.constructor.name} does not implement the width getter.`
    );
  }

  get height(): number {
    throw new Error(
      `Texture ${this.constructor.name} does not implement the height getter.`
    );
  }
}

export default Texture;
