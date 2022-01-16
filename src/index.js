'use strict';
import './sass/main.scss';

import { GenerateLink } from './js/link-generator';
import { MakeFetch } from './js/fetch';
import Notiflix from 'notiflix';

const gallery = document.querySelector('.gallery');
const KEY = '9hIF6NBjrDSVNrQQJmrbBXzEzwkr0S4m';
const paginationList = document.querySelector('.pagination');


let page = 1;
let country = 'pl';


const linkPlugin = new GenerateLink({
  countryCode: country,
  firstPartLink: `https://app.ticketmaster.com/discovery/v2/events.json?`,
});


async function galleryRender() {
  const fetchService = new MakeFetch({
    link: linkPlugin.giveLink(),
    container: gallery,
    notification: Notiflix.Notify,
  })
    console.log('e.target.textContent');

  fetchService.makeFetch();

  setTimeout(() => {
    const pageNumber = fetchService._getPageNumber();
    const setPagination = new Pagination({
      totalPageNumber: pageNumber,
      paginationContainer: paginationList,
    });
    setPagination._renderThePage();
    setPagination._addEventListener();
  }, 3000)
}

class Pagination {
  constructor({ totalPageNumber, paginationContainer }) {
    this.paginationContainer = paginationContainer;
    this.totalPageNumber = totalPageNumber;
  }

  _renderThePage() {

    if (this.totalPageNumber === 0) {
      this.paginationContainer.insertAdjacentHTML('beforeend', '');
    } else {
      for (let i = 1; i < 6; i++) {
        const pageRendering = `<li class='pagination__link'><button type='button'>${i}</button></li>`
        this.paginationContainer.insertAdjacentHTML('beforeend', pageRendering);
      }
      const pageDots = '<li class="pagination__link">...</li>'
      this.paginationContainer.insertAdjacentHTML('beforeend', pageDots);
      const pageLastNumber = `<li class='pagination__link'><button type='button'>${this.totalPageNumber}</button></li>`
      this.paginationContainer.insertAdjacentHTML('beforeend', pageLastNumber);
    }
  }

  _addEventListener() {
    this.paginationContainer.addEventListener('click', this.paginationClick)
  }

  paginationClick(e) {
    console.log(e.target.textContent);
    const paginationLinkPlugin = new GenerateLink({
      countryCode: country,
      firstPartLink: `https://app.ticketmaster.com/discovery/v2/events.json?`,
      pageNumber: e.target.textContent,
    });
    const paginationFetchService = new MakeFetch({
      link: paginationLinkPlugin.giveLink(),
      container: gallery,
      notification: Notiflix.Notify,
    })
    paginationFetchService.makeFetch();
    e.preventDefault();
  }

}
    // console.log('e.target.textContent');



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


galleryRender(country, page);

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


  galleryRender(country, page, { once: true });

  export { KEY };












// // pierwsza wersja
// import './sass/main.scss';
// 'use strict'
// const gallery = document.querySelector(".gallery");
// const key = "9hIF6NBjrDSVNrQQJmrbBXzEzwkr0S4m";
// const paginationList=document.querySelector(".pagination")
// let page = 21;
// let country = 'pl';
// let keyword

//  async function fetchEvents() {
//     fetch(`https://app.ticketmaster.com/discovery/v2/events?countryCode=${country}&sort=date,asc&page=${page}&apikey=${key}`)
//         .then(data => {
//             // console.log(data.json())
//             const response = data.json();
//             return response

//         })
//         .then(response => {
//             console.log(response);
//             let pages = response.page;
//             let events = response._embedded.events;
//             let totalPages = pages.totalPages;
//             let links = response._links;
//             let fLink = links.first.href;
//             let lLink = links.last.href;
//             console.log(lLink)
//             console.log(fLink)
//             console.log(links)
//             console.log(totalPages)
//             console.log(events)
//             console.log(pages)
//             events.forEach(elm => {
//              gallery.insertAdjacentHTML("beforeend",`<div class="gallery__event">
//   <img class="event__image" src=${elm.images[0].url} alt =""/>
//   <div class="event__info">
//   <p class="event__tittle">${elm.name}</p>
//   <p class="event__date">${elm.dates.start.localDate}</p>
//   <p class="event__place"> ${elm._embedded.venues[0].name}</p></div>
// </div>`  );
//             })
//             let numPages = []
//             for (let i = 1; i <= totalPages; i += 1){
//                 numPages.push(i)
//             }
//             console.log(numPages)
//             numPages.forEach(elm => {
//                 paginationList.insertAdjacentHTML("beforeend",`<li class="pagination__link"><a href="">${elm}</a></li>`)
//             })
//             const firstLink = paginationList.children[0];

//             console.log(numPages.length)
//             const lastElementIndex = paginationList.children.length - 1;
//             const lastLink = paginationList.children[lastElementIndex];
//             console.log(lastLink)
//             console.log(lastElementIndex);
//         //     lastLink.addEventListener("click", (event) => {
//         //         event.preventDefault()
//         //         gallery.innerHTML = "";
//         //         fetch(`https://app.ticketmaster.com${fLink}page=${page}&apikey=${key}`)
//         // .then(data => {
//         //     // console.log(data.json())
//         //     const response = data.json();
//         //     return response

//         // })



//         //     })
//             // firstLink.childNodes[0].setAttribute("href", `${fLink}`);
//             // console.log(firstLink.childNodes[0])
//             // console.log(firstLink)
//             // lastLink.childNodes[0].setAttribute("href",`${lLink}`)

//         })
//         .catch(error => {
//         console.log(error)
//     })
// }





// fetchEvents()
// // pierwsza wersja koniec
