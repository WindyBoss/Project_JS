import './sass/main.scss';
'use strict'
const gallery = document.querySelector(".gallery");
const key = "9hIF6NBjrDSVNrQQJmrbBXzEzwkr0S4m";
let page = 0;
let country = 'pl';
let keyword 
function fetchEvents() {
    fetch(`https://app.ticketmaster.com/discovery/v2/events?countryCode=${country}&sort=date,asc&page=${page}&apikey=${key}`)
        .then(data => {
            // console.log(data.json())
            const response = data.json();
            return response
            
        })
        .then(response => {
            console.log(response);
            let pages = response.page;
            let events = response._embedded.events;
            console.log(events)
            console.log(pages)
            events.forEach(elm => {
             gallery.insertAdjacentHTML("afterbegin",`<div class="gallery__event">
  <div class="event__image"><img src=${elm.images[0].url} alt =""/></div>
  <p class="event__tittle">${elm.name}</p>
  <p class="event__date">${elm.dates.start.localDate}</p>
  <p class="event__place">${elm._embedded.venues[0].name}</p>
</div>`  );    
            })
            
        })
        .catch(error => {
        console.log(error)
    })
}


fetchEvents()
