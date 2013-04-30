chrome.extension.onMessage.addListener(function(request, sender, callback) {
  if (request.method == 'getEmail') {
    callback({'email': localStorage['highlightEmail']});
  } else {
    callback({});
  }
});
