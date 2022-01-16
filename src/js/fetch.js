import { RenderCard } from './card-render-plugin';
import { launchModalWindowPlugin } from './modal-open-plugin';
import { GenerateLink } from './link-generator';

class MakeFetch {
  constructor({ container, notification, input, selectContainer, keyword, countryCode, authorId, pageNumber }) {
    this.clearFetch();
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

    this.linkGeneratorPlugin = new GenerateLink({
      countryCode: this.countryCode,
      keyword: this.keyword,
      authorId: this.authorId,
      pageNumber: this.pageNumber,
    });
    this.link = this.linkGeneratorPlugin.giveLink();
  }

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
  _successfulFetchService(data) {
      this._setPageNumber(data);
      this._clearContainer();
      this._setEventList(data);
      this.eventList.forEach(element => {
        const renderCardPlugin = new RenderCard(element);
        const renderedCard = renderCardPlugin.returnModalWindow();
        this.container.insertAdjacentHTML(
          'beforeend',
          renderedCard
        );
      });

      launchModalWindowPlugin(this.container, 'modal-window__close--btn');
  }

  _failedFetch(error) {
    this.notification.failure('Sorry, we do not find the result of your search, try please later');
  }

    _clearContainer() {
        this.container.innerHTML = '';
    }

    _setEventList(data)  {
      this.eventList = data._embedded.events;
  }

  _setPageNumber(data) {
    this.pageNumber = data.page.totalPages;
  }

  _getPageNumber() {
    return this.pageNumber;
  }

  _clearInputs() {
    if (this.input && this.selectContainer) {
      this.input.value = '';
      this.selectContainer.value = '';
    }
  }

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

