import { galleryRender } from '../render-gallery';

/*
* Plugin paginacji
*/
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

    // ustawiam cechy obiektu
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
    //TEMPORARY TO TEN ZASIEG I TU 5 IFOW ZROBILEM
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
  //TUTAJ SPRAWDZAM CZY JEST MNIEJSZE ROWNE 6 JESLI TAK DO DODAJE KROPKI I NA KONCU TOTALPAGES
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

    const dots = document.querySelector('.pagination__dots');
    //wyłączenie możliwości kliknięcia w kropki
      if (dots) {
        dots.disabled=true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //TU DODALEM SPRAWDZANIE CZY JEST KROPKAMI ( ZEBY NIE DODAWALO BUTTON TYLKO ZWYKLE LI)
  paginationTemplate = (num) =>
      num != '...'
        ? `
      <li class='pagination__link${num == this.currentPage ? '--active' : ''}'>
        <button>${num}</button>
      </li>
    `
        : `<span class='pagination__link--dots'><button class='pagination__dots'>
    ${num}</button>
    </span>`;


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
