import Point from "./point.js";

interface RectangularArea {
  get location(): Point;
  get width(): number;
  get height(): number;
  get center(): Point;
}

export default RectangularArea;
