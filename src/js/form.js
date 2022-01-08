import { KEY } from "..";

const input = document.querySelector('.input-keyword');
let code = KEY;
let keyword = '';

async function searchEvents(page, keyword) {
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&sort=date,asc&page=${page}&apikey=${code}`,
  )
    .then(data => {
      const response = data.json();
      return response;
    })
    .catch(error => {
      console.log(error);
    });

  return response;
}

input.addEventListener('change', () => {
    keyword = input.value;
    (searchEvents(0, keyword)).then(data => console.log(data))
});
