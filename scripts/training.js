class Training {
  constructor(screenKeyboard, inputField, questService, infoDisplay) {
    if (!screenKeyboard || !inputField || !infoDisplay) throw new ArgumentIsEmptyError();
    this.started = false;
    this.infoDisplay = infoDisplay;
    this.board = screenKeyboard;
    this.questService = questService;
    this.inputField = inputField;
    this.inputField.onenter = (e) => this._onNextLetter();
    this.inputField.oncomplete = () => this._nextLine();
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
    this.questService.reset();
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
    this.infoDisplay.showSpeed(this.speedRegistrar.stepsPerMin);
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
      this.questService.onLineEntered(this.speedRegistrar.stepsPerMin);
      let line = this.questService.getLine();
      this.inputField.fill(line);
      this.board.lightKey(this.inputField.getExpect());
      this.speedRegistrar.reset();
      this.speedRegistrar.regOn();
    }
  }
}