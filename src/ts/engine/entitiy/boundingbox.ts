import Entity from "./entity.js";
import Rectangle from "./rectangle.js";
import RectangularArea from "./rectangulararea.js";

class BoundingBox implements RectangularArea {
  private _entity: Entity;
  private _widthExpansion: number;
  private _heightExpansion: number;

  get x(): number {
    return this._entity.x - this._widthExpansion / 2;
  }

  get y(): number {
    return this._entity.y - this._heightExpansion / 2;
  }

  get width(): number {
    return (
      this._entity.texture.width * this._entity.scalingX + this._widthExpansion
    );
  }

  get height(): number {
    return (
      this._entity.texture.height * this._entity.scalingY +
      this._heightExpansion
    );
  }

  get centerX(): number {
    return this.x + this.width / 2;
  }

  get centerY(): number {
    return this.y + this.height / 2;
  }

  constructor(entity: Entity, widthExpasion: number, heightExpansion: number) {
    this._entity = entity;
    this._widthExpansion = widthExpasion;
    this._heightExpansion = heightExpansion;
  }

  public isInside(x: number, y: number): boolean {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }

  public collidesWith(boundingBox: BoundingBox): boolean {
    return (
      this.x < boundingBox.x + boundingBox.width &&
      this.x + this.width > boundingBox.x &&
      this.y < boundingBox.y + boundingBox.height &&
      this.y + this.height > boundingBox.y
    );
  }

  public intersection(boundingBox: BoundingBox): Rectangle {
    let x = Math.max(this.x, boundingBox.x);
    let y = Math.max(this.y, boundingBox.y);
    let width = Math.min(
      this.x + this.width,
      boundingBox.x + boundingBox.width
    );
    let height = Math.min(
      this.y + this.height,
      boundingBox.y + boundingBox.height
    );

    return new Rectangle(x, y, width - x, height - y);
  }
}

export default BoundingBox;
