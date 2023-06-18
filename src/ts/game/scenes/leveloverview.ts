import AssetManager from "../../engine/assets/assetmanager.js";
import Cookie from "../../engine/cookies/cookie.js";
import CookieManager from "../../engine/cookies/cookiemanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import LevelManager from "../../engine/level/levelmanager.js";
import Vector2D from "../../engine/math/vector2d.js";
import Button from "../../engine/scene/elements/button.js";
import Text from "../../engine/scene/elements/text.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";
import { addYears } from "../../engine/time/dateutils.js";
import Base from "./base.js";

class LevelOverview extends Base {
  private _cookieManager: CookieManager;

  private _level1: Button;
  private _level2: Button;
  private _level3: Button;
  private _level4: Button;

  private _backToMainMenu: Button;
  private _reset: Button;

  public constructor() {
    super(
      Services.resolve<AssetManager>("AssetManager").getTexture(
        "level1-background"
      )
    );

    this._cookieManager = Services.resolve<CookieManager>("CookieManager");

    this.musicCheckBox.location = new Vector2D(550, 120);
    this.soundCheckBox.location = new Vector2D(450, 120);

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
      200,
      250,
      150,
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
      200,
      250,
      150,
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
      150,
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

    this._level4 = new Button(
      400,
      380,
      250,
      150,
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
      "Level 4",
      true
    );

    this._backToMainMenu = new Button(
      100,
      120,
      250,
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
      "Back to Main Menu",
      true
    );

    this._reset = new Button(
      700,
      350,
      75,
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
      "Reset",
      true
    );

    this._level1.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switch("level1Scene");
      Services.resolve<LevelManager>("LevelManager").start("level1");
    };

    this._level2.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switch("level2Scene");
      Services.resolve<LevelManager>("LevelManager").start("level2");
    };

    this._level3.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switch("ingame");
      Services.resolve<LevelManager>("LevelManager").start("level3");
    };

    this._level4.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switch("ingame");
      Services.resolve<LevelManager>("LevelManager").start("level4");
    };

    this._backToMainMenu.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switch("mainmenu");
    };

    this._reset.onClick = (mouseClickEvent: MouseClickEvent) => {
      this._cookieManager.set(
        "level1.solved",
        new Cookie("false", addYears(new Date(), 1), "Strict", false)
      );
      this._cookieManager.set(
        "level2.solved",
        new Cookie("false", addYears(new Date(), 1), "Strict", false)
      );
      this._cookieManager.set(
        "level3.solved",
        new Cookie("false", addYears(new Date(), 1), "Strict", false)
      );
      this._cookieManager.set(
        "level4.solved",
        new Cookie("false", addYears(new Date(), 1), "Strict", false)
      );
      this._cookieManager.save();

      Services.resolve<SceneManager>("SceneManager").switch("leveloverview");
    };

    this.addElement(title);
    this.addElement(this._level1);
    this.addElement(this._level2);
    this.addElement(this._level3);
    this.addElement(this._level4);
    this.addElement(this._backToMainMenu);
    this.addElement(this._reset);
  }

  public open(): void {
    super.open();
    let level1Solved: Cookie = this._cookieManager.getOrSet(
      "level1.solved",
      new Cookie("false", addYears(new Date(), 1), "Strict", false)
    );
    let level2Solved: Cookie = this._cookieManager.getOrSet(
      "level2.solved",
      new Cookie("false", addYears(new Date(), 1), "Strict", false)
    );
    let level3Solved: Cookie = this._cookieManager.getOrSet(
      "level3.solved",
      new Cookie("false", addYears(new Date(), 1), "Strict", false)
    );
    let level4Solved: Cookie = this._cookieManager.getOrSet(
      "level4.solved",
      new Cookie("false", addYears(new Date(), 1), "Strict", false)
    );

    this._cookieManager.save();

    this._level1.backgroundUnhovered =
      level1Solved.value == "true" ? "green" : "rgba(0, 0, 0, 0.5)";

    this._level2.backgroundUnhovered =
      level2Solved.value == "true" ? "green" : "rgba(0, 0, 0, 0.5)";

    this._level3.backgroundUnhovered =
      level3Solved.value == "true" ? "green" : "rgba(0, 0, 0, 0.5)";

    this._level4.backgroundUnhovered =
      level4Solved.value == "true" ? "green" : "rgba(0, 0, 0, 0.5)";
  }
}

export default LevelOverview;
