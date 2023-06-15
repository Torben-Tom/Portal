import Cookie from "./cookie.js";

class CookieManager {
  private _cookies: Map<string, Cookie>;

  public get cookies(): Map<string, Cookie> {
    return this._cookies;
  }

  public constructor() {
    this._cookies = new Map<string, Cookie>();
  }

  public has(name: string): boolean {
    return this._cookies.has(name);
  }

  public get(name: string): Cookie {
    if (!this.has(name)) {
      throw new Error(`Cookie with name '${name}' does not exist.`);
    }

    return this._cookies.get(name) as Cookie;
  }

  public set(name: string, value: Cookie): void {
    this._cookies.set(name, value);
  }
}

export default CookieManager;
