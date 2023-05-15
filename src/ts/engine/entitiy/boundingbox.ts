import Entity from "./entity.js";

class BoundingBox {
  private _entity: Entity;
  private _width: number;
  private _height: number;

  constructor(entity: Entity, width: number, height: number) {
    this._entity = entity;
    this._width = width;
    this._height = height;
  }

  isInside(x: number, y: number): boolean {
    return (
      x >= this._entity.x &&
      x <= this._entity.x + this._width &&
      y >= this._entity.y &&
      y <= this._entity.y + this._height
    );
  }
}

export default BoundingBox;
