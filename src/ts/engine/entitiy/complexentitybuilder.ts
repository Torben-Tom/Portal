import Texture from "../assets/texture/texture.js";
import Vector2D from "../math/vector2d.js";
import ComplexEntity from "./complexentity.js";
import Entity from "./entity.js";

class ComplexEntityBuilder {
  private _x: number;
  private _y: number;
  private _static: boolean;
  private _expansionX: number;
  private _expansionY: number;
  private _passThrough: boolean;
  private _texture: Texture;
  private _parts: Map<Vector2D, Entity>;

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public get static(): boolean {
    return this._static;
  }

  public get expansionX(): number {
    return this._expansionX;
  }

  public get expansionY(): number {
    return this._expansionY;
  }

  public get passThrough(): boolean {
    return this._passThrough;
  }

  public get texture(): Texture {
    return this._texture;
  }

  public get parts(): Map<Vector2D, Entity> {
    return this._parts;
  }

  constructor(
    x: number,
    y: number,
    _static: boolean,
    expansionX: number,
    expansionY: number,
    passThrough: boolean,
    texture: Texture
  ) {
    this._x = x;
    this._y = y;
    this._static = _static;
    this._expansionX = expansionX;
    this._expansionY = expansionY;
    this._passThrough = passThrough;
    this._texture = texture;
    this._parts = new Map<Vector2D, Entity>();
  }

  public createPart(
    offset: Vector2D,
    scalingX: number,
    scalingY: number,
    texture: Texture
  ): ComplexEntityBuilder {
    this._parts.set(
      offset,
      new Entity(
        this.x + offset.x,
        this.y + offset.y,
        scalingX,
        scalingY,
        false,
        0,
        0,
        true,
        texture
      )
    );
    return this;
  }

  public addPart(offset: Vector2D, entity: Entity): ComplexEntityBuilder {
    this._parts.set(offset, entity);
    return this;
  }

  public build(): ComplexEntity {
    return new ComplexEntity(this);
  }
}

export default ComplexEntityBuilder;
