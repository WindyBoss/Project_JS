'use strict';
import './sass/main.scss';
import { galleryRender } from './js/render-gallery';
import { request } from './js/get-current-location';
import { addLibraryScript, addSrcToLazyImages } from './js/lazyload';
let page = 1;
let country = 'us';


// podłączam funkcję wyszukiwania kraju po IP
request.onreadystatechange = function () {
  if (this.readyState === 4) {
    const locationData = JSON.parse(this.responseText);
    country = locationData.country_code.toLowerCase();
  };
};


setTimeout(() => {
  galleryRender({ country: country, page: page });
}, 2000);



if ('loading' in HTMLImageElement.prototype) {
    addSrcToLazyImages();
} else {
    addLibraryScript();
};
