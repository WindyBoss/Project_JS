const KEY = 'LocalStorageKey';

function saveLocalStorage (keyword, country) {
  const data = JSON.stringify({ keyword: keyword, country: country });
  localStorage.setItem(KEY, data);
}

function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem(KEY));
  return data;
}

export { saveLocalStorage, getLocalStorage };
