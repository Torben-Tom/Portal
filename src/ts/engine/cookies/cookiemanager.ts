import Cookie from "./cookie.js";

class CookieManager {
  private readonly _firstDate1970UTC: string;

  private _cookies: Map<string, Cookie>;

  public get cookies(): Map<string, Cookie> {
    return this._cookies;
  }

  public constructor() {
    this._firstDate1970UTC = new Date(0).toUTCString();
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

  public set(name: string, cookie: Cookie): void {
    this._cookies.set(name, cookie);
  }

  public getOrSet(name: string, cookie: Cookie): Cookie {
    if (this.has(name)) {
      return this.get(name);
    }

    this.set(name, cookie);
    return cookie;
  }

  public delete(name: string): void {
    this._cookies.delete(name);
  }

  public clear(): void {
    this._cookies.clear();
  }

  public load(): void {
    let newCookies: Map<string, Cookie> = new Map<string, Cookie>();

    let cookieString = document.cookie.trim();
    if (cookieString) {
      let split = cookieString.split(";");
      for (let part of split) {
        let [name, value] = part.split("=");

        if (!name) {
          throw new Error("Failed to load cookie: Name is empty.");
        }

        if (!value) {
          throw new Error(`Failed to load cookie ${name}: Value is empty.`);
        }
        let cookie: Cookie = new Cookie(
          decodeURI(value),
          null,
          null,
          null,
          false
        );
        newCookies.set(name.trim(), cookie);
      }
    }

    this._cookies = newCookies;
  }

  public cleanBrowserCookies(): void {
    let cookieString = document.cookie.trim();

    if (cookieString) {
      let split = document.cookie.split(";");
      for (let part of split) {
        let name = part.split("=")[0];
        if (!this.has(name)) {
          document.cookie = `${name.trim()};Expires=${
            this._firstDate1970UTC
          };SameSite=Lax`;
        }
      }
    }
  }

  public save(): void {
    this.cleanBrowserCookies();

    for (let [name, cookie] of this._cookies) {
      if (cookie.updated) {
        if (!cookie.fullySpecified) {
          console.warn(
            `Cookie ${name} was updated but not fully specified. Can't save updated value to disk!`
          );
          continue;
        }

        let expires: string = cookie.expires!.toUTCString();
        let sameSite: string = cookie.sameSite!;
        let secure: string = cookie.secure! ? "true" : "false";

        document.cookie = `${name}=${encodeURI(
          cookie.value
        )};Expires=${expires};SameSite=${sameSite};Secure=${secure}`;
      }
    }
  }
}

export default CookieManager;
