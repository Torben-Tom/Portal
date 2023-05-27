import AssetLoader from "../engine/assets/assetloader.js";
import AssetManager from "../engine/assets/assetmanager.js";
import Slice from "../engine/assets/texture/slice.js";
import SliceTexture from "../engine/assets/texture/slicetexture.js";
import SpriteSheet from "../engine/assets/texture/spritesheet.js";
import Services from "../engine/dependencyinjection/services.js";
import EntityManager from "../engine/entitiy/entitymanager.js";
import Game from "../engine/game.js";
import InputHandler from "../engine/input/inputhandler.js";
import NetworkEntity from "./entities/networkentity.js";
import NetworkEntity2 from "./entities/networkentity2.js";
import GameSetup from "./gamesetup.js";

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
  let game: Game = new Game(htmlCanvasElement, new GameSetup());
  window.addEventListener("beforeunload", game.stopGame.bind(game));

  game.startGame();
  let inputHandler: InputHandler =
    Services.resolve<InputHandler>("InputHandler");
  inputHandler.addWhiteListedKeys(["F5", "F11", "F12", "Alt"]);
}

window.addEventListener("DOMContentLoaded", start);
