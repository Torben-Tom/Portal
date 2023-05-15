import AssetLoader from "./engine/assets/assetloader.js";
import Services from "./engine/dependencyinjection/services.js";
import Game from "./engine/game.js";

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

  loadAssets();

  setInterval(() => {
    console.log(`TPS: ${game.tps} FPS: ${game.fps}`);
  }, 3000);
}

function loadAssets(): void {
  let assetLoader: AssetLoader = Services.resolve("AssetLoader");
  assetLoader.registerImages("image");
  assetLoader.registerAudios("audio");
  
  while (!assetLoader.areAssetsReady()) {
    console.log("Loading assets...");
  }
}

window.addEventListener("DOMContentLoaded", start);
