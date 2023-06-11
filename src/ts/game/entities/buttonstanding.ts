import AssetManager from "../../engine/assets/assetmanager.js";
import ConditionalTexture from "../../engine/assets/texture/conditionaltexture.js";
import Texture from "../../engine/assets/texture/texture.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import EngineEvent from "../../engine/event/engineevent.js";
import EngineEventHandler from "../../engine/event/engineventhandler.js";
import InputHandler from "../../engine/input/inputhandler.js";
import PlayerEntity from "./playerentity.js";

class ButtonStanding extends Entity {
  private _cooldown: number;
  private _isPressed: boolean;
  private _onPress: EngineEventHandler<
    ButtonStanding,
    EngineEvent<ButtonStanding>
  >;
  private _onUnpress: EngineEventHandler<
    ButtonStanding,
    EngineEvent<ButtonStanding>
  >;
  private _entityManager: EntityManager;
  private _inputHandler: InputHandler;

  get isPressed(): boolean {
    return this._isPressed;
  }

  get onPress(): EngineEventHandler<
    ButtonStanding,
    EngineEvent<ButtonStanding>
  > {
    return this._onPress;
  }

  get onUnpress(): EngineEventHandler<
    ButtonStanding,
    EngineEvent<ButtonStanding>
  > {
    return this._onUnpress;
  }

  constructor(
    x: number,
    y: number,
    scalingX: number,
    scalingY: number,
    widthExpansion: number,
    heightExpansion: number,
    cooldown: number
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
          "buttonStandingUnclicked"
        ),
        new Map<Function, Texture>([
          [
            () => this._isPressed,
            Services.resolve<AssetManager>("AssetManager").getTexture(
              "buttonStandingClicked"
            ),
          ],
        ]),
        100
      )
    );

    this._cooldown = cooldown == Infinity ? 0 : cooldown;
    this._isPressed = false;
    this._onPress = new EngineEventHandler<
      ButtonStanding,
      EngineEvent<ButtonStanding>
    >();
    this._onUnpress = new EngineEventHandler<
      ButtonStanding,
      EngineEvent<ButtonStanding>
    >();
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
    this._inputHandler = Services.resolve<InputHandler>("InputHandler");
    this._inputHandler.keyDownEvent.subscribe(
      (engineEvent: EngineEvent<KeyboardEvent>) => this.onKeyDown(engineEvent)
    );
  }

  private onKeyDown(engineEvent: EngineEvent<KeyboardEvent>): void {
    if (engineEvent.eventData.key === "f" && !this._isPressed) {
      let playerEntity = this._entityManager.entities.find(
        (entity) => entity instanceof PlayerEntity
      );

      if (playerEntity && this._entityManager.areTouching(this, playerEntity)) {
        this._isPressed = true;
        this._onPress.dispatch(new EngineEvent(this));

        if (this._cooldown)
          setTimeout(() => {
            this._isPressed = false;
            this._onUnpress.dispatch(new EngineEvent(this));
          }, this._cooldown);
      }
    }
  }
}

export default ButtonStanding;
