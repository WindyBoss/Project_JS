'use strict';
import './sass/main.scss';
const gallery = document.querySelector('.gallery');
const KEY = 'GNumyc2AgGpRGV9vGNW7UwA7WyM3C6HP';
const paginationList = document.querySelector('.pagination');

let page = 1
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
  let totalPages = pages.totalPages;
  let links = data._links;
  let temporary;
  if (totalPages >= 30) {
    totalPages = 29;
  }
  totalPages = totalPages - 1;


  //TEMPORARY TO TEN ZASIEG I TU 5 IFOW ZROBILEM
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

  //DODAJE TUTAL TOTALPAGES ZEBY SPRAWDZIC CZCY POTRZEBNE SA TRZY KROPKI
  renderPagination(temporary, currentPage, totalPages);
};

const renderPagination = (pagination, currentPage, totalPages) => {
  //TUTAJ SPRAWDZAM CZY JEST MNIEJSZE ROWNE 6 JESLI TAK DO DODAJE KROPKI I NA KONCU TOTALPAGES
  if (currentPage <= totalPages - 3) {
    pagination.push('...');
    pagination.push(totalPages);
  }
  paginationList.innerHTML = pagination.map((num, index) => paginationTemplate(num, currentPage));
  const dots = document.querySelector('.pagination__dots');
  //wyłączenie możliwości kliknięcia w kropki
  dots.disabled=true;
};

//TU DODALEM SPRAWDZANIE CZY JEST KROPKAMI ( ZEBY NIE DODAWALO BUTTON TYLKO ZWYKLE LI)
const paginationTemplate = (num, currentPage) =>
  num != '...'
    ? `
  <li class='pagination__link${num == currentPage ? '--active' : ''}'>
    <button>${num}</button>
  </li>
`
    : `<span class='pagination__link--dots'><button class='pagination__dots'>
${num}</button>
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
  e.preventDefault()
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

paginationList.addEventListener('click', handlePaginationOnClick);

galleryRender(country, page);

export { KEY };

// 'use strict';
// import './sass/main.scss';
// const gallery = document.querySelector('.gallery');
// const KEY = 'GNumyc2AgGpRGV9vGNW7UwA7WyM3C6HP';
// const paginationList = document.querySelector('.pagination');

// let page = 1;
// let country = 'pl';

// async function galleryRender() {
//   const fetchService = new MakeFetch({
//     link: linkPlugin.giveLink(),
//     container: gallery,
//     notification: Notiflix.Notify,
//   })
//     console.log('e.target.textContent');

//   fetchService.makeFetch();

//   setTimeout(() => {
//     const pageNumber = fetchService._getPageNumber();
//     const setPagination = new Pagination({
//       totalPageNumber: pageNumber,
//       paginationContainer: paginationList,
//     });
//     setPagination._renderThePage();
//     setPagination._addEventListener();
//   }, 3000)
// }


// async function fetchEvents(country, page) {
//   const response = await fetch(
//     `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${country}&sort=date,asc&page=${page}&apikey=${KEY}`,
//   )
//     .then(data => {
//       // console.log(data.json())
//       const response = data.json();
//       return response;
//     })
//     .catch(error => {
//       console.log(error);
//     });

//   return response;
// }

// const range = (start, end) => {
//   let length = end - start + 1;
//   return Array.from({ length }, (_, idx) => idx + start);
// };

// const pagination = async (currentPage = 1) => {
//   const elementsToShow = 5;
//   const data = await fetchEvents(country, page);
//   let pages = data.page;
//   // let totalPages = data.page.totalPages;
//   let totalPages = 21;
//   let abc = data.page;

//   let links = data._links;
//   let leftSibling;
//   let rightSibling;
//   let temporary;
//   const endRange = range(totalPages - 5, totalPages);

//   //TEMPORARY TO TEN ZASIEG I TU 5 IFOW ZROBILEM
//   if (currentPage == 1) {
//     temporary = range(currentPage, elementsToShow);
//   } else if (currentPage == 2) {
//     temporary = range(currentPage - 1, elementsToShow);
//   } else if (currentPage > 2 && currentPage < totalPages - 1) {
//     temporary = range(currentPage - 2, currentPage + 2);
//     console.log(currentPage);
//   } else if (currentPage == totalPages - 1) {
//     temporary = range(currentPage - 3, currentPage + 1);
//   } else if (currentPage == totalPages) {
//     temporary = range(currentPage - 4, currentPage);
//   }

//    else if (currentPage == totalPages - 1) {
//     temporary = range(currentPage - 3, currentPage + 1);
//   } else if (currentPage == totalPages) {
//     temporary = range(currentPage - 4, currentPage);
//   }
//   if (totalPages <= elementsToShow) {
//     const paginationRange = range(1, totalPages);
//     renderPagination(paginationRange, currentPage);
//   } else {
//     if (currentPage <= 2) {
//       const startRange = range(1, 5);
//       renderPagination([...startRange], [...endRange]);
//     } else {
//       if (currentPage + 3 >= endRange[endRange.length - 1]) {
//         console.log(`stooop!`);
//         const lastPagNumber = endRange[endRange.length - 1];
//         console.log(lastPagNumber);
//         const endPagRange = range(leftSibling - 3, 21);
//         console.log(endPagRange);
//         renderPagination([...endPagRange], [...endRange]);
//       } else {
//         const middleRange = range(leftSibling - 1, rightSibling + 1);
//         console.log(middleRange);
//         renderPagination([...middleRange], [...endRange]);
//       }
//     }
//   }
//   //DODAJE TUTAL TOTALPAGES ZEBY SPRAWDZIC CZCY POTRZEBNE SA TRZY KROPKI
//   renderPagination(temporary, currentPage, totalPages);
// };

// //const isActive = (index, currentPage) => currentPage == index + 1;

// const renderPagination = (pagination, currentPage, totalPages) => {
//   //TUTAJ SPRAWDZAM CZY JEST MNIEJSZE ROWNE 6 JESLI TAK DO DODAJE KROPKI I NA KONCU TOTALPAGES
//   if (currentPage <= totalPages - 3) {
//     pagination.push('...');
//     pagination.push(totalPages);
//   }
//   paginationList.innerHTML = pagination.map((num, index) => paginationTemplate(num, currentPage));
// };

// //TU DODALEM SPRAWDZANIE CZY JEST KROPKAMI ( ZEBY NIE DODAWALO BUTTON TYLKO ZWYKLE LI)
// const paginationTemplate = (num, currentPage) =>
//   num != '...'
//     ? `
//   <li class='pagination__link${num == currentPage ? '--active' : ''}'>
//     <button>${num}</button>
//   </li>
// `
//     : `<li class='pagination__link'>
// ${num}
// </li>`;

// const handlePaginationOnClick = async e => {
//   e.preventDefault();
//   paginationList.innerHTML = '';
//   gallery.innerHTML = '';

//   document
//     .querySelectorAll('.pagination__link')
//     .forEach(pagination => pagination.classList.remove('pagination__link--active'));

//   e.target.closest('li')?.classList.add('pagination__link--active');

//   page = e.target.textContent;
//   await galleryRender(country, +page);
// };

// paginationList.addEventListener('click', handlePaginationOnClick);

// galleryRender(country, page);

// export { KEY };