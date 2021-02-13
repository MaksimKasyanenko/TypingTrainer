class KeyboardLayoutBase{
    constructor(){
        this.schema=[{ code: "Digit1", text1: "1", text2: "!", finger: "little-fing-left" }];
    }
    errorHandler(e) {
        let item = this.schema.find(x => x.code === e.code);
        if (item) {
          if (e.key != item.text1 && e.key != item.text2) {
            window.showMessage("Ошибка!", "Возможно, выбран неверный язык ввода");
          }
          if ((e.key == item.text1 && e.key != item.text2 && e.shiftKey) ||
            (e.key != item.text1 && e.key == item.text2 && !e.shiftKey)) {
            window.showMessage("Ошибка!", "Возможно, включен CAPSLOCK");
          }
        }
      }
}
class KeyboardLayoutQWERTY extends KeyboardLayoutBase{
    constructor(){
        super();
        this.schema = [{ code: "Backquote", text1: "`", text2: "~", finger: "little-fing-left" },
        { code: "Digit1", text1: "1", text2: "!", finger: "little-fing-left" },
        { code: "Digit2", text1: "2", text2: "@", finger: "ring-fing-left" },
        { code: "Digit3", text1: "3", text2: "#", finger: "middle-fing-left" },
        { code: "Digit4", text1: "4", text2: "$", finger: "index-fing-left" },
        { code: "Digit5", text1: "5", text2: "%", finger: "index-fing-left" },
        { code: "Digit6", text1: "6", text2: "^", finger: "index-fing-right" },
        { code: "Digit7", text1: "7", text2: "&", finger: "index-fing-right" },
        { code: "Digit8", text1: "8", text2: "*", finger: "middle-fing-right" },
        { code: "Digit9", text1: "9", text2: "(", finger: "ring-fing-right" },
        { code: "Digit0", text1: "0", text2: ")", finger: "little-fing-right" },
        { code: "Minus", text1: "-", text2: "_", finger: "little-fing-right" },
        { code: "Equal", text1: "=", text2: "+", finger: "little-fing-right" },

        { code: "KeyQ", text1: "q", text2: "Q", finger: "little-fing-left" },
        { code: "KeyW", text1: "w", text2: "W", finger: "ring-fing-left" },
        { code: "KeyE", text1: "e", text2: "E", finger: "middle-fing-left" },
        { code: "KeyR", text1: "r", text2: "R", finger: "index-fing-left" },
        { code: "KeyT", text1: "t", text2: "T", finger: "index-fing-left" },
        { code: "KeyY", text1: "y", text2: "Y", finger: "index-fing-right" },
        { code: "KeyU", text1: "u", text2: "U", finger: "index-fing-right" },
        { code: "KeyI", text1: "i", text2: "I", finger: "middle-fing-right" },
        { code: "KeyO", text1: "o", text2: "O", finger: "ring-fing-right" },
        { code: "KeyP", text1: "p", text2: "P", finger: "little-fing-right" },
        { code: "BracketLeft", text1: "[", text2: "{", finger: "little-fing-right" },
        { code: "BracketRight", text1: "]", text2: "}", finger: "little-fing-right" },

        { code: "KeyA", text1: "a", text2: "A", finger: "little-fing-left" },
        { code: "KeyS", text1: "s", text2: "S", finger: "ring-fing-left" },
        { code: "KeyD", text1: "d", text2: "D", finger: "middle-fing-left" },
        { code: "KeyF", text1: "f", text2: "F", finger: "index-fing-left" },
        { code: "KeyG", text1: "g", text2: "G", finger: "index-fing-left" },
        { code: "KeyH", text1: "h", text2: "H", finger: "index-fing-right" },
        { code: "KeyJ", text1: "j", text2: "J", finger: "index-fing-right" },
        { code: "KeyK", text1: "k", text2: "K", finger: "middle-fing-right" },
        { code: "KeyL", text1: "l", text2: "L", finger: "ring-fing-right" },
        { code: "Semicolon", text1: ";", text2: ":", finger: "little-fing-right" },
        { code: "Quote", text1: "'", text2: '"', finger: "little-fing-right" },
        { code: "Backslash", text1: "\\", text2: "|", finger: "little-fing-right" },

        { code: "KeyZ", text1: "z", text2: "Z", finger: "little-fing-left" },
        { code: "KeyX", text1: "x", text2: "X", finger: "ring-fing-left" },
        { code: "KeyC", text1: "c", text2: "C", finger: "middle-fing-left" },
        { code: "KeyV", text1: "v", text2: "V", finger: "index-fing-left" },
        { code: "KeyB", text1: "b", text2: "B", finger: "index-fing-left" },
        { code: "KeyN", text1: "n", text2: "N", finger: "index-fing-right" },
        { code: "KeyM", text1: "m", text2: "M", finger: "index-fing-right" },
        { code: "Comma", text1: ",", text2: "<", finger: "middle-fing-right" },
        { code: "Period", text1: ".", text2: ">", finger: "ring-fing-right" },
        { code: "Slash", text1: "/", text2: "?", finger: "little-fing-right" }];
    }
}