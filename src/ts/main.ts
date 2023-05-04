import Container from "./engine/dependencyinjection/container.js";
import EntityManager from "./engine/entitiy/entitymanager.js";
import Renderer from "./engine/renderer/renderer.js";
import Game from "./game.js";

//Initialize required stuff
Container.register("EntityManager", new EntityManager());
Container.register("Renderer", new Renderer());
let game: Game = new Game();
Container.register("Game", game);

// Register event to start the game when the page is fully loaded
window.addEventListener("beforeunload", game.stopGame.bind(game));
window.addEventListener("load", game.startGame.bind(game));

setInterval(() => {
  console.log("TPS: " + game.tps + " FPS: " + game.fps);
}, 3000);
