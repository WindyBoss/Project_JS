import { galleryRender } from './render-gallery';
import { refs } from './components/refs';
import { EventListener } from './components/addEventListener';

let keyword = '';
let countryCode = '';

async function searchEvents(event) {
  event.preventDefault();
  keyword = refs.input.value;
  countryCode = refs.select.value;

  galleryRender({
    country: countryCode,
    keyword: keyword,
    loadContainer: refs.loading
  });
}

const formListener = new EventListener({
    domElement: refs.form,
    listenType: 'submit',
    callbackFunction: searchEvents,
})

formListener.setEventListener();


const selectListener = new EventListener({
    domElement: refs.inputContainer,
    listenType: 'click',
    callbackFunction: searchEvents,
})

selectListener.setEventListener()
