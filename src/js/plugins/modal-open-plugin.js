import { EventListener } from '../components/addEventListener';
class ModalController {
  constructor({
    cssClass,
    modal,
    closeBtnSelector,
  }) {
    this.closeBtnSelector = closeBtnSelector;
    this.cssClass = cssClass;
    this.modalWindow = modal;
    this.closeBtn = this.setCloseBtn();
    this.setEventListener();
    this.authorBtnSelector = 'modal-window__more--btn';
    this.loadAuthorBtn = this.setLoadAuthorBtn();
    this.openModal();
    this.setAdditionalBtnStyle();
  };

  setCloseBtn() {
    const closeBtn = this.modalWindow.querySelector(`.${this.closeBtnSelector}`);
    return closeBtn;
  }

  openModal() {
    if (!this.modalWindow) {
      return;
    };
    this.modalWindow.classList.remove(this.cssClass);
    this.loadAuthorBtn.classList.add('opened-author-btn');
  }

  setEventListener() {
    const modalWindowBtn = new EventListener({
      domElement: this.closeBtn,
      listenType: 'click',
      callbackFunction: () => {
        this.closeModal()
      }
    })
    modalWindowBtn.setEventListener();

    const modalWindowField = new EventListener({
      domElement: this.modalWindow,
      listenType: 'click',
      callbackFunction: (e) => {
        if (e.target === this.modalWindow) {
          this.closeModal();
        }
      }
    })
    modalWindowField.setEventListener();
  }

  closeModal() {
    this.modalWindow.classList.add(this.cssClass);
    this.loadAuthorBtn.classList.remove('opened-author-btn');
  }

  setLoadAuthorBtn() {
    const btn = this.modalWindow.querySelector(`.${this.authorBtnSelector}`);
    return btn;
  }

  getAuthorId() {
    return this.modalWindow.children[0].id;
  }

  setAdditionalBtnStyle() {
    const btn = this.modalWindow.querySelector(`.modal-window__btn`);
    if (btn && btn.textContent.includes('Check on Website')) {
      btn.classList.add('check');
    }
  }
}


export { ModalController };