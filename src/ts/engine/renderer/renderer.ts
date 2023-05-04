class Renderer {
  canvas: HTMLCanvasElement;
  canvasWidth: number;
  canvasHeight: number;
  glContext: any;

  constructor() {
    // Initialize canvasWidth and canvasHeight to 0 in case of errors later on
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    // Verify that the canvas element exists
    let canvasElement: HTMLElement | null =
      document.getElementById("game-canvas");
    if (!canvasElement) throw new Error("Canvas not found");
    if (!(canvasElement instanceof HTMLCanvasElement))
      throw new Error("Canvas is not a HTMLCanvasElement");

    //Create 2D context
    let canvas: HTMLCanvasElement = canvasElement as HTMLCanvasElement;
    let glContext = canvas.getContext("2d");
    if (!glContext) throw new Error("Could not get 2D context");

    this.canvas = canvas;
    this.glContext = glContext;
    this.refreshSize();
  }

  refreshSize() {
    this.canvasWidth = this.canvas.width;
    this.canvasHeight = this.canvas.height;
  }

  render() {
    this.glContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    //TODO: Render stuff
  }
}

export default Renderer;
