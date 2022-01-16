'use strict';
import './sass/main.scss';
import { galleryRender } from './js/render-gallery';

let page = 1
let country = 'pl';

galleryRender({ country: country, page: page });

