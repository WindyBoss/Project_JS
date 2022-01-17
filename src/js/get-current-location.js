// funkcja wyszukania kraju po IP
const request = new XMLHttpRequest();
const LOCATION_KEY = 'ee57a1628fb92f336e24699a2ff440322ef643c7edfbb26a7a465a2a';

request.open('GET', `https://api.ipdata.co/?api-key=${LOCATION_KEY}`);

request.setRequestHeader('Accept', 'application/json');

request.send();

export { request };