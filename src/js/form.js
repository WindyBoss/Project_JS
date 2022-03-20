import { galleryRender } from './render-gallery';
import { refs } from './components/refs';
let keyword = '';
let countryCode = '';
import { EventListener } from './components/addEventListener';
const KEY = 'LocalStorageKey';

// funkcja call fetch z pomocą formy
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

formListener.setEventListener()

const selectListener = new EventListener({
    domElement: refs.select,
    listenType: 'change',
    callbackFunction: searchEvents,
})

selectListener.setEventListener()
