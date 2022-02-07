/*
* Plugin generowania linków
*/
class GenerateLink {
  constructor({ keyword, countryCode, authorId, pageNumber }) {
    // ustawiam cechy obiektu
    this.keyword = this.checkData(keyword);
    this.countryCode = this.checkData(countryCode);
    this.page = this.setPageNumber(pageNumber);
    this.key = `GNumyc2AgGpRGV9vGNW7UwA7WyM3C6HP`;
    this.authorId = this.checkData(authorId);
    this.link = '';
    this._embedded = "";
    this.size = 20;
    if (screen.width >= 768 && screen.width < 1200) {
      this.size = 21;
    }
    this.locale = 'pl';
    this.firstPartLink = `https://app.ticketmaster.com/discovery/v2/events.json?sort=date,asc&page=${this.page}&apikey=${this.key}`;
  }



  // sprawdzam liczbę stron
  setPageNumber(pageNumber) {
    if (!pageNumber) {
      return 1
    } else {
      return pageNumber;
    }
  }

  // stwarzam link w zależności od dysponowanych danych
  makeLink() {
    this.link = `${this.firstPartLink}&keyword=${this.keyword}&countryCode=${this.countryCode}`
    if (this.authorId !== '') {
      this.link = `${this.firstPartLink}&venueId=${this.authorId}&`
    }
  }

  // sprawdzam bagi
  checkData(data) {
      if (data === "undefined" || !data || data === '') {
        return '';
      }
      return data;
  }

  // oddaję linka
  giveLink() {
    this.makeLink();
    return this.link;
  }
}

export { GenerateLink };
