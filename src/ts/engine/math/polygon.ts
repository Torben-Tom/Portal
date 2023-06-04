import PolygonBuilder from "./polygonbuilder.js";
import Vector2D from "./vector2d.js";

class Polygon {
  private _points: Vector2D[];

  get points(): Vector2D[] {
    return this._points;
  }

  constructor(polygonBuilder: PolygonBuilder) {
    this._points = polygonBuilder.points;
  }
}

export default Polygon;
