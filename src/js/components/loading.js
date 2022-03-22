
class Loader  {
  constructor(loader) {
    this.loader = loader;
  }
    displayLoading() {
      this.loader.classList.add("display");

    setTimeout(() => {
        this.loader.classList.remove("display");
    }, 5000);
  }

  hideLoading() {
    this.loader.classList.remove("display");
  }
}

export { Loader };