import Game from "./game.js";
import EntityManager from "./engine/entitiy/entitymanager";

//Initialize required stuff
let entityManager: EntityManager = new EntityManager();
let game: Game = new Game(entityManager);

// Register event to start the game when the page is fully loaded
window.addEventListener("load", game.startGame);
