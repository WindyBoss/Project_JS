parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"olla":[function(require,module,exports) {
const e=document.getElementsByClassName("custom-select"),t=e.length;for(let n=0;n<t;n++){const t=e[n].getElementsByTagName("select")[0],i=t.length,l=document.createElement("DIV");l.setAttribute("class","select-selected"),l.setAttribute("value",""),l.innerHTML=t.options[t.selectedIndex].innerHTML,e[n].appendChild(l),hidenWrapper=document.createElement("DIV"),hidenWrapper.setAttribute("class","select-items select-hide");for(let e=1;e<i;e++)switchWrapper=document.createElement("DIV"),switchWrapper.innerHTML=t.options[e].innerHTML,switchWrapper.setAttribute("value",t.options[e].value),switchWrapper.addEventListener("click",function(e){const t=this.parentNode.parentNode.getElementsByTagName("select")[0],s=t.length,n=this.parentNode.previousSibling;let i;for(let l=0;l<s;l++)if(t.options[l].innerHTML==this.innerHTML){t.selectedIndex=l,n.innerHTML=this.innerHTML;const e=(i=this.parentNode.getElementsByClassName("same-as-selected")).length;for(let t=0;t<e;t++)i[t].classList.remove("same-as-selected");this.classList.add("same-as-selected");break}n.setAttribute("value",i[0].getAttribute("value")),n.click()}),hidenWrapper.appendChild(switchWrapper);e[n].appendChild(hidenWrapper),l.addEventListener("click",function(e){e.stopPropagation(),s(this),this.nextSibling.classList.toggle("select-hide"),this.classList.toggle("select-arrow-active")})}function s(e){const t=[],s=document.getElementsByClassName("select-items"),n=document.getElementsByClassName("select-selected"),i=s.length,l=n.length;for(let a=0;a<l;a++)e==n[a]?t.push(a):n[a].classList.remove("select-arrow-active");for(let a=0;a<i;a++)t.indexOf(a)&&s[a].classList.add("select-hide")}document.addEventListener("click",s);
},{}]},{},["olla"], null)
//# sourceMappingURL=/Project_JS/selectStyle.42373ab4.js.map