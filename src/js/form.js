import { galleryRender } from './render-gallery';
import { refs } from './refs';
let keyword = '';
let countryCode = '';

// funkcja call fetch z pomocą formy
async function searchEvents(event) {
  event.preventDefault();
  keyword = refs.input.value;
  countryCode = refs.select.value;

  galleryRender({ country: countryCode, keyword: keyword })
}



refs.form.addEventListener('submit', searchEvents);
refs.select.addEventListener('change', searchEvents);
