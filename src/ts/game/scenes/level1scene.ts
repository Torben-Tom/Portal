import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import LevelManager from "../../engine/level/levelmanager.js";
import Button from "../../engine/scene/elements/button.js";
import CheckBox from "../../engine/scene/elements/checkbox.js";
import Label from "../../engine/scene/elements/label.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";
import Base from "./base.js";
import InGame from "./ingame.js";

class Level1Scene extends InGame {
  public constructor() {
    super();

    let fLabel = new Label(
      554,
      415,
      50,
      50,
      "rgba(224,218,211,0.25)",
      "white",
      "white",
      1,
      "bold 30px Arial",
      "center",
      "middle",
      "f",
      true
    );

    this.addElement(fLabel);
  }
}

export default Level1Scene;
