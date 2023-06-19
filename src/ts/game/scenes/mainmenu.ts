import AssetLoader from "../../engine/assets/assetloader.js";
import AssetManager from "../../engine/assets/assetmanager.js";
import AudioPlayer from "../../engine/audio/audioplayer.js";
import AudioType from "../../engine/audio/audiotype.js";
import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import LevelManager from "../../engine/level/levelmanager.js";
import Vector2D from "../../engine/math/vector2d.js";
import Button from "../../engine/scene/elements/button.js";
import Text from "../../engine/scene/elements/text.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";
import SettingsManager from "../../engine/settings/settingsmanager.js";
import Base from "./base.js";

class MainMenu extends Base {
  private _buttonStart: Button;
  private _buttonLevelOverview: Button;
  private _audioPlayer: AudioPlayer;

  public constructor() {
    super(
      Services.resolve<AssetManager>("AssetManager").getTexture(
        "level1-background"
      )
    );
    this._audioPlayer = Services.resolve<AudioPlayer>("AudioPlayer");

    this.musicCheckBox.location = new Vector2D(450, 400);
    this.soundCheckBox.location = new Vector2D(300, 400);

    let title = new Text(
      400,
      70,
      "yellow",
      "bolder 60px Arial",
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
      Services.resolve<SceneManager>("SceneManager").switch("level1Scene");
      Services.resolve<LevelManager>("LevelManager").start("level1");
      this._audioPlayer.play(
        AudioType.Music,
        Services.resolve<AssetLoader>("AssetLoader").getAudio("track1")
      );
    };

    this._buttonLevelOverview = new Button(
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

    this._buttonLevelOverview.onClick = (mouseClickEvent: MouseClickEvent) => {
      Services.resolve<SceneManager>("SceneManager").switch("leveloverview");
    };

    this.addElement(title);
    this.addElement(this._buttonStart);
    this.addElement(this._buttonLevelOverview);
  }

  public open(): void {
    super.open();
    if (
      !this._audioPlayer.currentMusic ||
      this._audioPlayer.currentMusic.id !== "track4"
    ) {
      this._audioPlayer.play(
        AudioType.Music,
        Services.resolve<AssetLoader>("AssetLoader").getAudio("track4")
      );
    }
  }
}

export default MainMenu;
