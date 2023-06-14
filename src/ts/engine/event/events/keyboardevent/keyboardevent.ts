import EngineEvent from "../../engineevent.js";
import KeyBoardEventData from "./keyboardeventdata.js";

class KeyBoardEvent extends EngineEvent<KeyBoardEventData> {
  constructor(key: string) {
    super(new KeyBoardEventData(key));
  }
}

export default KeyBoardEvent;
