import { RenderCard } from './card-render-plugin';
import { ModalController } from './modal-open-plugin';
import { GenerateLink } from './link-generator';
import { Loader } from '../components/loading';
import { EventListener } from '../components/addEventListener';
import { galleryRender } from '../render-gallery';
const axios = require('axios');
import { refs } from '../components/refs';


/*
* Plugin Fetch
*/

class MakeFetch {
  constructor({
    container,
    input,
    selectContainer,
    keyword,
    countryCode,
    authorId,
    pageNumber,
    svg,
  }) {
    // czyszczę fetch dla nowego wykorzystania
    this.clearFetch();

    // ustawiam cechy obiektu
    this.container = container;
    this.eventList = [];
    this.input = input;
    this.selectContainer = selectContainer;
    this.pageNumber = 0;
    this.keyword = keyword;
    this.countryCode = countryCode;
    this.authorId = authorId;
    this.pageNumber = pageNumber;
    this.modalWindow = new EventListener({
      domElement: this.container,
      listenType: 'click',
      callbackFunction: this.controlModalWindow,
    })

    // połączam plugin-generator linków
    this.linkGeneratorPlugin = new GenerateLink({
      countryCode: this.countryCode,
      keyword: this.keyword,
      authorId: this.authorId,
      pageNumber: this.pageNumber,
    });
    this.loadContainer = refs.loading;
    this.LoaderPlugin = new Loader(this.loadContainer);
    // oddaję linka z pomocą plugina
    this.link = this.linkGeneratorPlugin.giveLink();
    this.svgSprite = `<svg class='failed-svg'><use href="${svg}#icon-denied"></use></svg>`;

  }

  // robię fetch
  async makeFetch() {
    if (this.container.classList.value.includes('shown')) {
        this.container.classList.remove('shown');
    };
      // funkcja czyszczenia kontenera kart ewentów
    this._clearContainer();
    this.LoaderPlugin.displayLoading();
    await axios.get(this.link)
      .then(result => this._successfulFetchService(result.data))
      .catch((error) => {
        this._failedFetch(error);
      })
      .finally(() => {
        this._clearInputs();
      })
  }

  // funkcja, jeżeli fetch sukcess
  _successfulFetchService(data) {
      // funkcja ustawiania liczby stron przy fetch
    this._setPageNumber(data);
      // funkcja ustawienia listy ewentów
    this._setEventList(data);
    this.eventList.forEach(element => {
      // podłączam plugin rysowania kart i okna modalnego
      const renderCardPlugin = new RenderCard({event: element, svgSprite: this.svgSprite});
      const renderedCard = renderCardPlugin.getEventCard();
      this.container.insertAdjacentHTML(
        'beforeend',
        renderedCard
      );
    });

    this.modalWindow.setEventListener();
    this.LoaderPlugin.hideLoading();
    this._addStyle(this.container, 'shown')

  }

  // funkcja, jeżeli fetch nie udał się
  _failedFetch(error) {
    console.log(error);
    this.LoaderPlugin.hideLoading();
    const notif = `<p class='failed'>${this.svgSprite} Sorry, we do not find the result of your search, try please later</p>`;
    this.container.insertAdjacentHTML('afterbegin', notif);
    this._addStyle(this.container, 'shown')
  }

  // funkcja czyszczenia kontenera kart ewentów
  _clearContainer() {
      this.container.innerHTML = '';
  }

  _addStyle(domElement, cssClass) {
    domElement.classList.add(cssClass);
  }

  // funkcja ustawienia listy ewentów
  _setEventList(data)  {
    this.eventList = data._embedded.events;
  }

  // funkcja ustawiania liczby stron przy fetch
  _setPageNumber(data) {
    this.pageNumber = data.page.totalPages;
  }

  // funkcja oddania liczby stron z fetch
  _getPageNumber() {
    return this.pageNumber;
  }

  // funkcja czyszczenia inputów (jest wykonalna niezależnie od wyników Fetch)
  _clearInputs() {
    if (this.input && this.selectContainer) {
      this.input.value = '';
      this.selectContainer.value = '';
    }
  }

  // funkcja czyszczenia plugina Fetch
  clearFetch() {
    this.container = '';
    this.eventList = [];
    this.notification = '';
    this.input = '';
    this.selectContainer = '';
    this.pageNumber = 0;
    this.keyword = '';
    this.countryCode = '';
    this.authorId = '';
    this.pageNumber = '';
    this.linkGeneratorPlugin = '';
    this.link = '';
  }

  controlModalWindow(e) {
    const modalContainer = checkModalContainer(e.target, e.target.offsetParent);
    if (modalContainer) {
      const modal = modalContainer.children[2];
      // podłączam plugin
      const modalController = new ModalController({
        cssClass: 'modal-closed',
        modal: modal,
        closeBtnSelector: 'modal-window__close--btn'
      });

      if (e.target.classList.value.includes('more--btn')) {
        const fromAuthorFetch = modal.children[0].id;
        galleryRender({
          authorId: fromAuthorFetch,
          loadContainer: this.loadContainer
        });
      }
      if (e.target === modal) {
        modalController.closeModal();
      }


    }
  }
}

export { MakeFetch };

function checkModalContainer(firstContainer, secondContainer) {
  if (secondContainer && secondContainer.classList.value.includes('modal-window__container')) {
      return secondContainer.parentNode.parentNode;
  }
  if (!firstContainer.classList.value.includes('gallery__event')) {
      return secondContainer;
  }
  return firstContainer;
}

