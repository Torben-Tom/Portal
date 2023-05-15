import SpriteSheet from "./spritesheet.js";

class AssetManager{
    private _spriteSheets: Map<string, SpriteSheet> = new Map();

    constructor(){ 
        this._spriteSheets = new Map();
    }

    registerSpriteSheet(name: string, htmlImageElement: HTMLImageElement): void {
        this._spriteSheets.set(name, new SpriteSheet(htmlImageElement));
    }

    getSpriteSheet(name: string): SpriteSheet {
        if(!this._spriteSheets.has(name)){
            throw new Error(`SpriteSheet ${name} not found`);
        }
        return this._spriteSheets.get(name) as SpriteSheet;
    }
}

export default AssetManager;