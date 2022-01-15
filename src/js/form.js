import { GenerateLink } from './link-generator';
import { MakeFetch } from './fetch';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-bar__form');
const input = form.querySelector('.search-bar__input');
const gallery = document.querySelector('.gallery');
const select = document.querySelector('.country');
let keyword = '';
let countryCode = '';

async function searchEvents(event) {
  event.preventDefault();
  keyword = input.value;
  countryCode = select.value;

  const linkPlugin = new GenerateLink({
    keyword: keyword,
    countryCode: countryCode,
    firstPartLink: `https://app.ticketmaster.com/discovery/v2/events.json?`,
  });


  const fetchService = new MakeFetch({
    link: linkPlugin.giveLink(),
    container: gallery,
    notification: Notiflix.Notify,
    input: input,
    selectContainer: select,
  })


  fetchService.makeFetch();
}



form.addEventListener('submit', searchEvents);
select.addEventListener('change', searchEvents);
