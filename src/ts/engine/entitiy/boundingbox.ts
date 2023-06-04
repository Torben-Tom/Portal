import Entity from "./entity.js";
import Rectangle from "../math/rectangle.js";
import RectangularArea from "../math/rectangulararea.js";
import Vector2D from "../math/vector2d.js";

class BoundingBox implements RectangularArea {
  private _entity: Entity;
  private _widthExpansion: number;
  private _heightExpansion: number;
  private _passThrough: boolean;

  get location(): Vector2D {
    return new Vector2D(
      this._entity.location.x - this._widthExpansion / 2,
      this._entity.location.y - this._heightExpansion / 2
    );
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

  get center(): Vector2D {
    return new Vector2D(
      this.location.x + this.width / 2,
      this.location.y + this.height / 2
    );
  }

  get passThrough(): boolean {
    return this._passThrough;
  }

  constructor(
    entity: Entity,
    widthExpasion: number,
    heightExpansion: number,
    passThrough: boolean
  ) {
    this._entity = entity;
    this._widthExpansion = widthExpasion;
    this._heightExpansion = heightExpansion;
    this._passThrough = passThrough;
  }

  public isInside(location: Vector2D): boolean {
    return (
      location.x >= this.location.x &&
      location.x <= this.location.x + this.width &&
      location.y >= this.location.y &&
      location.y <= this.location.y + this.height
    );
  }

  public touches(boundingBox: BoundingBox): boolean {
    return (
      this.location.x < boundingBox.location.x + boundingBox.width &&
      this.location.x + this.width > boundingBox.location.x &&
      this.location.y < boundingBox.location.y + boundingBox.height &&
      this.location.y + this.height > boundingBox.location.y
    );
  }

  public intersect(rectangularArea: RectangularArea): Rectangle {
    let x = Math.max(this.location.x, rectangularArea.location.x);
    let y = Math.max(this.location.y, rectangularArea.location.y);
    let width = Math.min(
      this.location.x + this.width,
      rectangularArea.location.x + rectangularArea.width
    );
    let height = Math.min(
      this.location.y + this.height,
      rectangularArea.location.y + rectangularArea.height
    );

    return new Rectangle(x, y, width - x, height - y);
  }
}

export default BoundingBox;
