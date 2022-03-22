import { MakeFetch } from './plugins/fetch';
import { Pagination } from './plugins/pagination';
import { refs } from './components/refs';
import { EventListener } from './components/addEventListener';
import { saveLocalStorage } from './components/localStorage';

import Svg from '../images/svg/symbol-defs.svg';

async function galleryRender({ country, page, keyword, authorId }) {

  saveLocalStorage(keyword, country)

  window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const paginationList = document.querySelector('.pagination');
    const cloneContainer = paginationList.cloneNode(true);
    paginationList.parentNode.replaceChild(cloneContainer, paginationList);

    const fetchService = new MakeFetch({
    container: refs.gallery,
    pageNumber: page,
    countryCode: country,
    keyword: keyword,
    authorId: authorId,
    svg: Svg,

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

  pagination.renderPagination();

  const cloneContainerListener = new EventListener({
    domElement: cloneContainer,
    listenType: 'click',
    callbackFunction: pagination.handlePaginationOnClick
  })
  cloneContainerListener.setEventListener();
}

export { galleryRender };