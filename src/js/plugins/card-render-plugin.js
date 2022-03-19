import eventTemplate from '../../templates/eventTemplate.hbs';
import priceContainerTemplate from '../../templates/priceContainer.hbs';
import standardPriceContainerEquil from '../../templates/standardPriceContainerEquil.hbs';
import standardPriceContainerNormal from '../../templates/standardPriceContainerNormal.hbs';
import standardPriceTextByVip from '../../templates/standardPriceTextByVip.hbs';
import standardPriceTextByVipEquil from '../../templates/standardPriceTextByVipEquil.hbs';
import vipPriceContainer from '../../templates/vipPriceContainer.hbs';
import vipPriceTextNormal from '../../templates/vipPriceTextNormal.hbs';
import vipPriceTextEquil from '../../templates/vipPriceTextEquil.hbs';

const Handlebars = require("handlebars");

/*
* Plugin rysowanie kart oraz okna modalnego
*/

class RenderCard {
  constructor({ event, svgSprite }) {

        this.svgSprite = svgSprite;
    // Grupuje zdjęcia po width
        this.imagesListSmall = [];
        this.imagesListMedium = [];
        this.imagesListLarge = [];
        this.setImages(event.images);

        this.imageContainerMedium = new Handlebars.SafeString(this.setGalleryImageContainer(this.imagesListMedium));
        this.imageContainerLarge = new Handlebars.SafeString(this.setGalleryImageContainer(this.imagesListLarge));
        this.imageContainerSmall = new Handlebars.SafeString(this.setGalleryImageContainer(this.imagesListSmall));

      // ustawiam cechy obiektu
        this.eventName = event.name;
        this.eventNameCutted = event.name;
        this.eventInfo = event.info;
        this.eventDate = event.dates.start.localDate;
        this.id = event.id;
    this.ticketLink = event.url;

    if (event._embedded) {
        this.venueId = event._embedded.venues[0].id;
        this.eventCity = event._embedded.venues[0].city.name;
        this.eventCountry = event._embedded.venues[0].country.name;
        this.eventLocation = event._embedded.venues[0].name;
        this.eventTime = event.dates.start.localTime;
        this.eventTimeZone = event.dates.timezone;
    } else {
        this.venueId = null;
        this.eventCity = null;
        this.eventCountry = null;
        this.eventLocation = null;
        this.eventTime = event.dates.start.localTime;
        this.eventTimeZone = event.dates.timezone;
    }
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
      this.lowerPrice = this.setNewPrice(event.priceRanges[0].min);
      this.higherPrice = this.setNewPrice(event.priceRanges[0].max);
      this.currency = event.priceRanges[0].currency;

      if (this.lowerPrice === this.higherPrice) {
        this.standardPriceContainerText = new Handlebars.SafeString(standardPriceContainerEquil(this));
      } else {
        this.standardPriceContainerText = new Handlebars.SafeString(standardPriceContainerNormal(this));
      }


      if (event.priceRanges.length > 1 && event.priceRanges[0].min !== event.priceRanges[1].min && event.priceRanges[0].max !== event.priceRanges[1].max) {
        this.lowerPriceVip = this.setNewPrice(event.priceRanges[1].min);
        this.higherPriceVip = this.setNewPrice(event.priceRanges[1].max);
        this.currencyVip = event.priceRanges[1].currency;

        this.standardPriceContainerText = new Handlebars.SafeString(standardPriceTextByVip(this));
        this.vipPriceContainerText = new Handlebars.SafeString(vipPriceTextNormal(this));

        if (this.lowerPriceVip === this.higherPriceVip) {
          this.standardPriceContainerText = new Handlebars.SafeString(standardPriceTextByVipEquil(this));
          this.vipPriceContainerText = new Handlebars.SafeString(vipPriceTextEquil(this));
        };
          this.vipPriceContainer = new Handlebars.SafeString(vipPriceContainer(this));
      }
    }

    this.standardPriceContainer = new Handlebars.SafeString(priceContainerTemplate(this));

    // rysowanie interfejsu w zmienną
    this.renderedCard = this.renderCard();
  }

    // zwrot karty Ewenta
    getEventCard() {
      return this.renderedCard;
    }

    // Funkcja rysowania interfejsu (karty oraz okna modalnego)
    renderCard() {
      return eventTemplate(this);
    }

    // funkcja, która polepsza wygłąd ceny
    setNewPrice(price) {
    let newPrice = price;
    if (String(price).length > 3) {
        newPrice = String(price).slice(0, 2);
      }
    return newPrice;
  };

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
              ${container[0].url}   250w,
              ${container[1].url}   500w,
              ${container[2].url}   750w,
              ${container[3].url}   1000w
              "
            data-src="${container[0].url}"`
      } else if (container.length === 3) {
        return `
              srcset="
              ${container[0].url}   250w,
              ${container[1].url}   500w,
              ${container[2].url}   750w,
              "
            data-src="${container[0].url}"`
      } else if (container.length === 2) {
        return `
              srcset="
              ${container[0].url}   250w,
              ${container[1].url}   500w,
              "
            data-src="${container[0].url}"`
      } else if (container.length < 2) {
        return `
              srcset="
              ${container[0].url}   250w,
              "
            data-src="${container[0].url}"`
      }
    }
}

export { RenderCard };
