import AssetLoader from "../engine/assets/assetloader.js";
import AssetManager from "../engine/assets/assetmanager.js";
import Slice from "../engine/assets/texture/slice.js";
import SliceTexture from "../engine/assets/texture/slicetexture.js";
import SpriteSheet from "../engine/assets/texture/spritesheet.js";
import EngineSetup from "../engine/enginesetup.js";
import EntityManager from "../engine/entitiy/entitymanager.js";
import NetworkEntity from "./entities/networkentity.js";
import NetworkEntity2 from "./entities/networkentity2.js";

class GameSetup extends EngineSetup {
  public loadAssets(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    assetLoader.registerImages("image");
    assetLoader.registerAudios("audio");
  }

  public registerTextures(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    let iconsSpriteSheet: SpriteSheet = assetManager.registerSpriteSheet(
      "icons",
      assetLoader.getImage("icons")
    );

    let network1Slice: Slice = iconsSpriteSheet.createSlice(
      "network1",
      0,
      209,
      10,
      7
    );
    let network2Slice: Slice = iconsSpriteSheet.createSlice(
      "network2",
      0,
      201,
      10,
      7
    );
    let network3Slice: Slice = iconsSpriteSheet.createSlice(
      "network3",
      0,
      193,
      10,
      7
    );
    let network4Slice: Slice = iconsSpriteSheet.createSlice(
      "network4",
      0,
      185,
      10,
      7
    );
    let network5Slice: Slice = iconsSpriteSheet.createSlice(
      "network5",
      0,
      177,
      10,
      7
    );

    let network1Texture: SliceTexture = assetManager.registerSliceTexture(
      "network1",
      network1Slice
    );
    let network2Texture: SliceTexture = assetManager.registerSliceTexture(
      "network2",
      network2Slice
    );
    let network3Texture: SliceTexture = assetManager.registerSliceTexture(
      "network3",
      network3Slice
    );
    let network4Texture: SliceTexture = assetManager.registerSliceTexture(
      "network4",
      network4Slice
    );
    let network5Texture: SliceTexture = assetManager.registerSliceTexture(
      "network5",
      network5Slice
    );

    assetManager.registerAnimatedTexture(
      "network",
      [
        network1Texture,
        network2Texture,
        network3Texture,
        network4Texture,
        network5Texture,
      ],
      1000
    );
  }

  public registerEntities(
    assetLoader: AssetLoader,
    assetManager: AssetManager,
    entityManager: EntityManager
  ): void {
    entityManager.register(new NetworkEntity());
    entityManager.register(new NetworkEntity2(0, 150, 50, 5, 0, 0));
    entityManager.register(new NetworkEntity2(500, 150, 5, 50, 0, 0));
  }
}

export default GameSetup;
