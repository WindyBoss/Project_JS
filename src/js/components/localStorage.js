const KEY = 'LocalStorageKey';

function saveLocalStorage (keyword, country) {
  const data = JSON.stringify({ keyword: keyword, country: country });
  console.log(data);
  localStorage.setItem(KEY, data);
}


export { saveLocalStorage, getLocalStorage };


function getLocalStorage() {
  const data = JSON.parse(localStorage.getItem(KEY));
  return data;
}

