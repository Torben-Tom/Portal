import EntityManager from "./engine/entitiy/entitymanager.js";
import Renderer from "./engine/renderer/renderer.js";
import Game from "./game.js";

//Initialize required stuff
let entityManager: EntityManager = new EntityManager();
let renderer: Renderer = new Renderer();
let game: Game = new Game(entityManager, renderer);

// Register event to start the game when the page is fully loaded
window.addEventListener("beforeunload", game.stopGame.bind(game));
window.addEventListener("load", game.startGame.bind(game));

setInterval(() => {
  console.log("TPS: " + game.getTps() + " FPS: " + game.getFps());
}, 3000);
