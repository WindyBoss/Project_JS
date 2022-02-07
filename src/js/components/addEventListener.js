class EventListener {
  constructor({
    domElement,
    listenType,
    callbackFunction,
  })
  {
    this.domElement = domElement;
    this.listenType = listenType;
    this.callbackFunction = callbackFunction;
  }

  setEventListener() {
    if (!this.domElement) {
      return;
    }
    this.domElement.addEventListener(this.listenType, this.callbackFunction);
  }

  removeEventListener() {
    if (!this.domElement) {
      return;
    }
    this.domElement.removeEventListener(this.listenType, this.callbackFunction);
  }
}

export { EventListener };