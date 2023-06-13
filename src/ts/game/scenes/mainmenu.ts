import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import Button from "../../engine/scene/elements/button.js";
import Text from "../../engine/scene/elements/text.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";

class MainMenu extends Scene {
  private _buttonStart: Button;
  private _buttonSettings: Button;

  public constructor() {
    super(
      Services.resolve<AssetManager>("AssetManager").getTexture(
        "level1-background"
      )
    );

    let title = new Text(
      400,
      50,
      true,
      "white",
      "center",
      "middle",
      "bold 30px Arial",
      "Portal"
    );

    this._buttonStart = new Button(
      250,
      200,
      300,
      50,
      "gray",
      "black",
      1,
      true,
      "white",
      "center",
      "middle",
      "bold 20px Arial",
      "Start",
      "purple"
    );

    this._buttonStart.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switchScene("level1");
    };

    this._buttonSettings = new Button(
      250,
      300,
      300,
      50,
      "gray",
      "black",
      1,
      true,
      "white",
      "center",
      "middle",
      "bold 20px Arial",
      "Settings",
      "purple"
    );

    this.addElement(title);
    this.addElement(this._buttonStart);
    this.addElement(this._buttonSettings);
  }
}

export default MainMenu;
