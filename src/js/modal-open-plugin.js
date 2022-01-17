import { galleryRender } from './render-gallery';

/*
* Plugin logiki okna modalnego
*/
class ModalController {
  constructor({
    cssClass,
    firstClickPlace,
    secondClickPlace,
    closeBtnSelector,
  }) {
    // ustawiam cechy obiektu
    this.firstClickPlace = this.checkClassData(firstClickPlace);
    this.secondClickPlace = this.checkClassData(secondClickPlace);
    this.closeBtnSelector = closeBtnSelector;
    this.cssClass = cssClass;
    this.modalWindow = this.setModalWindow();
    this.closeBtn = this.setCloseBtn();
    this.setEventListener();
    this.authorBtnSelector = 'modal-window__more--btn';
    this.loadAuthorBtn = this.setLoadAuthorBtn();
    this.authorId = this.setAuthorId();
    this.authorVenueId = this.setAuthorVenueId();
  };

  // funkcja która wyłapuje na co był klik (zdjęcie karty czy tekst karty) i ustawia jedyne okno modalne
  setModalWindow() {
    if (!this.firstClickPlace) {
      return this.secondClickPlace;
    } else {
      return this.firstClickPlace;
    };
  }

  // sprawdzam bagi
  checkClassData(classData) {
    if(!classData) {
      return;
    };
    return classData;
  }

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

  // zamykam okno
  closeModal() {
      if (!this.modalWindow) {
        return;
    };
    this.modalWindow.classList.add(this.cssClass);
    this.loadAuthorBtn.classList.remove('opened-author-btn');
  }

  // ustalam przycisk "Load more from this author"
  setLoadAuthorBtn() {
    const btn = this.modalWindow.querySelector(`.${this.authorBtnSelector}`);
    return btn;
  }

  // ustawiam authorId
  setAuthorId() {
    return this.modalWindow.id;
  }

  // ustawiam venueAuthorId
  setAuthorVenueId() {
    return this.modalWindow.children[0].id
  }

  // oddaję authorId + venueAuthorId (nie wiem, które jest potrzebne, więc oddaje 2)
  getAuthorId() {
    return { authorId: this.authorId, venueId: this.authorVenueId }
  }

  // przycisk 'Check on Website ma zbyt mały width, zmieniam width na 200px
  setAdditionalBtnStyle() {
    const btn = this.modalWindow.querySelector(`.modal-window__btn`);
    if (btn.textContent.includes('Check on Website')) {
      btn.style.width = '200px';
    }
  }
}


// funkcja kontroli plugina okna modalnego

function launchModalWindowPlugin(gallery, closeBtnSelector) {
  // podłączam eventListener do kontenera galerii
    gallery.addEventListener('click', (e) => {
    if(e.target.classList.value.includes('gallery__event')) {
      const firstModal = e.target.children[2];
      const secondModal = e.target.offsetParent.children[2];

      // podłączam plugin
      const modalController = new ModalController({
          cssClass: 'modal-closed',
          firstClickPlace: firstModal,
          secondClickPlace: secondModal,
          closeBtnSelector: closeBtnSelector
      });

      modalController.openModal();
      modalController.setAdditionalBtnStyle();
      // podłączam zamykanie okna przy kliku na tło
      window.addEventListener('click', (e) => {
        if (e.target === firstModal || e.target === secondModal) {
          modalController.closeModal();
        }
      })

      // połączam przycisk "Load more from this author"
      const fromAuthorFetch = modalController.getAuthorId();
      loadMoreAuthor('opened-author-btn', fromAuthorFetch.venueId, gallery);
    }
  });
};


function loadMoreAuthor(cssClass, authorId) {
  // połączam przycisk "Load more from this author"
  const btn = document.querySelector(`.${cssClass}`);
  btn.addEventListener('click', () => {
    galleryRender({ authorId: authorId})
  })
}

export { launchModalWindowPlugin };