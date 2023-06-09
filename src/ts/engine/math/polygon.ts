import PolygonBuilder from "./polygonbuilder.js";
import Vector2D from "./vector2d.js";

class Polygon {
  private _points: Vector2D[];

  get points(): Vector2D[] {
    return this._points;
  }

  get minX(): number {
    if (this._points.length === 0) {
      return 0;
    }

    return this._points
      .map((point) => point.x)
      .reduce((a, b) => Math.min(a, b));
  }

  get maxX(): number {
    if (this._points.length === 0) {
      return 0;
    }

    return this._points
      .map((point) => point.x)
      .reduce((a, b) => Math.max(a, b));
  }

  get minY(): number {
    if (this._points.length === 0) {
      return 0;
    }

    return this._points
      .map((point) => point.y)
      .reduce((a, b) => Math.min(a, b));
  }

  get maxY(): number {
    if (this._points.length === 0) {
      return 0;
    }

    return this._points
      .map((point) => point.y)
      .reduce((a, b) => Math.max(a, b));
  }

  get width(): number {
    return this.maxX - this.minX;
  }

  get height(): number {
    return this.maxY - this.minY;
  }

  get center(): Vector2D {
    return this._points
      .reduce((sum, point) => sum.add(point))
      .multiplyScalar(1 / this._points.length);
  }

  constructor(polygonBuilder: PolygonBuilder) {
    this._points = polygonBuilder.points;
  }
}

export default Polygon;
