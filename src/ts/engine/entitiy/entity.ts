import Texture from "../assets/texture/texture.js";
import Vector2D from "../math/vector2d.js";
import BoundingBox from "./boundingbox.js";

class Entity {
  protected _location: Vector2D;
  protected _rotation: number;
  private _centerOfMass: Vector2D;
  private _scalingX: number;
  private _scalingY: number;
  private _boundingBox: BoundingBox;
  private _texture: Texture;

  get location(): Vector2D {
    return this._location;
  }

  get rotation(): number {
    return this._rotation;
  }

  get centerOfMass(): Vector2D {
    return this._centerOfMass;
  }

  set centerOfMass(centerOfMass: Vector2D) {
    this._centerOfMass = centerOfMass;
  }

  get centerOfMassAbsolute(): Vector2D {
    return this._location.add(this._centerOfMass);
  }

  get scalingX(): number {
    return this._scalingX;
  }

  get scalingY(): number {
    return this._scalingY;
  }

  get boundingBox(): BoundingBox {
    return this._boundingBox;
  }

  get texture(): Texture {
    return this._texture;
  }

  constructor(
    x: number,
    y: number,
    rotation: number,
    centerOfMassX: number,
    centerOfMassY: number,
    scalingX: number,
    scalingY: number,
    expansionX: number,
    expansionY: number,
    passThrough: boolean,
    texture: Texture
  ) {
    this._location = new Vector2D(x, y);
    this._rotation = rotation;
    this._centerOfMass = new Vector2D(centerOfMassX, centerOfMassY);
    this._scalingX = scalingX;
    this._scalingY = scalingY;
    this._boundingBox = new BoundingBox(
      this,
      expansionX,
      expansionY,
      passThrough
    );
    this._texture = texture;
  }

  public teleport(location: Vector2D) {
    this._location = location;
  }

  public rotate(rotation: number) {
    this._rotation = rotation;
  }

  public load() {}
  public unload() {}
  public update(tickDelta: number) {}
}

export default Entity;
