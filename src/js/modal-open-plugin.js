import { galleryRender } from './render-gallery';

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
    this.authorBtnSelector = 'modal-window__more--btn';
    this.loadAuthorBtn = this.setLoadAuthorBtn();
    this.isOpen = false;
    this.authorId = this.setAuthorId();
    this.authorVenueId = this.setAuthorVenueId();
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
    this.isOpen = true;
    this.modalWindow.classList.remove(this.cssClass);
    this.loadAuthorBtn.classList.add('opened-author-btn');
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

  getModalStatus() {
    return this.isOpen;
  }

  closeModal() {
      if (!this.modalWindow) {
        return;
    };
    this.isOpen = false;
    this.modalWindow.classList.add(this.cssClass);
    this.loadAuthorBtn.classList.remove('opened-author-btn');
  }

  setLoadAuthorBtn() {
    const btn = this.modalWindow.querySelector(`.${this.authorBtnSelector}`);
    return btn;
  }

  setAuthorId() {
    return this.modalWindow.id;
  }

  setAuthorVenueId() {
    return this.modalWindow.children[0].id
  }


  getAuthorId() {
    return { authorId: this.authorId, venueId: this.authorVenueId }
  }
}

function launchModalWindowPlugin(gallery, closeBtnSelector) {
    gallery.addEventListener('click', (e) => {
    if(e.target.classList.value.includes('gallery__event')) {
      const firstModal = e.target.children[2];
      const secondModal = e.target.offsetParent.children[2];
      const modalController = new ModalController({
          cssClass: 'modal-closed',
          firstClickPlace: firstModal,
          secondClickPlace: secondModal,
          closeBtnSelector: closeBtnSelector
      });
      modalController.openModal();
      window.addEventListener('click', (e) => {
        if (e.target === firstModal || e.target === secondModal) {
          modalController.closeModal();
        }
      })
      const fromAuthorFetch = modalController.getAuthorId();
      loadMoreAuthor('opened-author-btn', fromAuthorFetch.venueId, gallery);
    }
  });
};


function loadMoreAuthor(cssClass, authorId) {
  const btn = document.querySelector(`.${cssClass}`);
  btn.addEventListener('click', () => {
    galleryRender({ authorId: authorId})
  })
}

export { launchModalWindowPlugin };