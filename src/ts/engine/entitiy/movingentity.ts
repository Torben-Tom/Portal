import Texture from "../assets/texture/texture.js";
import Direction from "../math/direction.js";
import Matrix2D from "../math/matrix2d.js";
import Vector2D from "../math/vector2d.js";
import Entity from "./entity.js";

class MovingEntity extends Entity {
  private _collisions: boolean[];
  private _velocity: Vector2D;

  private p = false;

  public get onGround(): boolean {
    return this._collisions[Direction.BOTTOM];
  }

  public set onGround(value: boolean) {
    this._collisions[Direction.BOTTOM] = value;
  }

  public get velocity(): Vector2D {
    return this._velocity;
  }

  public set velocity(value: Vector2D) {
    this._velocity = value;
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
    super(
      x,
      y,
      rotation,
      centerOfMassX,
      centerOfMassY,
      scalingX,
      scalingY,
      expansionX,
      expansionY,
      passThrough,
      texture
    );

    this._collisions = [false, false, false, false];
    this._velocity = new Vector2D(0, 0);
  }

  public addVelocity(velocity: Vector2D): void {
    this._velocity = this._velocity.add(velocity);
  }

  public update(tickDelta: number): void {
    super.update(tickDelta);

    if (this._collisions[Direction.TOP] && this._velocity.y < 0) {
      this._velocity = new Matrix2D(1, 0, 0, 0).multiplyVector(this._velocity);
    }
    if (this._collisions[Direction.RIGHT] && this._velocity.x > 0) {
      this._velocity = new Matrix2D(0, 0, 0, 1).multiplyVector(this._velocity);
    }
    if (this._collisions[Direction.BOTTOM]) {
      if (this._velocity.y > 0) {
        this._velocity = new Matrix2D(1, 0, 0, 0).multiplyVector(
          this._velocity
        );
      }
    } else {
      this.addVelocity(new Vector2D(0, 0.1 * tickDelta));
    }
    if (this._collisions[Direction.LEFT] && this._velocity.x < 0) {
      this._velocity = new Matrix2D(0, 0, 0, 1).multiplyVector(this._velocity);
    }

    if (this.onGround) {
      this._velocity = new Matrix2D(0.85, 0, 0, 1).multiplyVector(
        this._velocity
      );
    } else {
      this._velocity = new Matrix2D(0.98, 0, 0, 1).multiplyVector(
        this._velocity
      );
    }

    let newLocation = this.location.add(
      this._velocity.multiplyScalar(tickDelta).multiplyScalar(1 / 100)
    );

    this.teleport(newLocation);
  }
}

export default MovingEntity;
