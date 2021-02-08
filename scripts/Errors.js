class ArgumentIsEmptyError extends Error {
    constructor() {
      super("argument is empty");
      this.name = "ArgumentIsEmptyError";
    }
  }