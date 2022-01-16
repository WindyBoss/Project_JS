const gallery = document.querySelector('.gallery');
import { MakeFetch } from './fetch';
import { Pagination } from './pagination';
import Notiflix from 'notiflix';


async function galleryRender({ country, page, keyword, authorId }) {

    const paginationList = document.querySelector('.pagination');
    const cloneContainer = paginationList.cloneNode(true);
    paginationList.parentNode.replaceChild(cloneContainer, paginationList);

    const fetchService = new MakeFetch({
    container: gallery,
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
    cardContainer: gallery,
    country: country,
    keyword: keyword,
    authorId: authorId,
  });
  pagination.renderPagination();
  cloneContainer.addEventListener('click', pagination.handlePaginationOnClick);
}

export { galleryRender };