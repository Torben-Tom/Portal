import CheckBox from "../../engine/scene/elements/checkbox.js";
import Scene from "../../engine/scene/scene.js";

class InGame extends Scene {
  public constructor() {
    super("rgba(0, 0, 0, 0)");

    let testCheckBox = new CheckBox(
      375,
      0,
      50,
      50,
      "rgba(0, 0, 0, 0)",
      "rgba(0, 255, 0, 0.5)",
      "rgba(255, 255, 255, 0.25)",
      "rgba(0, 255, 0, 0.25)",
      "white",
      "white",
      "white",
      "white",
      "black",
      "black",
      "black",
      "black",
      1,
      "bold 20px Arial",
      "center",
      "middle",
      "⛔",
      "🎵",
      true,
      true
    );

    testCheckBox.onClick = () => {
      testCheckBox.toggle();
      console.log("Music: " + testCheckBox.checked);
    };

    this.addElement(testCheckBox);
  }
}

export default InGame;
