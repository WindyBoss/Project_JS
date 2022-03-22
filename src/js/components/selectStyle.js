const inputContainer = document.getElementsByClassName("custom-select");
const inputContainerLength = inputContainer.length;

for (let i = 0; i < inputContainerLength; i++) {
  const selElement = inputContainer[i].getElementsByTagName("select")[0];
  const selElementLength = selElement.length;
  const selectedWrap = document.createElement("DIV");
  selectedWrap.setAttribute("class", "select-selected");
  selectedWrap.setAttribute("value", '');
  selectedWrap.innerHTML = selElement.options[selElement.selectedIndex].innerHTML;
  inputContainer[i].appendChild(selectedWrap);

  hidenWrapper = document.createElement("DIV");
  hidenWrapper.setAttribute("class", "select-items select-hide");

  for (let j = 1; j < selElementLength; j++) {
    switchWrapper = document.createElement("DIV");
    switchWrapper.innerHTML = selElement.options[j].innerHTML;
    switchWrapper.setAttribute("value", selElement.options[j].value);
    switchWrapper.addEventListener("click", function (e) {
      const selectedEl = this.parentNode.parentNode.getElementsByTagName("select")[0];
      const selectedElLength = selectedEl.length;
      const newSelect = this.parentNode.previousSibling;
      let listWrapper;
      for (let i = 0; i < selectedElLength; i++) {
        if (selectedEl.options[i].innerHTML == this.innerHTML) {
          selectedEl.selectedIndex = i;
          newSelect.innerHTML = this.innerHTML;
          listWrapper = this.parentNode.getElementsByClassName("same-as-selected");
          const listWrapperLength = listWrapper.length;
          for (let k = 0; k < listWrapperLength; k++) {
            listWrapper[k].classList.remove("same-as-selected");
          };
          this.classList.add("same-as-selected");
          break;
        };
      };
      newSelect.setAttribute("value", listWrapper[0].getAttribute('value'));
      newSelect.click();
    });
    hidenWrapper.appendChild(switchWrapper);
  };

  inputContainer[i].appendChild(hidenWrapper);
  selectedWrap.addEventListener("click", function(e) {
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(el) {
  const hiddenList = [];
  const countryList = document.getElementsByClassName("select-items");
  const selectedCountry = document.getElementsByClassName("select-selected");
  const countryListLength = countryList.length;
  const selectedCountryLength = selectedCountry.length;

  for (let i = 0; i < selectedCountryLength; i++) {
    if (el == selectedCountry[i]) {
      hiddenList.push(i)
    } else {
      selectedCountry[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < countryListLength; i++) {
    if (hiddenList.indexOf(i)) {
      countryList[i].classList.add("select-hide");
    }
  }
}

document.addEventListener("click", closeAllSelect);