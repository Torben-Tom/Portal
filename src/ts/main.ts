import Game from "./engine/game";

function getGameCanvas(): HTMLCanvasElement {
  let canvasElement: HTMLElement | null =
    document.getElementById("game-canvas");

  if (!canvasElement) {
    throw new Error("Canvas not found");
  }
  if (!(canvasElement instanceof HTMLCanvasElement)) {
    throw new Error("Canvas is not a HTMLCanvasElement");
  }

  let canvas: HTMLCanvasElement = canvasElement as HTMLCanvasElement;
  return canvas;
}

function start(): void {
  let htmlCanvasElement: HTMLCanvasElement = getGameCanvas();
  let game: Game = new Game(htmlCanvasElement);
  window.addEventListener("beforeunload", game.stopGame.bind(game));
  game.startGame();

  setInterval(() => {
    console.log(`TPS: ${game.tps} FPS: ${game.fps}`);
  }, 3000);
}

window.addEventListener("DOMContentLoaded", start);
