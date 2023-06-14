import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import LevelManager from "../../engine/level/levelmanager.js";
import Button from "../../engine/scene/elements/button.js";
import Text from "../../engine/scene/elements/text.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";

class MainMenu extends Scene {
  private _buttonStart: Button;
  private _buttonLevels: Button;

  public constructor() {
    super(
      Services.resolve<AssetManager>("AssetManager").getTexture(
        "level1-background"
      )
    );

    let title = new Text(
      400,
      50,
      "white",
      "bold 30px Arial",
      "center",
      "middle",
      "Portal",
      true
    );

    this._buttonStart = new Button(
      250,
      200,
      300,
      50,
      "rgba(0, 0, 0, 0.5)",
      "white",
      "white",
      "black",
      "white",
      "green",
      1,
      "bold 20px Arial",
      "center",
      "middle",
      "Start",
      true
    );

    this._buttonStart.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switchScene("ingame");
      Services.resolve<LevelManager>("LevelManager").start("level1");
    };

    this._buttonLevels = new Button(
      250,
      300,
      300,
      50,
      "rgba(1, 1, 1, 0.5)",
      "white",
      "white",
      "black",
      "white",
      "green",
      1,
      "bold 20px Arial",
      "center",
      "middle",
      "Select level",
      true
    );

    this.addElement(title);
    this.addElement(this._buttonStart);
    this.addElement(this._buttonLevels);
  }
}

export default MainMenu;
