
/*
* Plugin rysowanie kart oraz okna modalnego
*/

class RenderCard {
  constructor({ event, svgSprite }) {

        this.svgSprite = svgSprite;
        console.log(this.svgSprite);
    // Grupuje zdjęcia po width
        this.imagesListSmall = [];
        this.imagesListMedium = [];
        this.imagesListLarge = [];
        this.setImages(event.images);

      // ustawiam cechy obiektu
        this.eventName = this.checkData(event.name, 'No Name Info');
        this.eventNameCutted = this.cutInfo(this.checkData(event.name, 'No Name Info'), 40);
        this.eventInfo = this.cutInfo(this.checkData(event.info, 'No Event Info'), 50);
        this.eventDate = this.checkData(event.dates.start.localDate, 'No Date Info');
        this.id = this.checkData(event.id, 'No Id');

    if (event._embedded) {
        this.venueId = this.checkData(event._embedded.venues[0].id, 'No venueId');
        this.eventCity = this.checkData(event._embedded.venues[0].city.name, 'No City Info');
        this.eventCountry = this.checkData(event._embedded.venues[0].country.name, 'No Country Info');
        this.eventLocation = this.checkData(event._embedded.venues[0].name, 'No Location Info');
        this.setTimeZone(event.dates.start.localTime, event.dates.timezone, event._embedded.venues[0].timezone);
    } else {
        this.venueId = 'No venueId';
        this.eventCity = 'No City Info';
        this.eventCountry = 'No Country Info';
        this.eventLocation = 'No Location Info';
        this.setTimeZone(event.dates.start.localTime, event.dates.timezone, '');
    }
        this.ticketLink = event.url;
        this.eventTime = '';
        this.eventTimeZone = '';

        this.lowerPrice = '';
        this.higherPrice = '';
        this.currency = '';
        this.lowerPriceVip = '';
        this.higherPriceVip = '';
        this.currencyVip = '';

      // stwarzam kontenery dla dynamicznego HTML
        this.vipPriceContainerText = ''
        this.standardPriceContainerText = '';
        this.standardPriceContainer = '';
        this.vipPriceContainer = ``;

      // sprawdzam czy są dwa poziomy cen (Standard + VIP)
    if (event.priceRanges) {
          if (event.priceRanges.length > 1) {
      this.setPrices(
        event.priceRanges,
        event.priceRanges[0].min,
        event.priceRanges[0].max,
        event.priceRanges[0].currency,
        this.checkData(event.priceRanges[1].min, ""),
        this.checkData(event.priceRanges[1].max, ""),
        this.checkData(event.priceRanges[1].currency, "")
        );
    } else {
      this.setPrices(
        event.priceRanges,
        event.priceRanges[0].min,
        event.priceRanges[0].max,
        event.priceRanges[0].currency,
      )
      }
    }
      // call funkcji napełnienia kontenera
    this.setPriceContainer(event.priceRanges);

    // rysowanie interfejsu w zmienną
      this.renderedCard = this.renderCard();
  }

    // zwrot karty Ewenta
    getEventCard() {
      return this.renderedCard;
    }

    // sprawdzenie nazwy ewentu na bagi oraz ustalenie
    setEventName(eventName, replacer) {
        let checkedEventName = eventName;
        if (!eventName) {
            checkedEventName = this.checkData(replacer, 'No Name Info');
        }
        return checkedEventName;
    }

      // sprawdzenie czasu ewentu na bagi oraz ustalenie
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

