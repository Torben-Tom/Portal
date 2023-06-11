import Entity from "./entity.js";
import Vector2D from "../math/vector2d.js";
import Matrix2D from "../math/matrix2d.js";
import Diagonal from "../math/diagonal.js";
import PolygonBuilder from "../math/polygonbuilder.js";
import Polygon from "../math/polygon.js";

class BoundingBox {
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

  get centerRelative(): Vector2D {
    return new Vector2D(this.width / 2, this.height / 2);
  }

  get centerAbsolute(): Vector2D {
    return this.location.add(this.centerRelative);
  }

  get passThrough(): boolean {
    return this._passThrough;
  }

  get corners(): Vector2D[] {
    let radians = (this._entity.rotation / 180) * Math.PI;
    let relCenter = this._entity.centerOfMass;
    let absCenter = this._entity.centerOfMassAbsolute;
    let rotationMatrix = Matrix2D.rotationMatrix(radians);

    let topLeft = rotationMatrix
      .multiplyVector(new Vector2D(0, 0).subtract(relCenter))
      .add(absCenter);

    let topRight = rotationMatrix
      .multiplyVector(new Vector2D(this.width, 0).subtract(relCenter))
      .add(absCenter);

    let bottomLeft = rotationMatrix
      .multiplyVector(new Vector2D(0, this.height).subtract(relCenter))
      .add(absCenter);

    let bottomRight = rotationMatrix
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
    return this.locationsInside([location]).includes(location);
  }

  public locationsInside(locations: Vector2D[]): Vector2D[] {
    let ret: Vector2D[] = [];
    let corners: Vector2D[] = this.corners;

    let base1 = corners[Diagonal.TopRight].subtract(corners[Diagonal.TopLeft]);
    let base2 = corners[Diagonal.BottomLeft].subtract(
      corners[Diagonal.TopLeft]
    );

    let baseMatrix = base1.concatenate(base2);
    let inverseBaseMatrix = baseMatrix.inverse;
    if (!inverseBaseMatrix) {
      return ret; //Mathematically, this should never happen as long as no entity has a BoundingBox of height or width 0
      return ret; //Mathematically, this should never happen as long as no entity has a BoundingBox of height or width 0
    }
    for (let location of locations) {
      let lambda: Vector2D = inverseBaseMatrix!.multiplyVector(
        location.subtract(corners[Diagonal.TopLeft])
      );
      if (0 <= lambda.x && lambda.x <= 1 && 0 <= lambda.y && lambda.y <= 1) {
        ret.push(location);
      }
    }
    return ret;
  }

  public intersect(boundingBox: BoundingBox): Polygon {
    let polygonBuilder = new PolygonBuilder();
    let corners1 = this.corners;
    let corners2 = boundingBox.corners;

    polygonBuilder.addPoints(boundingBox.locationsInside(corners1));
    polygonBuilder.addPoints(this.locationsInside(corners2));
    polygonBuilder.addPoints(boundingBox.locationsInside(corners1));
    polygonBuilder.addPoints(this.locationsInside(corners2));

    let lines1 = [
      [corners1[0], corners1[1]],
      [corners1[0], corners1[2]],
      [corners1[3], corners1[1]],
      [corners1[3], corners1[2]],
    ];

    let lines2 = [
      [corners2[0], corners2[1]],
      [corners2[0], corners2[2]],
      [corners2[3], corners2[1]],
      [corners2[3], corners2[2]],
    ];

    for (let line of lines1) {
      for (let otherLine of lines2) {
        let matrix = line[0]
          .subtract(line[1])
          .concatenate(otherLine[1].subtract(otherLine[0]));

        let lambda = matrix.inverse?.multiplyVector(
          otherLine[1].subtract(line[1])
        );
        if (!lambda) {
          continue;
        }

        if (0 < lambda.x && lambda.x < 1 && 0 < lambda.y && lambda.y < 1) {
          polygonBuilder.addPoint(
            line[0].subtract(line[1]).multiplyScalar(lambda.x).add(line[1])
          );
        }
      }
    }

    return polygonBuilder.build();
  }
}

export default BoundingBox;
