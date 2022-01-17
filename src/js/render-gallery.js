import { MakeFetch } from './fetch';
import { Pagination } from './pagination';
import Notiflix from 'notiflix';
import { refs } from './refs';


/*
* funkcja od której wszystko się zaczyna :)
* podłączam plugin paginacji
* podłączam plugin Fetch
*/

async function galleryRender({ country, page, keyword, authorId }) {

    // żeby uniknąc nakładania eventListenerów przy paginacji zamieniam kontener paginacji na klona
    const paginationList = document.querySelector('.pagination');
    const cloneContainer = paginationList.cloneNode(true);
    paginationList.parentNode.replaceChild(cloneContainer, paginationList);

    const fetchService = new MakeFetch({
    container: refs.gallery,
    notification: Notiflix.Notify,
    pageNumber: page,
    countryCode: country,
    keyword: keyword,
    authorId: authorId,
  })

  await fetchService.makeFetch();
  const pageNumber = await fetchService._getPageNumber();
  const pagination = new Pagination({
    currentPage: page,
    pageNumber: pageNumber,
    paginationContainer: cloneContainer,
    cardContainer: refs.gallery,
    country: country,
    keyword: keyword,
    authorId: authorId,
  });

   //DODAJE TUTAL TOTALPAGES ZEBY SPRAWDZIC CZCY POTRZEBNE SA TRZY KROPKI
  pagination.renderPagination();
  cloneContainer.addEventListener('click', pagination.handlePaginationOnClick);
}

export { galleryRender };