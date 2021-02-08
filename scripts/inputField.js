class InputField {
  constructor(enteredView, expectedView) {
    if (!enteredView || !expectedView) throw new ArgumentIsEmptyError();
    this.entered = enteredView;
    this.expected = expectedView;
  }
  clear() {
    this.entered.innerHTML = "&nbsp;";
    this.expected.innerHTML = "";
  }
  getExpect() {
    if (!this.expected.firstElementChild) return "none";
    return this.expected.firstElementChild.textContent;
  }
  enter(e) {
    if (this.expected.firstElementChild) {
      if (e.key === this.expected.firstElementChild.textContent) {
        let el = this.expected.removeChild(this.expected.firstElementChild);
        this.entered.textContent += el.textContent;
        if (this.onenter) this.onenter(e);
        if (!this.expected.firstElementChild) {
          if (this.oncomplete) this.oncomplete();
          return;
        }
      } else {
        if (this.onerror) this.onerror(e, this.expected.firstElementChild.textContent);
      }
    }
  }
  fill(text) {
    this.entered.innerHTML = "";
    this.expected.innerHTML = "";
    for (let char of text) {
      this.expected.append(this._wrapSpan(char));
    }
  }
  _wrapSpan(ch) {
    let span = document.createElement("span");
    span.textContent = ch;
    return span;
  }
}