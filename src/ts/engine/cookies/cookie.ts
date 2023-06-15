class Cookie {
  private _value: string;
  private _expires: Date | null;
  private _sameSite: "Strict" | "Lax" | "None" | null;
  private _secure: boolean | null;
  private _updated: boolean;

  public get value(): string {
    return this._value;
  }

  public get expires(): Date | null {
    return this._expires;
  }

  public get sameSite(): "Strict" | "Lax" | "None" | null {
    return this._sameSite;
  }

  public get secure(): boolean | null {
    return this._secure;
  }

  public get updated(): boolean {
    return this._updated;
  }

  public set updated(value: boolean) {
    this._updated = value;
  }

  public get fullySpecified(): boolean {
    return (
      this._value.length > 0 &&
      this._expires !== null &&
      this._sameSite !== null &&
      this._secure !== null
    );
  }

  public constructor(
    value: string,
    expires: Date | null,
    sameSite: "Strict" | "Lax" | "None" | null,
    secure: boolean | null,
    updated: boolean = true
  ) {
    this._value = value;
    this._expires = expires;
    this._sameSite = sameSite;
    this._secure = secure;
    this._updated = updated;
  }

  public update(
    value: string,
    expires: Date,
    sameSite: "Strict" | "Lax" | "None",
    secure: boolean
  ): void {
    this._value = value;
    this._expires = expires;
    this._sameSite = sameSite;
    this._secure = secure;
    this._updated = true;
  }
}

export default Cookie;
