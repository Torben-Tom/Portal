function startGame() {
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

  let xPos = 0;
  let yPos = 0;

  // Repeat every 10ms
  setInterval(() => {
    if (glContext) {
      // Clear the canvas
      glContext.clearRect(0, 0, canvas.width, canvas.height);

      // Draw a new rectangle
      glContext.fillStyle = "red";
      glContext.fillRect(xPos, yPos, 20, 20);

      // Move the rectangle
      xPos += 25;
      if (xPos > canvas.width) {
        xPos = 0;
        yPos += 25;
        if (yPos > canvas.height) yPos = 0;
      }
    }
  }, 10);
}

export { startGame };
