
import { refs } from './refs';

refs.lazyImages.forEach(image => {
    image.addEventListener('load', onImageLoaded, { once: true });
});

function onImageLoaded(e) {
    e.target.classList.add('appear');
};

function addLibraryScript() {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
    script.integrity = "sha512-q583ppKrCRc7N5O0n2nzUiJ+suUv7Et1JGels4bXOaMFQcamPk9HjdUknZuuFjBNs7tsMuadge5k9RzdmO+1GQ==";
    script.crossOrigin = "anonymous";

    document.body.appendChild(script);
};

function addSrcToLazyImages() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(image => {
        image.src = image.dataset.src;
  });
};


export { addLibraryScript, addSrcToLazyImages };