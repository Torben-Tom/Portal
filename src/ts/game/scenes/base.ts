import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import MouseClickEvent from "../../engine/event/events/mouseclickevent/mouseclickevent.js";
import LevelManager from "../../engine/level/levelmanager.js";
import Button from "../../engine/scene/elements/button.js";
import CheckBox from "../../engine/scene/elements/checkbox.js";
import Scene from "../../engine/scene/scene.js";
import SceneManager from "../../engine/scene/scenemanager.js";
import SettingsManager from "../../engine/settings/settingsmanager.js";
import SimpleSetting from "../../engine/settings/simplesetting.js";

class Base extends Scene {
  private _settingsManager: SettingsManager;

  private _soundCheckBox: CheckBox;
  private _musicCheckBox: CheckBox;

  protected get soundCheckBox(): CheckBox {
    return this._soundCheckBox;
  }

  protected get musicCheckBox(): CheckBox {
    return this._musicCheckBox;
  }

  public constructor(
    background: string | CanvasGradient | CanvasPattern | Texture
  ) {
    super(background);

    this._settingsManager =
      Services.resolve<SettingsManager>("SettingsManager");

    this._soundCheckBox = new CheckBox(
      600,
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
      "🔇",
      "🔊",
      true,
      true
    );

    this._musicCheckBox = new CheckBox(
      675,
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

    this._soundCheckBox.onClick = () => {
      this._soundCheckBox.toggle();
      this._settingsManager
        .getOrSet(
          "audio.sound",
          new SimpleSetting<boolean>(this.soundCheckBox.checked)
        )
        .set(this.soundCheckBox.checked);
    };

    this._musicCheckBox.onClick = () => {
      this._musicCheckBox.toggle();
      this._settingsManager
        .getOrSet(
          "audio.music",
          new SimpleSetting<boolean>(this.musicCheckBox.checked)
        )
        .set(this.musicCheckBox.checked);
    };

    this.addElement(this._soundCheckBox);
    this.addElement(this._musicCheckBox);
  }

  public open(): void {
    super.open();

    this._soundCheckBox.checked = this._settingsManager
      .getOrSet(
        "audio.sound",
        new SimpleSetting<boolean>(this.soundCheckBox.checked)
      )
      .get();
    this._musicCheckBox.checked = this._settingsManager
      .getOrSet(
        "audio.music",
        new SimpleSetting<boolean>(this.musicCheckBox.checked)
      )
      .get();
  }
}

export default Base;
