import EntityManager from "./engine/entitiy/entitymanager.js";
import Renderer from "./engine/renderer/renderer";

class Game {
  entityManager: EntityManager;

  constructor(entityManager: EntityManager, renderer: Renderer) {
    this.entityManager = entityManager;
  }

  startGame() {
    let xPos = 0;
    let yPos = 0;

    // Repeat every 10ms
    /*setInterval(() => {
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
    }, 10); */
  }
}

export default Game;
