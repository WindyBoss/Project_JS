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
    this.firstPartLink = 'https://app.ticketmaster.com/discovery/v2/events.json?';
    this.link = '';
    this._embedded = "";
    this.size = 20;
    if (screen.width >= 768 && screen.width < 1200) {
      this.size = 21;
    }
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
    if (this.countryCode === '' && this.authorId === '' && this.keyword !== '') {
      this.link = `${this.firstPartLink}sort=date,asc&page=${this.page}&apikey=${this.key}&keyword=${this.keyword}&size=${this.size}`
    } else if (this.countryCode !== '' && this.authorId === '' && this.keyword === '') {
      this.link = `${this.firstPartLink}sort=date,asc&page=${this.page}&apikey=${this.key}&countryCode=${this.countryCode}&size=${this.size}`
    } else if (this.countryCode !== '' && this.authorId === '' && this.keyword !== '') {
      this.link = `${this.firstPartLink}sort=date,asc&page=${this.page}&apikey=${this.key}&keyword=${this.keyword}&countryCode=${this.countryCode}&size=${this.size}`
    } else if (this.authorId !== '') {
      this.link = `${this.firstPartLink}sort=date,asc&page=${this.page}&apikey=${this.key}&venueId=${this.authorId}&size=${this.size}`;
    }
  }

  // sprawdzam bagi
  checkData(data) {
      if (data === "undefined" || !data || data === '') {
        return "";
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
