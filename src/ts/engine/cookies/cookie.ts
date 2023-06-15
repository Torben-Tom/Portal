class Cookie {
  private _value: string;
  private _expires: Date | null;
  private _path: string | null = null;

  public get value(): string {
    return this._value;
  }

  public get expires(): Date | null {
    return this._expires;
  }

  public get path(): string | null {
    return this._path;
  }

  public constructor(
    value: string,
    expires: Date | null,
    path: string | null = null
  ) {
    this._value = value;
    this._expires = expires;
    this._path = path;
  }

  public static fromString(value: string): Cookie {
    const [cookieValue, expires, path] = value.split(";");

    return new Cookie(
      cookieValue.trim(),
      expires ? new Date(expires.trim()) : null,
      path ? path.trim() : null
    );
  }
}

export default Cookie;
