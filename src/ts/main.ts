import AssetLoader from "./engine/assets/assetloader.js";
import AssetManager from "./engine/assets/assetmanager.js";
import SpriteSheet from "./engine/assets/texture/spritesheet.js";
import Services from "./engine/dependencyinjection/services.js";
import Entity from "./engine/entitiy/entity.js";
import EntityManager from "./engine/entitiy/entitymanager.js";
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

  let assetManager: AssetManager = Services.resolve("AssetManager");
  assetManager.registerSpriteSheet("test", assetLoader.getImage("icons"));
  let spriteSheet: SpriteSheet = assetManager.getSpriteSheet("test");
  spriteSheet.createSlice("network1", 0, 209, 10, 7);
  spriteSheet.createSlice("network2", 0, 201, 10, 7);
  spriteSheet.createSlice("network3", 0, 193, 10, 7);
  spriteSheet.createSlice("network4", 0, 185, 10, 7);
  spriteSheet.createSlice("network5", 0, 177, 10, 7);

  assetManager.registerSliceTexture(
    "network1",
    spriteSheet.getSlice("network1")
  );
  assetManager.registerSliceTexture(
    "network2",
    spriteSheet.getSlice("network2")
  );
  assetManager.registerSliceTexture(
    "network3",
    spriteSheet.getSlice("network3")
  );
  assetManager.registerSliceTexture(
    "network4",
    spriteSheet.getSlice("network4")
  );
  assetManager.registerSliceTexture(
    "network5",
    spriteSheet.getSlice("network5")
  );

  assetManager.registerAnimatedTexture(
    "network",
    [
      assetManager.getTexture("network1"),
      assetManager.getTexture("network2"),
      assetManager.getTexture("network3"),
      assetManager.getTexture("network4"),
      assetManager.getTexture("network5"),
    ],
    100
  );

  let entityManager: EntityManager = Services.resolve("EntityManager");
  let network: Entity = new Entity(
    10,
    10,
    10,
    7,
    assetManager.getTexture("network")
  );
  entityManager.register(network);
}

window.addEventListener("DOMContentLoaded", start);
