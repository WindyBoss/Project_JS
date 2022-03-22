import { galleryRender } from '../render-gallery';
import paginationDots from '../../templates/pagination/paginationDots.hbs';
import paginationLink from '../../templates/pagination/paginationPage.hbs';
import paginationLinkActive from '../../templates/pagination/paginationPageActive.hbs';

class Pagination {
  constructor({
    currentPage = 1,
    pageNumber,
    paginationContainer,
    cardContainer,
    country,
    authorId,
    keyword,
  }) {

    this.currentPage = currentPage;
    this.pageNumber = this.setPageNumber(pageNumber);
    this.paginationContainer = paginationContainer;
    this.cardContainer = cardContainer;
    this.country = country;
    this.authorId = authorId;
    this.keyword = keyword;
    this.elementsToShow = 5;
    this.temporary;
    this.setTemporary();
  }

  setPageNumber(pageNumber) {
    if (pageNumber >= 30) {
      return 29;
    }
    return pageNumber - 1;
  }

  setTemporary = async () => {
    if (this.pageNumber <= this.elementsToShow) {
      this.elementsToShow=this.pageNumber
      if (this.currentPage == 1) {
        this.temporary = this.range(this.currentPage, this.elementsToShow);
      } else if (this.currentPage == 2) {
        this.temporary = this.range(this.currentPage - 1, this.elementsToShow);
      } else if (this.currentPage ==3) {
        this.temporary = this.range(this.currentPage - 2, this.elementsToShow);
      } else if (this.currentPage == 4 ) {
        this.temporary = this.range(this.currentPage - 3, this.elementsToShow);
      } else if (this.currentPage == this.pageNumber) {
        this.temporary = this.range(this.currentPage - 4, this.currentPage);
      }

    }
    else if (this.currentPage == 1) {
      this.temporary = this.range(this.currentPage, this.elementsToShow);
    } else if (this.currentPage == 2) {
      this.temporary = this.range(this.currentPage - 1, this.elementsToShow);
    } else if (this.currentPage > 2 && this.currentPage < this.pageNumber - 1) {
      this.temporary = this.range(this.currentPage - 2, this.currentPage + 2);
    } else if (this.currentPage == this.pageNumber - 1) {
      this.temporary = this.range(this.currentPage - 3, this.currentPage + 1);
    } else if (this.currentPage == this.pageNumber) {
      this.temporary = this.range(this.currentPage - 4, this.currentPage);
    }
  };

  range(start, end) {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  }

  renderPagination = () => {
    try {
      if (this.currentPage <= this.pageNumber - 3) {
        this.temporary.push('...');
        this.temporary.push(this.pageNumber);
        }
      if (this.pageNumber == this.elementsToShow) {
        this.temporary.pop(this.pageNumber);
        this.temporary.pop('...');
      }

        this.paginationContainer.innerHTML = '';
        this.temporary.map((num, index) => {
        this.paginationContainer.insertAdjacentHTML('beforeend', this.paginationTemplate(num));
      });
    } catch (error) {
      console.log(error);
    }
  };

  paginationTemplate = (num) =>
    num != '...'
      ?
      num == this.currentPage ? paginationLinkActive(num) : paginationLink(num)
      : paginationDots(num);

    handlePaginationOnClick = async e => {
    e.preventDefault();
    this.cardContainer.innerHTML = '';
    document
      .querySelectorAll('.pagination__link')
      .forEach(pagination => pagination.classList.remove('pagination__link--active'));

    e.target.closest('li')?.classList.add('pagination__link--active');
      this.currentPage = e.target.textContent;

      await galleryRender({
        country: this.country,
        page: +this.currentPage,
        keyword: this.keyword,
        authorId: this.authorId,
      });
    e.preventDefault()
  };

  paginationClear() {
    this.currentPage = 1;
    this.pageNumber = 1;
    this.paginationContainer = '';
    this.cardContainer = '';
    this.country = '';
    this.authorId = '';
    this.keyword = '';
    this.temporary = '';
  }
}

export { Pagination };