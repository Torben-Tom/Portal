import AssetLoader from "./engine/assets/assetloader.js";
import AssetManager from "./engine/assets/assetmanager.js";
import AnimatedTexture from "./engine/assets/texture/animatedtexture.js";
import Slice from "./engine/assets/texture/slice.js";
import SliceTexture from "./engine/assets/texture/slicetexture.js";
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

  let iconsSpriteSheet: SpriteSheet = assetManager.registerSpriteSheet(
    "icons",
    assetLoader.getImage("icons")
  );

  let network1Slice: Slice = iconsSpriteSheet.createSlice(
    "network1",
    0,
    209,
    10,
    7
  );
  let network2Slice: Slice = iconsSpriteSheet.createSlice(
    "network2",
    0,
    201,
    10,
    7
  );
  let network3Slice: Slice = iconsSpriteSheet.createSlice(
    "network3",
    0,
    193,
    10,
    7
  );
  let network4Slice: Slice = iconsSpriteSheet.createSlice(
    "network4",
    0,
    185,
    10,
    7
  );
  let network5Slice: Slice = iconsSpriteSheet.createSlice(
    "network5",
    0,
    177,
    10,
    7
  );

  let network1Texture: SliceTexture = assetManager.registerSliceTexture(
    "network1",
    network1Slice
  );
  let network2Texture: SliceTexture = assetManager.registerSliceTexture(
    "network2",
    network2Slice
  );
  let network3Texture: SliceTexture = assetManager.registerSliceTexture(
    "network3",
    network3Slice
  );
  let network4Texture: SliceTexture = assetManager.registerSliceTexture(
    "network4",
    network4Slice
  );
  let network5Texture: SliceTexture = assetManager.registerSliceTexture(
    "network5",
    network5Slice
  );

  assetManager.registerAnimatedTexture(
    "network",
    [
      network1Texture,
      network2Texture,
      network3Texture,
      network4Texture,
      network5Texture,
    ],
    100
  );

  let entityManager: EntityManager = Services.resolve("EntityManager");
  let networkEntity: Entity = new Entity(
    10,
    10,
    10,
    7,
    assetManager.getTexture("network")
  );
  entityManager.register(networkEntity);
}

window.addEventListener("DOMContentLoaded", start);
