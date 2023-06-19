import EngineEvent from "../event/engineevent.js";
import EngineEventHandler from "../event/engineventhandler.js";
import AssetVerifier from "./assetverifier.js";

class AssetLoader {
  private _images: Map<string, HTMLImageElement>;
  private _audio: Map<string, HTMLAudioElement>;

  private _imagesLoadedEvent: EngineEventHandler<boolean, EngineEvent<boolean>>;
  private _audiosLoadedEvent: EngineEventHandler<boolean, EngineEvent<boolean>>;
  private _assetsLoadedEvent: EngineEventHandler<boolean, EngineEvent<boolean>>;

  private _imageLoadTrackerTask: number | undefined;
  private _audioLoadTrackerTask: number | undefined;
  private _assetLoadTrackerTask: number | undefined;

  public get imagesLoadedEvent(): EngineEventHandler<
    boolean,
    EngineEvent<boolean>
  > {
    return this._imagesLoadedEvent;
  }

  public get audiosLoadedEvent(): EngineEventHandler<
    boolean,
    EngineEvent<boolean>
  > {
    return this._audiosLoadedEvent;
  }

  public get assetsLoadedEvent(): EngineEventHandler<
    boolean,
    EngineEvent<boolean>
  > {
    return this._assetsLoadedEvent;
  }

  public constructor() {
    this._images = new Map<string, HTMLImageElement>();
    this._audio = new Map<string, HTMLAudioElement>();

    this._imagesLoadedEvent = new EngineEventHandler<
      boolean,
      EngineEvent<boolean>
    >();
    this._audiosLoadedEvent = new EngineEventHandler<
      boolean,
      EngineEvent<boolean>
    >();
    this._assetsLoadedEvent = new EngineEventHandler<
      boolean,
      EngineEvent<boolean>
    >();
  }

  public hasImage(key: string): boolean {
    return this._images.has(key);
  }

  public getImage(key: string): HTMLImageElement {
    if (!this.hasImage(key)) {
      throw new Error(`Image with key ${key} does not exist!`);
    }

    return this._images.get(key) as HTMLImageElement;
  }

  public getImagesCount(): number {
    return this._images.size;
  }

  public getImagesReadyCount(): number {
    return Array.from(this._images.values())
      .map((image) => AssetVerifier.verifyImage(image))
      .filter((status) => status === true).length;
  }

  public areImagesReady(): boolean {
    return this.getImagesCount() === this.getImagesReadyCount();
  }

  public hasAudio(key: string): boolean {
    return this._audio.has(key);
  }

  public getAudio(key: string): HTMLAudioElement {
    if (!this.hasAudio(key)) {
      throw new Error(`Audio with key ${key} does not exist!`);
    }
    return this._audio.get(key) as HTMLAudioElement;
  }

  public getAudiosCount(): number {
    return this._audio.size;
  }

  public getAudiosReadyCount(): number {
    return Array.from(this._audio.values())
      .map((audio) => AssetVerifier.verifyAudio(audio))
      .filter((status) => status === true).length;
  }

  public areAudiosReady(): boolean {
    return this.getAudiosCount() === this.getAudiosReadyCount();
  }

  public getAssetsCount(): number {
    return this.getImagesCount() + this.getAudiosCount();
  }

  public getAssetsReadyCount(): number {
    return this.getImagesReadyCount() + this.getAudiosReadyCount();
  }

  public areAssetsReady(): boolean {
    return this.getAssetsCount() === this.getAssetsReadyCount();
  }

  public registerImages(className: string) {
    let images = document.getElementsByClassName(className);
    if (images.length == 0) {
      console.warn(`No images found for class ${className}`);
      return;
    }

    for (let i = 0; i < images.length; i++) {
      if (!(images[i] instanceof HTMLImageElement)) {
        console.warn(
          `Element ${i} that was found for class ${className} is not an image. Ignoring and moving on...`
        );
        continue;
      }

      let image = images[i] as HTMLImageElement;
      this._images.set(image.id, image);
    }
  }

  public registerAudios(className: string) {
    let audio = document.getElementsByClassName(className);
    if (audio.length == 0) {
      console.warn(`No audios found for class ${className}`);
      return;
    }

    for (let i = 0; i < audio.length; i++) {
      if (!(audio[i] instanceof HTMLAudioElement)) {
        console.warn(
          `Element ${i} that was found for class ${className} is not an audio. Ignoring and moving on...`
        );
        continue;
      }

      let audioElement = audio[i] as HTMLAudioElement;
      this._audio.set(audioElement.id, audioElement);
    }
  }

  public startTracking() {
    this._imageLoadTrackerTask = setInterval(() => {
      let imagesReady = this.areImagesReady();
      this._imagesLoadedEvent.dispatch(new EngineEvent<boolean>(imagesReady));

      if (imagesReady) {
        clearInterval(this._imageLoadTrackerTask);
      }
    }, 500);

    this._audioLoadTrackerTask = setInterval(() => {
      let audiosReady = this.areAudiosReady();
      this._audiosLoadedEvent.dispatch(new EngineEvent<boolean>(audiosReady));

      if (audiosReady) {
        clearInterval(this._audioLoadTrackerTask);
      }
    }, 500);

    this._assetLoadTrackerTask = setInterval(() => {
      let assetsReady = this.areAssetsReady();
      this._assetsLoadedEvent.dispatch(new EngineEvent<boolean>(assetsReady));

      if (assetsReady) {
        clearInterval(this._assetLoadTrackerTask);
      }
    }, 500);
  }
}

export default AssetLoader;
