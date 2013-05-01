var kLocalStorageKey = 'highlightEmail';

function getEmailElm() {
  return document.getElementById('email');
}

function loadOptions() {
  if (localStorage[kLocalStorageKey])
    getEmailElm().value = localStorage[kLocalStorageKey];
}

function saveOptions(event) {
  localStorage[kLocalStorageKey] = getEmailElm().value;

  var okMsg = document.getElementById('saved');
  okMsg.style.display = 'block';
  setTimeout(function() { okMsg.style.display = 'none'; }, 3000);
}

function init() {
  document.querySelector('#save').addEventListener('click', saveOptions);
  loadOptions();
}

document.addEventListener('DOMContentLoaded', init);

