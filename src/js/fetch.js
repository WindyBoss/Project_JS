import { RenderCard } from './card-render-plugin';
import { launchModalWindowPlugin } from './modal-open-plugin';

class MakeFetch {
  constructor({ link, container, notification, input, selectContainer }) {
    this.link = link;
    this.container = container;
    this.eventList = [];
    this.notification = notification;
    // this.pageNumber = 0;
    this.input = input;

    this.selectContainer = selectContainer;

    this.pageNumber = 0;
  }

  makeFetch() {
    fetch(this.link)
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
    this.notification.failure('Oops something went wrong, please try again later');
  }

    _clearContainer() {
        this.container.innerHTML = '';
    }

    _setEventList(data)  {
      this.eventList = data._embedded.events;
  }

  _setPageNumber(data) {
    this.pageNumber = data.page.totalPages;
    console.log(this.pageNumber);
  }

  _getPageNumber() {
    console.log(this.pageNumber)
    return this.pageNumber;
  }

  _clearInputs() {
    if (this.input && this.selectContainer) {
      this.input.value = '';
      this.selectContainer.value = '';
    }
  }
}


export { MakeFetch };

