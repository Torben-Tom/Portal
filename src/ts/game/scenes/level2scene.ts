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

class Level2Scene extends InGame {
  public constructor() {
    super();

    let clickRightLabel = new Label(
      550,
      470,
      140,
      50,
      "rgba(224,218,211,0.15)",
      "white",
      "white",
      1,
      "bold 20px Arial",
      "center",
      "middle",
      "Right Click >",
      true
    );

    let clickLeftLabel = new Label(
      110,
      470,
      140,
      50,
      "rgba(224,218,211,0.25)",
      "white",
      "white",
      1,
      "bold 20px Arial",
      "center",
      "middle",
      "< Left Click",
      true
    );

    this.addElement(clickLeftLabel);
    this.addElement(clickRightLabel);
  }
}

export default Level2Scene;
