class ModalController {
  constructor({
    cssClass,
    firstClickPlace,
    secondClickPlace,
    closeBtnSelector,
  }) {
    this.firstClickPlace = this.checkClassData(firstClickPlace);
    this.secondClickPlace = this.checkClassData(secondClickPlace);
    this.closeBtnSelector = closeBtnSelector;
    this.cssClass = cssClass;
    this.modalWindow = this.setModalWindow();
    this.closeBtn = this.setCloseBtn();
    this.setEventListener();
  };

  setModalWindow() {
    if (!this.firstClickPlace) {
      return this.secondClickPlace;
    } else {
      return this.firstClickPlace;
    };
  }

  checkClassData(classData) {
    if(!classData) {
      return;
    };
    return classData;
  }

  setCloseBtn() {
    const closeBtn = this.modalWindow.querySelector(`.${this.closeBtnSelector}`);
    return closeBtn;
  }

  openModal() {
    if (!this.modalWindow) {
      return;
    };
    this.modalWindow.classList.remove(this.cssClass);
  }

  setEventListener() {
    if (!this.closeBtn) {
      return;
    };
    this.closeBtn.addEventListener('click', () => {
      if (!this.modalWindow) {
        return;
      };
      this.modalWindow.classList.add(this.cssClass);
    });
  }

  closeModal() {
      if (!this.modalWindow) {
        return;
      };
      this.modalWindow.classList.add(this.cssClass);
  }
}

export { ModalController };