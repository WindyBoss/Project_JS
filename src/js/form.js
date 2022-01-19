import { galleryRender } from './render-gallery';
<<<<<<< Updated upstream
import { refs } from './refs';
=======

const form = document.querySelector('.search-bar__form');
const input = form.querySelector('.search-bar__input');
const select = document.querySelector('.country');

console.log("select.value");
console.log(select.value);
console.log("select.value");

>>>>>>> Stashed changes
let keyword = '';
let countryCode = '';

// funkcja call fetch z pomocą formy
async function searchEvents(event) {
  event.preventDefault();
  keyword = refs.input.value;
  countryCode = refs.select.value;

  galleryRender({ country: countryCode, keyword: keyword })
}

<<<<<<< Updated upstream


refs.form.addEventListener('submit', searchEvents);
refs.select.addEventListener('change', searchEvents);
=======
form.addEventListener('submit', searchEvents);
select.addEventListener('change', searchEvents);
>>>>>>> Stashed changes
