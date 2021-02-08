class ScreenKey {
  constructor(code, text1, text2, view) {
    this.code = code;
    this.text1 = text1;
    this.text2 = text2;
    this.shifted = false;
    this.pressed = false;
    this.view = view;
    this.view.firstElementChild.textContent = this.text1;
  }
  contains(txt) {
    if (!txt || txt !== this.text1 && txt !== this.text2) return false;
    return true;
  }
  isMatch(txt) {
    if (!txt) return false;
    if (!this.shifted && txt !== this.text1) return false;
    if (this.shifted && txt !== this.text2) return false;
    return true;
  }
  down() {
    if (!this.pressed) {
      this.pressed = true;
      if (!this.view.classList.contains("pressed-key"))
        this.view.classList.add("pressed-key");
      if (this.ondown) this.ondown(this);
    }
  }
  up() {
    if (this.pressed) {
      this.pressed = false;
      if (this.view.classList.contains("pressed-key"))
        this.view.classList.remove("pressed-key");
      if (this.onup) this.onup(this);
    }
  }
  addCssClass(cssClass) {
    if (!this.view.classList.contains(cssClass)) {
      this.view.classList.add(cssClass);
    }
  }
  removeCssClass(cssClass) {
    if (this.view.classList.contains(cssClass)) {
      this.view.classList.remove(cssClass);
    }
  }
  shift() {
    this.shifted = true;
    this.view.firstElementChild.textContent = this.text2;
  }
  unshift() {
    this.shifted = false;
    this.view.firstElementChild.textContent = this.text1;
  }
  getView() {
    return this.view;
  }
}

class KeyShift extends ScreenKey {
  constructor(isLeft, view) {
    super(
      isLeft ? "ShiftLeft" : "ShiftRight",
      "Shift", "Shift", view
    );
  }
  shift() { }
  unshift() { }
}

class KeySpace extends ScreenKey {
  constructor(view) {
    super("Space", " ", " ", view);
  }
}
class KeyDisabled extends ScreenKey {
  constructor(text, view) {
    super("", text, text, view);
  }
  isMatch() { return false; }
  contains() { return false; }
  shift() { }
  unshift() { }
}


class ScreenKeyboard {
  constructor(keys) {
    if (!keys) throw new ArgumentIsEmptyError();
    this.keys = keys;
  }
  keyup(e) {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
      this.keys.forEach(x => x.unshift());
      return;
    }
    let k = this.keys.find(i => i.isMatch(e.key));
    if (k) k.up();
  }
  keydown(e) {
    if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
      this.keys.forEach(x => x.shift());
      return;
    }
    let k = this.keys.find(i => i.isMatch(e.key));
    if (k) k.down();
  }
  lightKey(key) {
    this._findKeyAndAddClass(key, "lighted-key");
  }
  unlightKey(key) {
    this._findKeyAndRemoveClass(key, "lighted-key");
  }
  unlightAll() {
    this.keys.forEach(i => i.removeCssClass("lighted-key"));
  }
  _findKeyAndAddClass(key, $class) {
    let k = this.keys.find(i => i.isMatch(key));
    if (k) k.addCssClass($class);
  }
  _findKeyAndRemoveClass(key, $class) {
    let k = this.keys.find(i => i.isMatch(key));
    if (k) k.removeCssClass($class);
  }
}

class KeysStandartBuilder {
  constructor(layout) {
    if (!layout) throw new ArgumentIsEmptyError();
    this._layout = layout;
    this.keys = [];
  }
  build(viewTarget) {
    let rowTemp = this._createRow();
    this._fillRowWithLetters(rowTemp, 0, 12);
    this._addToRow(rowTemp, new KeyDisabled("Backspace", this._createKeyView(13, "no-finger")));
    viewTarget.append(rowTemp);

    rowTemp = this._createRow();
    this._addToRow(rowTemp, new KeyDisabled("Tab", this._createKeyView(9, "no-finger")));
    this._fillRowWithLetters(rowTemp, 13, 24);
    this._addToRow(rowTemp, new KeyDisabled("Enter", this._createKeyView(9, "no-finger")));
    viewTarget.append(rowTemp);

    rowTemp = this._createRow();
    this._addToRow(rowTemp, new KeyDisabled("CapsLock", this._createKeyView(11, "no-finger")));
    this._fillRowWithLetters(rowTemp, 25, 36);
    this._addToRow(rowTemp, new KeyDisabled("", this._createKeyView(8, "no-finger")));
    viewTarget.append(rowTemp);

    rowTemp = this._createRow();
    this._addToRow(rowTemp, new KeyShift(true, this._createKeyView(14, "no-finger")));
    this._fillRowWithLetters(rowTemp, 37, 46);
    this._addToRow(rowTemp, new KeyShift(false, this._createKeyView(16, "no-finger")));
    viewTarget.append(rowTemp);

    rowTemp = this._createRow();
    this._addToRow(rowTemp, new KeyDisabled("Ctrl", this._createKeyView(6, "no-finger")));
    this._addToRow(rowTemp, new KeyDisabled("", this._createKeyView(6, "no-finger")));
    this._addToRow(rowTemp, new KeyDisabled("Alt", this._createKeyView(6, "no-finger")));
    this._addToRow(rowTemp, new KeySpace(this._createKeyView(50, "no-finger")));
    this._addToRow(rowTemp, new KeyDisabled("Alt", this._createKeyView(6, "no-finger")));
    this._addToRow(rowTemp, new KeyDisabled("", this._createKeyView(6, "no-finger")));
    this._addToRow(rowTemp, new KeyDisabled("", this._createKeyView(6, "no-finger")));
    this._addToRow(rowTemp, new KeyDisabled("Ctrl", this._createKeyView(6, "no-finger")));
    viewTarget.append(rowTemp);
    return this.keys;
  }
  _createKeyView(size, finger) {
    if (!size || !finger) throw new ArgumentIsEmptyError();
    let keyView = document.createElement("div");
    keyView.append(document.createElement("span"));
    keyView.classList.add("key");
    keyView.classList.add("key-size-" + size);
    keyView.classList.add(finger);
    return keyView;
  }
  _createRow() {
    let row = document.createElement("div");
    row.classList.add("row");
    return row;
  }
  _addToRow(row, key) {
    this.keys.push(key);
    row.append(key.getView());
  }
  _fillRowWithLetters(row, start, end) {
    let k;
    for (let i = start; i <= end; i++) {
      let keyView = this._createKeyView(6, this._layout[i].finger);
      k = new ScreenKey(this._layout[i].code, this._layout[i].text1, this._layout[i].text2, keyView);
      this.keys.push(k);
      row.append(k.getView());
    }
  }
}