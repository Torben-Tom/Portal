import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import LevelManager from "../../engine/level/levelmanager.js";
import Button from "../../engine/scene/elements/button.js";
import Text from "../../engine/scene/elements/text.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";

class LevelOverview extends Scene {
  private _level1: Button;
  private _level2: Button;
  private _level3: Button;

  public constructor() {
    super(
      Services.resolve<AssetManager>("AssetManager").getTexture(
        "level1-background"
      )
    );

    let title = new Text(
      400,
      70,
      "white",
      "bold 40px Arial",
      "center",
      "middle",
      "Level Overview",
      true
    );

    this._level1 = new Button(
      100,
      120,
      250,
      200,
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
      "Level 1",
      true
    );

    this._level2 = new Button(
      400,
      120,
      250,
      200,
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
      "Level 2",
      true
    );

    this._level3 = new Button(
      100,
      380,
      250,
      200,
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
      "Level 3",
      true
    );

    this._level1.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switchScene("ingame");
      Services.resolve<LevelManager>("LevelManager").start("level1");
    };

    this._level2.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switchScene("ingame");
      Services.resolve<LevelManager>("LevelManager").start("level2");
    };

    this._level3.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switchScene("ingame");
      Services.resolve<LevelManager>("LevelManager").start("level3");
    };

    this.addElement(title);
    this.addElement(this._level1);
    this.addElement(this._level2);
    this.addElement(this._level3);
  }
}

export default LevelOverview;
