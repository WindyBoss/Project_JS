import { EventListener } from '../components/addEventListener';

/*
* Plugin logiki okna modalnego
*/
class ModalController {
  constructor({
    cssClass,
    modal,
    closeBtnSelector,
  }) {
    // ustawiam cechy obiektu
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

  // ustawiam przycisk zamykania okna modalnego
  setCloseBtn() {
    const closeBtn = this.modalWindow.querySelector(`.${this.closeBtnSelector}`);
    return closeBtn;
  }

  // otwieram okno modalne
  openModal() {
    if (!this.modalWindow) {
      return;
    };
    this.modalWindow.classList.remove(this.cssClass);
    this.loadAuthorBtn.classList.add('opened-author-btn');
  }

  // dodaję addEventListener dla zamknięcia okna modalnego
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

  // zamykam okno
  closeModal() {
    this.modalWindow.classList.add(this.cssClass);
    this.loadAuthorBtn.classList.remove('opened-author-btn');
  }

  // ustalam przycisk "Load more from this author"
  setLoadAuthorBtn() {
    const btn = this.modalWindow.querySelector(`.${this.authorBtnSelector}`);
    return btn;
  }

  // oddaję authorId + venueAuthorId (nie wiem, które jest potrzebne, więc oddaje 2)
  getAuthorId() {
    return this.modalWindow.children[0].id;
  }

  // przycisk 'Check on Website ma zbyt mały width, zmieniam width na 200px
  setAdditionalBtnStyle() {
    const btn = this.modalWindow.querySelector(`.modal-window__btn`);
    if (btn.textContent.includes('Check on Website')) {
      btn.classList.add('check');
    }
  }
}


export { ModalController };