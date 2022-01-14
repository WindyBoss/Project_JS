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


async function galleryRender(country) {

    const fetchService = new MakeFetch({
    link: linkPlugin.giveLink(),
    container: gallery,
    notification: Notiflix.Notify,
  })

  fetchService.makeFetch();

  pagination();
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

async function pagination() {
  let data = await fetchEvents(country, page);
  let pages = data.page;
  let totalPages = pages.totalPages;
  let links = data._links;
  let numPages = [];
  if (totalPages > 29) {
    totalPages = 30;
  }

  for (let i = 1; i < totalPages; i++) {
    numPages.push(i);
  }
  console.log(numPages.length);
  let lastLink = numPages[numPages.length - 1];
  let firstLink = numPages[0];
  let currentPage;

  if (page == 1 && numPages.length < 6) {
    paginationList.innerHTML = `<li class="pagination__link"><a href=${firstLink}>${firstLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    console.log(page);
    console.log(currentPage);
    page = currentPage;
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(elm);
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == 2 && numPages.length < 6) {
    paginationList.innerHTML = `<li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${currentPage + 1}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    console.log(page);
    console.log(currentPage);
    let currentPage;
    currentPage = Number(page);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(elm);
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == 3 && numPages.length < 6) {
    paginationList.innerHTML = `<li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${currentPage + 1}</a></li><li class="pagination__link"><a href=${currentPage + 2}>${
      currentPage + 2
    }</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    console.log(page);
    console.log(currentPage);
    let currentPage;
    currentPage = Number(page);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(elm);
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == 4 && numPages.length < 6) {
    paginationList.innerHTML = `<li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${currentPage + 1}</a></li><li class="pagination__link"><a href=${currentPage + 2}>${
      currentPage + 2
    }</a></li><li class="pagination__link"><a href=${currentPage + 3}>${currentPage + 3}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    console.log(page);
    console.log(currentPage);
    let currentPage;
    currentPage = Number(page);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(elm);
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == 5 && numPages.length < 6) {
    paginationList.innerHTML = `<li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${currentPage + 1}</a></li><li class="pagination__link"><a href=${currentPage + 2}>${
      currentPage + 2
    }</a></li><li class="pagination__link"><a href=${currentPage + 3}>${
      currentPage + 3
    }</a></li><li class="pagination__link"><a href=${currentPage + 4}>${currentPage + 4}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    console.log(page);
    console.log(currentPage);
    let currentPage;
    currentPage = Number(page);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(elm);
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == 1 && numPages.length >= 6) {
    paginationList.innerHTML = `<li class="pagination__link"><a href=${firstLink}>${firstLink}</a></li><li class="pagination__link"><a href=${numPages[1]}>${numPages[1]}</a></li><li class="pagination__link"><a href=${numPages[2]}>${numPages[2]}</a></li><li class="pagination__link"><a href=${numPages[3]}>${numPages[3]}</a></li><li class="pagination__link"><a href=${numPages[4]}>${numPages[4]}</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${lastLink}>${lastLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    console.log(page);
    console.log(currentPage);
    page = currentPage;
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(elm);
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == 2 && numPages.length >= 6) {
    let currentPage;
    currentPage = Number(page);
    paginationList.innerHTML = `<li class="pagination__link"><a href=${currentPage - 1}>${
      currentPage - 1
    }</a></li><li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      `currentPage` + 1
    }>${currentPage + 1}</a></li><li class="pagination__link"><a href=${currentPage + 2}>${
      currentPage + 2
    }</a></li><li class="pagination__link"><a href=${currentPage + 3}>${
      currentPage + 3
    }</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${lastLink}>${lastLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        console.log(elm);
        currentPage = page;

        gallery.innerHTML = '';
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == 3 && numPages.length >= 6) {
    let currentPage;
    currentPage = Number(page);
    paginationList.innerHTML = `<li class="pagination__link"><a href=${currentPage - 2}>${
      currentPage - 2
    }</a></li><li class="pagination__link"><a href=${currentPage - 1}>${
      currentPage - 1
    }</a></li><li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${currentPage + 1}</a></li><li class="pagination__link"><a href=${currentPage + 2}>${
      currentPage + 2
    }</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${lastLink}>${lastLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == 4 && numPages.length >= 6) {
    let currentPage;
    currentPage = Number(page);
    paginationList.innerHTML = `<li class="pagination__link"><a href=${currentPage - 3}>${
      currentPage - 3
    }</a></li><li class="pagination__link"><a href=${currentPage - 2}>${
      currentPage - 2
    }</a></li><li class="pagination__link"><a href=${currentPage - 1}>${
      currentPage - 1
    }</a></li><li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${
      currentPage + 1
    }</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${lastLink}>${lastLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }

  if (page >= 5 && numPages.length >= 6) {
    let currentPage;
    currentPage = Number(page);
    paginationList.innerHTML = `<li class="pagination__link"><a href=${firstLink}>${firstLink}</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${
      currentPage - 1
    }>${
      currentPage - 1
    }</a></li><li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${
      currentPage + 1
    }</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${lastLink}>${lastLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }

  if (page == numPages.length - 3 && numPages.length >= 6) {
    let currentPage;
    currentPage = Number(page);
    paginationList.innerHTML = `<li class="pagination__link"><a href=${firstLink}>${firstLink}</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${
      currentPage - 1
    }>${
      currentPage - 1
    }</a></li><li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${currentPage + 1}</a></li><li class="pagination__link"><a href=${currentPage + 2}>${
      currentPage + 2
    }</a></li><li class="pagination__link"><a href=${lastLink}>${lastLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == numPages.length - 2 && numPages.length >= 6) {
    let currentPage;
    currentPage = Number(page);
    paginationList.innerHTML = `<li class="pagination__link"><a href=${firstLink}>${firstLink}</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${
      currentPage - 1
    }>${
      currentPage - 1
    }</a></li><li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li><li class="pagination__link"><a href=${
      currentPage + 1
    }>${
      currentPage + 1
    }</a></li></li><li class="pagination__link"><a href=${lastLink}>${lastLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == numPages.length - 1 && numPages.length >= 6) {
    let currentPage;
    currentPage = Number(page);
    paginationList.innerHTML = `<li class="pagination__link"><a href=${firstLink}>${firstLink}</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${
      currentPage - 2
    }>${currentPage - 2}</a></li><li class="pagination__link"><a href=${currentPage - 1}>${
      currentPage - 1
    }</a></li><li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li></li><li class="pagination__link"><a href=${lastLink}>${lastLink}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(page);
        console.log(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        galleryRender(country, page);
      });
    });
  }
  if (page == numPages.length && numPages.length >= 6) {
    let currentPage;
    currentPage = Number(page);
    paginationList.innerHTML = `<li class="pagination__link"><a href=${firstLink}>${firstLink}</a></li><span class="pagination__link">...</span><li class="pagination__link"><a href=${
      currentPage - 3
    }>${currentPage - 3}</a></li><li class="pagination__link"><a href=${currentPage - 2}>${
      currentPage - 2
    }</a></li><li class="pagination__link"><a href=${currentPage - 1}>${
      currentPage - 1
    }</a></li></li><li class="pagination__link"><a href=${currentPage}>${currentPage}</a></li>`;
    const lies = document.querySelectorAll('.pagination__link');
    console.log(lies);
    lies.forEach(elm => {
      if (elm.textContent == pages.number) {
        elm.classList.add('pagination__link--active');
      }
      elm.addEventListener('click', event => {
        event.preventDefault();
        paginationList.innerHTML = '';
        page = elm.textContent;
        currentPage = page;
        gallery.innerHTML = '';
        console.log(page);
        console.log(currentPage);

        galleryRender(country, page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }
}

galleryRender(country, page);



export { KEY } ;












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






