import Polygon from "./polygon.js";
import Vector2D from "./vector2d.js";

class PolygonBuilder {
  private _points: Vector2D[];

  get points(): Vector2D[] {
    return this._points;
  }

  constructor() {
    this._points = [];
  }

  public addPoint(point: Vector2D): PolygonBuilder {
    this._points.push(point);
    return this;
  }

  public addPoints(points: Vector2D[]): PolygonBuilder {
    this._points.push(...points);
    return this;
  }

  public build(): Polygon {
    return new Polygon(this);
  }
}

export default PolygonBuilder;
