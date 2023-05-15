class Slice
{
    private _htmlImageElement: HTMLImageElement;
    private _x: number;
    private _y: number;
    private _width: number;
    private _height: number;

    get htmlImageElement(): HTMLImageElement {
        return this._htmlImageElement;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get width(): number {
        return this._width;
    }

    get heigth(): number {
        return this._height;
    }
    constructor(
        htmlImageElement: HTMLImageElement,
        x: number,
        y: number,
        width: number,
        heigth: number)
    {
        this._htmlImageElement = htmlImageElement;
        this._x = x;
        this._y = y;
        this._width = width;
        this._height = heigth;
    }
}

export default Slice;