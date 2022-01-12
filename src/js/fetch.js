class GenerateLink {
  constructor({ keyword, countryCode, firstPartLink }) {
    this.keyword = keyword;
    this.countryCode = countryCode;
    this.page = 1;
    this.key = `9hIF6NBjrDSVNrQQJmrbBXzEzwkr0S4m`;
    this.firstPartLink = firstPartLink;
    this.link = '';
  }

    makeLink() {
        this.link = `${this.firstPartLink}&keyword=${this.keyword}&sort=date,asc&page=${this.page}&apikey=${this.key}`;
        if(this.countryCode && this.keyword === "") this.link = `${this.firstPartLink}&countryCode=${this.countryCode}&sort=date,asc&page=${this.page}&apikey=${this.key}`;
  }


  giveLink() {
    this.makeLink();
    return this.link;
  }
}

export { GenerateLink };
