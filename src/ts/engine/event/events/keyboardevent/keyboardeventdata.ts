class KeyBoardEventData {
  private _key: string;

  get key(): string {
    return this._key;
  }

  constructor(key: string) {
    this._key = key;
  }
}

export default KeyBoardEventData;
