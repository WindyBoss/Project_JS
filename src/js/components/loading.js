
class Loader  {
  constructor(loader) {
    this.loader = loader;
  }

    displayLoading() {
    this.loader.classList.add("display");
      // to stop loading after some time
    setTimeout(() => {
        this.loader.classList.remove("display");
    }, 5000);
  }

  // hiding loading
  hideLoading() {
    this.loader.classList.remove("display");
  }
}

export { Loader };