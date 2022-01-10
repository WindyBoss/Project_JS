import { KEY } from '..';

const input = document.querySelector('.input-keyword');
const gallery = document.querySelector('.gallery');
const select = document.querySelector(".country");
let code = KEY;
let keyword = '';

async function searchEvents(page, keyword) {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&sort=date,asc&page=${page}&apikey=${code}`,
  )
    .then(data => {
      const response = data.json();
      return response;
    })
    .catch(error => {
      console.log(error);
    });

  return response;
}

const putEvents = () => {
  keyword = input.value;
  gallery.innerHTML = "";
  searchEvents(0, keyword).then(data => {
    const { page, _embedded: { events } } = data;
    events.forEach(element => {
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
    
  });
};

input.addEventListener('change', putEvents);

