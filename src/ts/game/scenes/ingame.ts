import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import Button from "../../engine/scene/elements/button.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";

class InGame extends Scene {
  public constructor() {
    super("rgba(0, 0, 0, 0)");

    let buttonHelp = new Button(
      600,
      400,
      50,
      50,
      "rgba(0, 0, 0, 0)",
      "white",
      1,
      true,
      "white",
      "center",
      "middle",
      "bold 20px Arial",
      "?",
      "purple"
    );

    buttonHelp.onClick = (mouseClickEvent: MouseClickEvent) => {
      alert("No");
    };

    this.addElement(buttonHelp);
  }
}

export default InGame;
