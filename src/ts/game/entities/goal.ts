import AssetManager from "../../engine/assets/assetmanager.js";
import Services from "../../engine/dependencyinjection/services.js";
import Entity from "../../engine/entitiy/entity.js";
import EntityManager from "../../engine/entitiy/entitymanager.js";
import EngineEvent from "../../engine/event/engineevent.js";
import EngineEventHandler from "../../engine/event/engineventhandler.js";
import PlayerEntity from "./playerentity.js";

class Goal extends Entity {
  private _isTouched;
  private _onTouch: EngineEventHandler<Goal, EngineEvent<Goal>>;
  private _entityManager: EntityManager;

  get onTouch(): EngineEventHandler<Goal, EngineEvent<Goal>> {
    return this._onTouch;
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
      Services.resolve<AssetManager>("AssetManager").getTexture("goal")
    );

    this._isTouched = false;
    this._onTouch = new EngineEventHandler<Goal, EngineEvent<Goal>>();
    this._entityManager = Services.resolve<EntityManager>("EntityManager");
  }

  public update(delta: number): void {
    if (this._entityManager) {
      let shouldBePressed =
        this._entityManager.touches.filter(
          (touch) =>
            touch.belongsToEntity(this) && touch.belongsToType(PlayerEntity)
        ).length > 0;

      if (shouldBePressed) {
        this._isTouched = true;
        this._onTouch.dispatch(new EngineEvent<Goal>(this));
      }
    }
  }
}

export default Goal;
