import Entity from "./entity.js";

class BoundingBox {
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
    return this._entity.texture.width + this._widthExpansion;
  }

  get height(): number {
    return this._entity.texture.height + this._heightExpansion;
  }

  constructor(entity: Entity, width: number, height: number) {
    this._entity = entity;
    this._widthExpansion = width;
    this._heightExpansion = height;
  }

  isInside(x: number, y: number): boolean {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}

export default BoundingBox;
