import closeSvg from '../images/svg/symbol-defs.svg';
console.log(`${closeSvg}#icon-close`);

class renderModalWindow {
  constructor({ event, Key, link }) {
        this.Key = Key;
        this.link = link;
        this.image = event.images[0].url;
        this.eventName = this.setEventName(event.name, event._embedded.attractions[0].name);
        this.eventInfo = this.checkData(event.info, 'No Event Info');
        this.eventDate = this.checkData(event.dates.start.localDate, 'No Date Info');
        this.eventCity = this.checkData(event._embedded.venues[0].city.name, 'No City Info');
        this.eventCountry = this.checkData(event._embedded.venues[0].country.name, 'No Country Info');
        this.eventLocation = this.checkData(event._embedded.venues[0].name, 'No Location Info');
        this.ticketLink = event.url;
        this.eventTime = '';
        this.eventTimeZone = '';

        this.vipPriceContainerText = ''
        this.standardPriceContainerText = '';
        this.lowerPrice = '';
        this.higherPrice = '';
        this.currency = '';
        this.lowerPriceVip = '';
        this.higherPriceVip = '';
        this.currencyVip = '';

        this.standardPriceContainer = '';
        this.vipPriceContainer = ``;
        this.setTimeZone(event.dates.start.localTime, event.dates.timezone, event._embedded.venues[0].timezone);
        this.setPrices(
            event.priceRanges,
            event.priceRanges[0].min,
            event.priceRanges[0].max,
            event.priceRanges[0].currency,
            event.priceRanges[1].min,
            event.priceRanges[1].max,
            event.priceRanges[1].currency
      );

      this.setPriceContainer(event.priceRanges);
      this.windowModal = this.setWindowModal();
  }

    returnModalWindow() {
      return this.windowModal
    }

    setEventName(eventName, replacer) {
        let checkedEventName = eventName;
        if (!eventName) {
            checkedEventName = this.checkData(replacer, 'No Name Info');
        }
        return checkedEventName;
    }

    setTimeZone(eventTime, eventTimeZone, eventTimeZoneReplacer) {
        this.eventTime = eventTime;
        this.eventTimeZone = `(${eventTimeZone})`;
        if (!eventTime) {
            this.eventTime = 'No Time Info';
            this.eventTimeZone = '';
        } else if (!eventTimeZone) {
            // eventTimeZone = `(${event._embedded.venues[0].timezone})`;
            this.eventTimeZone = this.checkData(eventTimeZoneReplacer, '');
        } else {
            this.eventTime = eventTime.slice(0, 5);
        }
    }
    setWindowModal() {
        return `
        <div class="modal-window modal-closed">
          <div class="modal-window__container">
            <svg class="modal-window__close--btn"><use class='modal-window__close--btn' href="${closeSvg}#icon-close"></use></svg>
              <div class="modal-window__logo-img--container">
                <img src="${this.image}" alt="${this.eventName}" class="modal-window__logo-img">
              </div>
              <div class="modal-window__info">
                <div class="modal-window__info--container">
                  <h2 class="modal-window__title">Info</h2>
                  <p class="modal-window__text">${this.eventInfo}</p>
                </div>
                <div class="modal-window__info--container">
                  <h2 class="modal-window__title">When</h2>
                  <p class="modal-window__text">${this.eventDate}</p>
                  <p class="modal-window__text">${this.eventTime} ${this.eventTimeZone}</p>
                </div>
                <div class="modal-window__location--container">
                  <h2 class="modal-window__title">Where</h2>
                  <p class="modal-window__text">${this.eventCity, this.eventCountry}</p>
                  <p class="modal-window__text">${this.eventLocation}</p>
                  </div>
                <div class="modal-window__info--container">
                  <h2 class="modal-window__title">Who</h2>
                  <p class="modal-window__text">${this.eventName}</p>
                </div>
                <div class="modal-window__info--container">
                  <h2 class="modal-window__title">Prices</h2>
                  ${this.standardPriceContainer}
                </div>
              </div>
            <a>
              <button class="modal-window__more--btn" type="button">MORE FROM THIS AUTHOR</button>
            </a>
          </div>
        </div>
    `
    }

    setPrices(
        eventPriceRanges,
        firstRangeMinPrice,
        firstRangeMaxPrice,
        firstRangeCurrency,
        secondRangeMinPrice,
        secondRangeMaxPrice,
        secondRangeCurrency) {
        if (eventPriceRanges) {
            this.lowerPrice = this.setNewPrice(firstRangeMinPrice, 'No Price Info');
            this.higherPrice = this.setNewPrice(firstRangeMaxPrice, 'No Price Info');
            this.currency = this.setNewPrice(firstRangeCurrency, '');

            if (eventPriceRanges.length > 1 && eventPriceRanges[1].type === 'VIP') {
                this.lowerPriceVip = this.setNewPrice(secondRangeMinPrice, 'No Price Info');
                this.higherPriceVip = this.setNewPrice(secondRangeMaxPrice, 'No Price Info');
                this.currencyVip = this.checkData(secondRangeCurrency, '');
            }
        }
    }

    setPriceContainer(eventPriceRange) {
        if (eventPriceRange) {
                this.standardPriceContainerText = `<p class="modal-window__text">Standard: ${this.lowerPrice} - ${this.higherPrice} ${this.currency}</p>`
                if (this.lowerPrice === this.higherPrice) {
                    this.standardPriceContainerText = `<p class="modal-window__text">Standard: ${this.lowerPrice} ${this.currency}</p>`
                }
                if (eventPriceRange > 1 && eventPriceRange[1].type === 'VIP') {
                    this.vipPriceContainer = `
                    <div class='modal-window__price-container'>
                        ${this.vipPriceContainerText}
                        <button class="modal-window__btn" type="submit">
                          <a href='${this.ticketLink}'>
                            <p class='modal-window__btn-text'>Buy Tickets</p>
                          </a>
                        </button>
                    </div>`;

                    this.standardPriceContainerText = `<p class="modal-window__text">Standard: ${this.lowerPrice} - ${this.higherPrice} ${this.currency}</p>`
                    this.vipPriceContainerText = `<p class="modal-window__text">VIP: ${this.lowerPriceVip} - ${this.higherPriceVip} ${this.currencyVip}</p>`

                    if (this.lowerPriceVip === this.higherPriceVip) {
                        this.standardPriceContainerText = `<p class="modal-window__text">Standard ${this.lowerPrice} - ${this.higherPrice} ${this.currency}</p>`
                        this.vipPriceContainerText = `<p class="modal-window__text">VIP ${this.lowerPriceVip} ${this.currencyVip}</p>`
                    }
                }
                this.standardPriceContainer = `
                <div class='modal-window__price-container'>
                ${this.standardPriceContainerText}
                        <button class="modal-window__btn" type="submit">
                          <a href='${this.ticketLink}'>
                            <p class='modal-window__btn-text'>Buy Tickets</p>
                          </a>
                        </button>
                </div >
                ${this.vipPriceContainer}
            `;
            } else {
                this.standardPriceContainer = `
                <a>
                <button class="modal-window__btn" type="submit">Check on Website</button>
                </a>
                `
        };
    };

    checkData(data, phrase) {
    let checkedData = data;
    if (!data || data === 'undefined' || data === undefined) {
        checkedData = phrase;
    }
    return checkedData;
    }

    setNewPrice(price, priceInfo) {
    let newPrice = this.checkData(price, priceInfo);
    if (String(newPrice).length > 3) {
        newPrice = String(newPrice).slice(0, 2);
    }
    return newPrice;
};
}


export { renderModalWindow };