class Training {
  constructor(layout, screenKeyboard, inputField) {
    if (!layout || !screenKeyboard || !inputField) throw new ArgumentIsEmptyError();
    this.started = false;
    this._layout = layout;
    this.board = screenKeyboard;
    this.inputField = inputField;
    this.inputField.onenter = (e) => this._onNextLetter();
    this.inputField.oncomplete = () => this._nextLine();
    this.inputField.onerror = (e) => this._errorHandler(e);
  }
  get questProvider() {
    if (!this._qp_) this._qp_ = new QuestProvider();
    return this._qp_;
  }
  set questProvider(questProv) {
    if (!questProv) throw new ArgumentIsEmptyError();
    this._qp_ = questProv;
  }
  get speedRegistrar() {
    if (!this._sr_) this._sr_ = new SpeedRegistrar();
    return this._sr_;
  }
  set speedRegistrar(registrar) {
    if (!registrar) throw new ArgumentIsEmptyError();
    this._sr_ = registrar;
  }
  start() {
    this.started = true;
    this._nextLine();
    if (this._func_1) return;
    this._func_1 = (e) => this._keyup(e);
    this._func_2 = (e) => this._keydown(e);
    window.addEventListener("keyup", this._func_1);
    window.addEventListener("keydown", this._func_2);
  }
  stop() {
    this.started = false;
    this.questProvider.resetLvl();
    this.speedRegistrar.regOff();
    this.speedRegistrar.reset();
    this.inputField.clear();
    this.board.unlightAll();
    if (!this._func_1) return;
    window.removeEventListener("keyup", this._func_1);
    window.removeEventListener("keydown", this._func_2);
    this._func_1 = null;
    this._func_2 = null;
  }
  _onNextLetter() {
    this.speedRegistrar.step();
    this.board.unlightAll();
    this.board.lightKey(this.inputField.getExpect());
  }
  _keyup(e) {
    if(e.key == this.inputField.getExpect())this.board.unlightKey(e.key);
    this.board.keyup(e);
    this.inputField.enter(e);
  }
  _keydown(e) {
    this.board.keydown(e);
  }
  _nextLine() {
    this.speedRegistrar.regOff();
    if (this.started) {
      this.questProvider.onLineEntered(this.speedRegistrar.getStat());
      let line = this.questProvider.getLine();
      this.inputField.fill(line);
      this.board.lightKey(this.inputField.getExpect());
      this.speedRegistrar.reset();
      this.speedRegistrar.regOn();
    }
  }
  _errorHandler(e) {
    let item = this._layout.find(x => x.code === e.code);
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