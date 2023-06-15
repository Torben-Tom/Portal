import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import LevelManager from "../../engine/level/levelmanager.js";
import Button from "../../engine/scene/elements/button.js";
import CheckBox from "../../engine/scene/elements/checkbox.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";
import Base from "./base.js";

class InGame extends Base {
  public constructor() {
    super("rgba(0, 0, 0, 0)");

    let leftButton = new Button(
      300,
      0,
      50,
      50,
      "rgba(255, 0, 0, 0.5)",
      "rgba(255, 0, 0, 0.75)",
      "white",
      "white",
      "black",
      "black",
      1,
      "bold 20px Arial",
      "center",
      "middle",
      "❌",
      true
    );

    leftButton.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<LevelManager>("LevelManager").unload();
      Services.resolve<SceneManager>("SceneManager").switch("mainmenu");
    };

    this.addElement(leftButton);
  }
}

export default InGame;
