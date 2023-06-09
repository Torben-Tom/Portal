import AssetManager from "../../engine/assets/assetmanager.js";
import ConditionalTexture from "../../engine/assets/texture/conditionaltexture.js";
import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import EngineEvent from "../../engine/event/engineevent.js";
import EngineEventHandler from "../../engine/event/engineventhandler.js";
import CompanionCube from "./companioncube.js";
import PlayerEntity from "./playerentity.js";

class ButtonGround extends Entity {
  private _isPressed;
  private _onPress: EngineEventHandler<ButtonGround, EngineEvent<ButtonGround>>;
  private _onUnpress: EngineEventHandler<
    ButtonGround,
    EngineEvent<ButtonGround>
  >;
  private _entityManager: EntityManager;

  get onPress(): EngineEventHandler<ButtonGround, EngineEvent<ButtonGround>> {
    return this._onPress;
  }

  get onUnpress(): EngineEventHandler<ButtonGround, EngineEvent<ButtonGround>> {
    return this._onUnpress;
  }

  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    widthExpansion: number,
    heightExpansion: number
  ) {
    super(
      x,
      y,
      0,
      0,
      0,
      scalingX,
      scalingY,
      widthExpansion,
      heightExpansion,
      true,
      new ConditionalTexture(
        Services.resolve<AssetManager>("AssetManager").getTexture(
          "buttonGroundUnclicked"
        ),
        new Map<Function, Texture>([
          [
            () => this._isPressed,
            Services.resolve<AssetManager>("AssetManager").getTexture(
              "buttonGroundClicked"
            ),
          ],
        ]),
        100
      )
    );

    this._isPressed = false;
    this._onPress = new EngineEventHandler<
      ButtonGround,
      EngineEvent<ButtonGround>
    >();
    this._onUnpress = new EngineEventHandler<
      ButtonGround,
      EngineEvent<ButtonGround>
    >();
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
  }

  public update(delta: number): void {
    if (this._entityManager) {
      let shouldBePressed =
        this._entityManager.touches.filter(
          (touch) =>
            touch.belongsToEntity(this) &&
            (touch.belongsToType(PlayerEntity) ||
              touch.belongsToType(CompanionCube))
        ).length > 0;

      if (!this._isPressed && shouldBePressed) {
        this._isPressed = true;
        this._onPress.dispatch(new EngineEvent<ButtonGround>(this));
      } else if (this._isPressed && !shouldBePressed) {
        this._isPressed = false;
        this._onUnpress.dispatch(new EngineEvent<ButtonGround>(this));
      }
    }
  }
}

export default ButtonGround;
