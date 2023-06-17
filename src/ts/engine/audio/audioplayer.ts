import EngineEvent from "../event/engineevent.js";
import Setting from "../settings/setting.js";
import SettingsManager from "../settings/settingsmanager.js";
import SimpleSetting from "../settings/simplesetting.js";
import AudioType from "./audiotype.js";

class AudioPlayer {
  private _settingsManager: SettingsManager;

  private _currentMusic: HTMLAudioElement | null;
  private _musicEnabled: Setting<boolean>;
  private _soundEnabled: Setting<boolean>;

  public get currentMusic(): HTMLAudioElement | null {
    return this._currentMusic;
  }

  public constructor(settingsManager: SettingsManager) {
    this._settingsManager = settingsManager;
    this._currentMusic = null;

    this._musicEnabled = this._settingsManager.getOrSet(
      "audio.music",
      new SimpleSetting<boolean>(true)
    );

    this._soundEnabled = this._settingsManager.getOrSet(
      "audio.sound",
      new SimpleSetting<boolean>(true)
    );

    this._musicEnabled.valueChangeEvent.subscribe(
      this.onMusicSettingChanges.bind(this)
    );
  }

  public playMusic() {
    this._currentMusic?.play();
  }

  public pauseMusic() {
    this._currentMusic?.pause();
  }

  public play(audioType: AudioType, audio: HTMLAudioElement) {
    if (audioType === AudioType.Music) {
      if (!this._musicEnabled.get()) {
        return;
      }

      this.pauseMusic();
      audio.loop = true;
      this._currentMusic = audio;
    } else if (audioType === AudioType.Sound) {
      if (!this._soundEnabled.get()) {
        return;
      }
    }

    audio.pause();
    audio.currentTime = 0;
    audio.play();
  }

  private onMusicSettingChanges(valueChangeEvent: EngineEvent<boolean>) {
    if (valueChangeEvent.eventData) {
      this.playMusic();
    } else {
      this.pauseMusic();
    }
  }
}

export default AudioPlayer;
