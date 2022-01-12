import { GenerateLink } from './fetch';
import Notiflix from 'notiflix';

const input = document.querySelector('.search-bar__input');
const gallery = document.querySelector('.gallery');
const select = document.querySelector('.country');
let keyword = '';
let countryCode = '';

async function searchEvents() {;
  keyword = input.value;
  countryCode = select.value;

  const linkPlugin = new GenerateLink({
    keyword: keyword,
    countryCode: countryCode,
    firstPartLink: `https://app.ticketmaster.com/discovery/v2/events.json?`,
  });

  return await fetch(linkPlugin.giveLink())
    .then(response => {
      return response.json();
    })
    .then(data => {
      const {
        _embedded: { events},
      } = data;
      gallery.innerHTML = '';
      events.forEach(element => {
        element = linkPlugin.checkData(element);
        gallery.insertAdjacentHTML(
          'beforeend',
          `<div class="gallery__event">
      <img class="event__image" src=${element.images[0].url} alt =""/>
       <div class="event__info">
       <p class="event__tittle">${element.name}</p>
       <p class="event__date">${element.dates.start.localDate}</p>
       <p class="event__place"> ${element._embedded.venues[0].name}</p></div>
        </div>`,
        );
      });
    })
    .catch(error => {
      Notiflix.Notify.failure('There are no that kind of events. Try other name');
    });
}

input.addEventListener('submit', searchEvents);
select.addEventListener('change', searchEvents);
