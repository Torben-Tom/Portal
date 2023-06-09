import AssetLoader from "../engine/assets/assetloader.js";
import AssetManager from "../engine/assets/assetmanager.js";
import Slice from "../engine/assets/texture/slice.js";
import SliceTexture from "../engine/assets/texture/slicetexture.js";
import SpriteSheet from "../engine/assets/texture/spritesheet.js";
import Cookie from "../engine/cookies/cookie.js";
import CookieManager from "../engine/cookies/cookiemanager.js";
import Services from "../engine/dependencyinjection/services.js";
import EngineEvent from "../engine/event/engineevent.js";
import Game from "../engine/game.js";
import InputHandler from "../engine/input/inputhandler.js";
import LevelManager from "../engine/level/levelmanager.js";
import SceneManager from "../engine/scene/scenemanager.js";
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

function init(): void {
  let htmlCanvasElement: HTMLCanvasElement = getGameCanvas();
  let game: Game = new Game(htmlCanvasElement, new GameSetup());

  window.addEventListener("beforeunload", game.stopGame.bind(game));

  let inputHandler: InputHandler =
    Services.resolve<InputHandler>("InputHandler");
  inputHandler.addWhiteListedKeys(["F5", "F11", "F12", "Alt"]);

  let assetLoader = Services.resolve<AssetLoader>("AssetLoader");

  assetLoader.assetsLoadedEvent.subscribe(
    (engineEvent: EngineEvent<boolean>) => {
      if (engineEvent.eventData) {
        start(game);
      }
    }
  );
}

function start(game: Game): void {
  Services.resolve<SceneManager>("SceneManager").switch("mainmenu");
  game.startGame();
}

window.addEventListener("DOMContentLoaded", init);
