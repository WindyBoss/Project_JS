import { RenderCard } from './card-render-plugin';
import { launchModalWindowPlugin } from './modal-open-plugin';
import { GenerateLink } from './link-generator';

/*
* Plugin Fetch
*/
class MakeFetch {
  constructor({ container, notification, input, selectContainer, keyword, countryCode, authorId, pageNumber }) {
    // czyszczę fetch dla nowego wykorzystania
    this.clearFetch();

    // ustawiam cechy obiektu
    this.container = container;
    this.eventList = [];
    this.notification = notification;
    this.input = input;
    this.selectContainer = selectContainer;
    this.pageNumber = 0;
    this.keyword = keyword;
    this.countryCode = countryCode;
    this.authorId = authorId;
    this.pageNumber = pageNumber;

    // połączam plugin-generator linków
    this.linkGeneratorPlugin = new GenerateLink({
      countryCode: this.countryCode,
      keyword: this.keyword,
      authorId: this.authorId,
      pageNumber: this.pageNumber,
    });

    // oddaję linka z pomocą plugina
    this.link = this.linkGeneratorPlugin.giveLink();
  }

  // robię fetch
  async makeFetch() {
    await fetch(this.link)
      .then(response => response.json())
      .then(data => this._successfulFetchService(data))
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
      // funkcja czyszczenia kontenera kart ewentów
      this._clearContainer();
      // funkcja ustawienia listy ewentów
      this._setEventList(data);
      this.eventList.forEach(element => {
        // podłączam plugin rysowania kart i okna modalnego
        const renderCardPlugin = new RenderCard(element);
        const renderedCard = renderCardPlugin.getEventCard();
        this.container.insertAdjacentHTML(
          'beforeend',
          renderedCard
        );
      });

      // łączę plugin okna modalnego
      launchModalWindowPlugin(this.container, 'modal-window__close--btn');
  }

  // funkcja, jeżeli fetch nie udał się
  _failedFetch() {
    this.notification.failure('Sorry, we do not find the result of your search, try please later');
  }

  // funkcja czyszczenia kontenera kart ewentów
  _clearContainer() {
      this.container.innerHTML = '';
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
}


export { MakeFetch };

