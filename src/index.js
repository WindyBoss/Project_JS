'use strict';
import './sass/main.scss';
const gallery = document.querySelector('.gallery');
const KEY = '9hIF6NBjrDSVNrQQJmrbBXzEzwkr0S4m';
const paginationList = document.querySelector('.pagination');

let page = 1;
let country = 'pl';

async function galleryRender(country, page) {
  let data = await fetchEvents(country, page);
  let pages = data.page;
  let events = data._embedded.events;
  events.forEach(elm => {
    gallery.insertAdjacentHTML(
      'beforeend',
      `<div class="gallery__event">
    <img class="event__image" src=${elm.images[0].url} alt =""/>
    <div class="event__info">
    <p class="event__tittle">${elm.name}</p>
    <p class="event__date">${elm.dates.start.localDate}</p>
    <p class="event__place"> ${elm._embedded.venues[0].name}</p></div>
  </div>`,
    );
  });

  pagination(page);
}

async function fetchEvents(country, page) {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${country}&sort=date,asc&page=${page}&apikey=${KEY}`,
  )
    .then(data => {
      // console.log(data.json())
      const response = data.json();
      return response;
    })
    .catch(error => {
      console.log(error);
    });

  return response;
}

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const pagination = async (currentPage = 1) => {
  const elementsToShow = 5;
  const data = await fetchEvents(country, page);
  let pages = data.page;
  let totalPages = data.page.totalPages;
  let abc = data.page;
  let links = data._links;
  let temporary;
  if (totalPages >= 30) {
    totalPages = 29;
  }

  //TEMPORARY TO TEN ZASIEG I TU 5 IFOW
  if (currentPage == 1) {
    temporary = range(currentPage, elementsToShow);
  } else if (currentPage == 2) {
    temporary = range(currentPage - 1, elementsToShow);
  } else if (currentPage > 2 && currentPage < totalPages - 1) {
    temporary = range(currentPage - 2, currentPage + 2);
    console.log(currentPage);
  } else if (currentPage == totalPages - 1) {
    temporary = range(currentPage - 3, currentPage + 1);
  } else if (currentPage == totalPages) {
    temporary = range(currentPage - 4, currentPage);
  }

  //DODAJE TUTAJ TOTALPAGES ZEBY SPRAWDZIC CZY POTRZEBNE SA TRZY KROPKI
  renderPagination(temporary, currentPage, totalPages);
};

const renderPagination = (pagination, currentPage, totalPages) => {
  //TUTAJ SPRAWDZAM CZY JEST MNIEJSZE ROWNE 6 JESLI TAK DO DODAJE KROPKI I NA KONCU TOTALPAGES
  if (currentPage <= totalPages - 3) {
    pagination.push('...');
    pagination.push(totalPages);
  }
  paginationList.innerHTML = pagination.map((num, index) => paginationTemplate(num, currentPage));
  //wyłączenie możliwości kliknięcia w kropki
  const dots = document.querySelector('.pagination__dots');
  dots.disabled = true;
};

//TU DODALEM SPRAWDZANIE CZY JEST KROPKAMI ( ZEBY NIE DODAWALO BUTTON TYLKO ZWYKLE LI)
const paginationTemplate = (num, currentPage) =>
  num != '...'
    ? `
  <li class='pagination__link${num == currentPage ? '--active' : ''}'>
    <button>${num}</button>
  </li>
`
    : `<span class='pagination__link--dots'>
<button class='pagination__dots'>${num}</button>
</span>`;

const handlePaginationOnClick = async e => {
  e.preventDefault();
  paginationList.innerHTML = '';
  gallery.innerHTML = '';

  document
    .querySelectorAll('.pagination__link')
    .forEach(pagination => pagination.classList.remove('pagination__link--active'));

  e.target.closest('li')?.classList.add('pagination__link--active');

  page = e.target.textContent;

  await galleryRender(country, +page);
};

paginationList.addEventListener('click', handlePaginationOnClick);

galleryRender(country, page);

export { KEY };
