import { fetchEvents } from "..";

const input = document.querySelector('.input-keyword');
let keyword = "";

input.addEventListener("change", () => {
    keyword = input.value;
    
})

