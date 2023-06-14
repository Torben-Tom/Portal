import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import LevelManager from "../../engine/level/levelmanager.js";
import Button from "../../engine/scene/elements/button.js";
import CheckBox from "../../engine/scene/elements/checkbox.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";

class InGame extends Scene {
  public constructor() {
    super("rgba(0, 0, 0, 0)");

    let soundCheckBox = new CheckBox(
      375,
      0,
      50,
      50,
      "rgba(0, 0, 0, 0)",
      "rgba(0, 255, 0, 0.5)",
      "rgba(255, 255, 255, 0.25)",
      "rgba(0, 255, 0, 0.25)",
      "white",
      "white",
      "white",
      "white",
      "black",
      "black",
      "black",
      "black",
      1,
      "bold 20px Arial",
      "center",
      "middle",
      "⛔",
      "🎵",
      true,
      true
    );

    let musicCheckBox = new CheckBox(
      450,
      0,
      50,
      50,
      "rgba(0, 0, 0, 0)",
      "rgba(0, 255, 0, 0.5)",
      "rgba(255, 255, 255, 0.25)",
      "rgba(0, 255, 0, 0.25)",
      "white",
      "white",
      "white",
      "white",
      "black",
      "black",
      "black",
      "black",
      1,
      "bold 20px Arial",
      "center",
      "middle",
      "⛔",
      "🔊",
      true,
      true
    );

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

    soundCheckBox.onClick = () => {
      soundCheckBox.toggle();
      console.log("Sound: " + soundCheckBox.checked);
    };

    musicCheckBox.onClick = () => {
      musicCheckBox.toggle();
      console.log("Music: " + musicCheckBox.checked);
    };

    leftButton.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<LevelManager>("LevelManager").unload();
      Services.resolve<SceneManager>("SceneManager").switchScene("mainmenu");
    };

    this.addElement(soundCheckBox);
    this.addElement(musicCheckBox);
    this.addElement(leftButton);
  }
}

export default InGame;
