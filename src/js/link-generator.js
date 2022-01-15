class GenerateLink {
  constructor({ keyword, countryCode, firstPartLink, authorId}) {
    this.keyword = keyword;
    this.countryCode = countryCode;
    this.page = 1;
    this.key = `9hIF6NBjrDSVNrQQJmrbBXzEzwkr0S4m`;
    this.authorId = authorId;
    this.firstPartLink = firstPartLink;
      this.link = '';
      this._embedded = "";
  }

  makeLink() {
    if (!this.authorId) {
      this.link = `${this.firstPartLink}&keyword=${this.keyword}&sort=date,asc&page=${this.page}&apikey=${this.key}`;
      if (this.countryCode && this.keyword === "") this.link = `${this.firstPartLink}&countryCode=${this.countryCode}&sort=date,asc&page=${this.page}&apikey=${this.key}`;
    } else {
      this.link = `${this.firstPartLink}sort=date,asc&page=${this.page}&apikey=${this.key}&venueId=${this.authorId}`;
    }
    console.log(this.link);
  }

    checkData(data) {
        if (data._embedded.venues[0].name === "undefined" || !data._embedded.venues[0].name) {
            data._embedded.venues[0].name = "No information"
        }
        return data;
    }

  giveLink() {
    this.makeLink();
    return this.link;
  }
}

export { GenerateLink };