    // Funkcja rysowania interfejsu (karty oraz okna modalnego)
    renderCard() {
      return `
        <div class="gallery__event">
          <div class="event__image--container">
            <img class="event__image lazyload"
              ${this.setGalleryImageContainer(this.imagesListMedium)}
              alt ="${this.eventNameCutted}"
              loading="lazy"
              sizes="(min-width: 1200px) 25vw, (min-width: 480px) 33vw, 50vw"/>
          </div>
          <div class="event__info">
            <p class="event__tittle">${this.eventNameCutted}</p>
            <p class="event__date">${this.eventDate}</p>
            <p class="event__place"> ${this.eventLocation}</p>
          </div>

          <div class="modal-window modal-closed" id='${this.id}'>
            <div class="modal-window__container" id='${this.venueId}'>
              <svg class="modal-window__close--btn"><use class='modal-window__close--btn' href="${this.svgSprite}#icon-close"></use></svg>
                <div class="modal-window__logo-img--container">
                  <img class="modal-window__logo-img"
                  ${this.setGalleryImageContainer(this.imagesListSmall)}
                  alt ="${this.eventName}"/>
                </div>
                <div class="modal-window__info">
                <div class="modal-window__main--image-container">
                <img class="modal-window__main--image"
                ${this.setGalleryImageContainer(this.imagesListLarge)}
                  alt ="${this.eventName}"/>
                </div>
                <div class='modal-window__main-info--container'>
                  <div class="modal-window__info--container">
                    <h2 class="modal-window__title">Info</h2>
                    <p class="modal-window__text">${this.eventInfo}</p>
                  </div>
                  <div class="modal-window__info--container">
                    <h2 class="modal-window__title">When</h2>
                    <p class="modal-window__text">${this.eventDate}</p>
                    <p class="modal-window__text">${this.eventTime} ${this.eventTimeZone}</p>
                  </div>
                  <div class="modal-window__info--container">
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
          </div>
      </div>
    `
    }

    // funkcja ustalenia ceny
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

    // funkcja napełnienia kontereru HTML cen w zależności od opcji
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
                  </div>
                  <button class="modal-window__more--btn" type="button">MORE FROM THIS AUTHOR</button>
                </div>
            `;
            } else {
                this.standardPriceContainer = `
                <a>
                <button class="modal-window__btn" type="submit">Check on Website</button>
                </a>
                  </div>
                  <button class="modal-window__more--btn check-website" type="button">MORE FROM THIS AUTHOR</button>
                </div>
                `
        };
    };

    // funkcja sprawdzenie bagów
    checkData(data, phrase) {
    let checkedData = data;
    if (!data || data === 'undefined' || data === undefined  || data === '') {
        checkedData = phrase;
    }
    return checkedData;
    }


    // funkcja, która polepsza wygłąd ceny
    setNewPrice(price, priceInfo) {
    let newPrice = this.checkData(price, priceInfo);
    if (String(newPrice).length > 3) {
        newPrice = String(newPrice).slice(0, 2);
      }

      if (price === 0) {
        newPrice = 0;
      }
    return newPrice;
  };

    // funkcja skrócenia zbyt długiego tekstu
    cutInfo(text, maxLength) {
      let newText = text;
      if (text.length > maxLength) {
        newText = `${text.slice(0, maxLength)}...`
      }

      return newText;
    }

    // funkcja grupowania zdjęc po width
    setImages(images) {
      const imagesListSmall = [];
      const imagesListMedium = [];
      const imagesListLarge = [];

      images.forEach(image => {
        if (image.width < 500) {
          imagesListSmall.push(image);
        } else if (image.width > 300 && image.width < 1000) {
          imagesListMedium.push(image);
        } else if (image.width > 600) {
          imagesListLarge.push(image);
        }
      })

        this.imagesListSmall = imagesListSmall.sort((a,b) => (a.width - b.width));
        this.imagesListMedium = imagesListMedium.sort((a,b) => (a.width - b.width));
        this.imagesListLarge = imagesListLarge.sort((a, b) => (a.width - b.width));
    }

    // funkcja stworzenia kontenera zdjęc
    setGalleryImageContainer(container) {
      if (container.length > 3) {
        return `
              srcset="
              ${container[0].url}   450w,
              ${container[1].url}   900w,
              ${container[2].url}   1350w,
              ${container[3].url}   1800w
              "
            data-src="${container[0].url}"`
      } else if (container.length === 3) {
        return `
              srcset="
              ${container[0].url}   450w,
              ${container[1].url}   900w,
              ${container[2].url}   1350w,
              "
            data-src="${container[0].url}"`
      } else if (container.length === 2) {
        return `
              srcset="
              ${container[0].url}   450w,
              ${container[1].url}   900w,
              "
            data-src="${container[0].url}"`
      } else if (container.length < 2) {
        return `
              srcset="
              ${container[0].url}   450w,
              "
            data-src="${container[0].url}"`
      }
    }
}

export { RenderCard };
