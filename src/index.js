'use strict';
const axios = require('axios');

import './sass/main.scss';

import { getLocalStorage } from './js/components/localStorage';
import { Loader } from './js/components/loading';
import { galleryRender } from './js/render-gallery';
import { addLibraryScript, addSrcToLazyImages } from './js/components/lazyload';
import { refs } from './js/components/refs';

let page = 1;

const loader = new Loader(refs.loading);
loader.displayLoading();

// funkcja wyszukania kraju po IP
class Location {
  constructor({ replaceCountryCode }) {
    this.key = 'ee57a1628fb92f336e24699a2ff440322ef643c7edfbb26a7a465a2a';
    this.url = `https://api.ipdata.co/?api-key=${this.key}`;
    this.countryCode = '';
    this.replaceCountryCode = replaceCountryCode;
  }

  async find() {
    return await axios.get(this.url)
      .then(result => {
        this.onFindSuccess(result.data.country_code.toLowerCase());
      })
      .catch((error) => {
        this.onFindFailed();
      })
      .finally(() => {
        pageFirstLoad(this.countryCode);
    })
  }

  onFindSuccess(data) {
    this.countryCode = data;
  }

  onFindFailed() {
    this.countryCode = this.replaceCountryCode;
  }
}


function pageFirstLoad(country) {
  const data = getLocalStorage();
  if (!data) {
    galleryRender({ country: country, page: page, loadContainer: refs.loading, keyword: '' });
  } else {
    galleryRender({ country: data.country, page: page, loadContainer: refs.loading, keyword: data.keyword });
  }

  if ('loading' in HTMLImageElement.prototype) {
    addSrcToLazyImages();
  } else {
    addLibraryScript();
  };
}

const location = new Location({
  replaceCountryCode: String(window.navigator.language).slice(3, 5).toLowerCase(),
});

location.find();


