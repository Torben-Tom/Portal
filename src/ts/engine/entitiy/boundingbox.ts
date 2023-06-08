import Entity from "./entity.js";
import Rectangle from "../math/rectangle.js";
import RectangularArea from "../math/rectangulararea.js";
import Vector2D from "../math/vector2d.js";
import Matrix2D from "../math/matrix2d.js";
import Direction from "../math/direction.js";
import PolygonBuilder from "../math/polygonbuilder.js";
import Polygon from "../math/polygon.js";

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

  get centerOfMass(): Vector2D {
    let offsetToEntity = this.location.subtract(this._entity.location);
    return offsetToEntity.add(this._entity.centerOfMass);
  }

  get passThrough(): boolean {
    return this._passThrough;
  }

  get corners(): Vector2D[] {
    let x = this.location.x;
    let y = this.location.y;
    let radians = (this._entity.rotation / 180) * Math.PI;
    let relCenter = this._entity.centerOfMass;
    let absCenter = this.location.add(this.centerOfMass);

    let topLeft = Matrix2D.rotationMatrix(radians)
      .multiplyVector(new Vector2D(0, 0).subtract(relCenter))
      .add(absCenter);

    let topRight = Matrix2D.rotationMatrix(radians)
      .multiplyVector(new Vector2D(this.width, 0).subtract(relCenter))
      .add(absCenter);

    let bottomLeft = Matrix2D.rotationMatrix(radians)
      .multiplyVector(new Vector2D(0, this.height).subtract(relCenter))
      .add(absCenter);

    let bottomRight = Matrix2D.rotationMatrix(radians)
      .multiplyVector(new Vector2D(this.width, this.height).subtract(relCenter))
      .add(absCenter);

    return [topLeft, topRight, bottomLeft, bottomRight];
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
    let corners: Vector2D[] = this.corners;

    let b1 = corners[Direction.TOP_RIGHT].subtract(corners[Direction.TOP_LEFT]);
    let b2 = corners[Direction.BOTTOM_LEFT].subtract(
      corners[Direction.TOP_LEFT]
    );

    let B = b1.concatenate(b2); //TODO: Remove !
    let lambda: Vector2D = B.inverse!.multiplyVector(
      location.subtract(corners[Direction.TOP_LEFT])
    );

    return 0 <= lambda.x && lambda.x <= 1 && 0 <= lambda.y && lambda.y <= 1;
  }

  public intersect(boundingBox: BoundingBox): Polygon {
    let intersectionPoints: Vector2D[] = [];
    let corners1 = this.corners;
    let corners2 = boundingBox.corners;
    for (let c of corners1) {
      if (boundingBox.isInside(c)) {
        intersectionPoints.push(c);
      }
    }
    for (let c of corners2) {
      if (this.isInside(c)) {
        intersectionPoints.push(c);
      }
    }
    let combinations1 = [
      [corners1[0], corners1[1]],
      [corners1[0], corners1[2]],
      [corners1[3], corners1[1]],
      [corners1[3], corners1[2]],
    ];
    let combinations2 = [
      [corners2[0], corners2[1]],
      [corners2[0], corners2[2]],
      [corners2[3], corners2[1]],
      [corners2[3], corners2[2]],
    ];
    for (let a of combinations1) {
      for (let b of combinations2) {
        let m = a[0].subtract(a[1]).concatenate(b[1].subtract(b[0]));

        let lambda = m.inverse?.multiplyVector(b[1].subtract(a[1]));
        if (!lambda) {
          if (
            (a[0].x - b[1].x) / (b[0].x - b[1].x) ==
            (a[0].y - b[1].y) / (b[0].y - b[1].y)
          ) {
            intersectionPoints.push(b[0]);
            intersectionPoints.push(b[1]);
          }
          continue;
        }

        if (0 <= lambda.x && lambda.x <= 1 && 0 <= lambda.y && lambda.y <= 1) {
          intersectionPoints.push(
            a[0].subtract(a[1]).multiplyScalar(lambda.x).add(a[1])
          );
        }
      }
    }
    return new PolygonBuilder().addPoints(intersectionPoints).build();
  }
}

export default BoundingBox;
