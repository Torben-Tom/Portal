class Renderer {
  private _canvas: HTMLCanvasElement;
  private _canvasWidth: number;
  private _canvasHeight: number;
  private _glContext: any;

  get canvasWidth(): number {
    return this._canvasWidth;
  }

  get canvasHeight(): number {
    return this._canvasHeight;
  }

  constructor() {
    // Initialize canvasWidth and canvasHeight to 0 in case of errors later on
    this._canvasWidth = 0;
    this._canvasHeight = 0;

    // Verify that the canvas element exists
    let canvasElement: HTMLElement | null =
      document.getElementById("game-canvas");
    if (!canvasElement) {
      throw new Error("Canvas not found");
    }

    //Verify that the canvas element is a HTMLCanvasElement
    if (!(canvasElement instanceof HTMLCanvasElement)) {
      throw new Error("Canvas is not a HTMLCanvasElement");
    }

    //Get canvas element as HTMLCanvasElement
    let canvas: HTMLCanvasElement = canvasElement as HTMLCanvasElement;
    this._canvas = canvas;

    //Create 2D context
    let glContext = canvas.getContext("2d");
    if (!glContext) {
      throw new Error("Could not get 2D context");
    }
    this._glContext = glContext;

    this.refreshSize();
  }

  private refreshSize() {
    this._canvasWidth = this._canvas.width;
    this._canvasHeight = this._canvas.height;
  }

  render(delta: number) {
    this.refreshSize();
    this._glContext.clearRect(0, 0, this._canvasWidth, this._canvasHeight);
    //TODO: Render stuff
  }
}

export default Renderer;
