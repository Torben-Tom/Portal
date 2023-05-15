import Slice from "./slice.js";

class SpriteSheet{
    private _htmlImageElement: HTMLImageElement;
    private _slices: Map<string, Slice>;

    constructor(htmlImageElement: HTMLImageElement) {
        this._htmlImageElement = htmlImageElement;
        this._slices = new Map();
    }

    createSlice(name: string, x: number, y: number, width: number, height: number): void {
        this._slices.set(name, new Slice(this._htmlImageElement, x, y, width, height));
    }   

    getSlice(name: string): Slice {
        if(!this._slices.has(name)){
            throw new Error(`Slice ${name} not found`);
        }
        return this._slices.get(name) as Slice;
    }
}

export default SpriteSheet;