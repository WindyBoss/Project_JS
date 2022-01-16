import { galleryRender } from './render-gallery';

const form = document.querySelector('.search-bar__form');
const input = form.querySelector('.search-bar__input');
const select = document.querySelector('.country');
let keyword = '';
let countryCode = '';

async function searchEvents(event) {
  event.preventDefault();
  keyword = input.value;
  countryCode = select.value;

  galleryRender({ country: countryCode, keyword: keyword })
}



form.addEventListener('submit', searchEvents);
select.addEventListener('change', searchEvents);
