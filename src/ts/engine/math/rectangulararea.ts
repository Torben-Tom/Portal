import Vector2D from "./vector2d";

interface RectangularArea {
  get location(): Vector2D;
  get width(): number;
  get height(): number;
  get center(): Vector2D;
}

export default RectangularArea;
