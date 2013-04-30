var kHighlightMeClass = 'HighlightMe';

/**
 * Finds a list of <td class="DevName"> elements whose #text node matches the
 * parameter.
 * @param string Email to find
 * @return Array.<Element>
 */
function findCommitsByName(email) {
  var allCommits = document.getElementsByClassName('DevName');
  var myCommits = [];

  for (var i in allCommits) {
    var elm = allCommits[i];
    if (elm.innerText == email)
      myCommits.push(elm);
  }

  return myCommits;
}

/**
 * Returns a list of elements to highlight with a class name from the DevName
 * <td> element.
 * @param Element.<TD> The author's name element
 * @return Array.<Element> Elements to highlight
 */
function elementsToHighlightFromDevName(authorElm) {
  var highlightElms = [];

  // Buildbot structures commits on the Console pages as adjacent <tr> elements
  // separated by a TR[class=DevStatusSpacing]. The first row contains the
  // revision, author, and build status. The following rows are build status and
  // commit log.
  var parentTr = authorElm.parentNode;
  if (!parentTr || parentTr.tagName != 'TR')
    return highlightElms;

  highlightElms.push(parentTr);

  // Highlight until we hit a spacer.
  var sibling = parentTr.nextSibling;
  while (sibling.nodeName == '#text' ||
         !sibling.classList.contains('DevStatusSpacing')) {
    if (sibling.tagName == 'TR')
      highlightElms.push(sibling);
    sibling = sibling.nextSibling;
  }

  return highlightElms;
}

/**
 * Adds the highlight class to each in a list of elements.
 * @param Array.<Element>
 */
function highlightElements(elms) {
  for (var i in elms) {
    var elm = elms[i];
    elm.classList.add(kHighlightMeClass);
  }
}

/**
 * Content script entrypoint.
 */
function highlightMeMain() {
  chrome.extension.sendMessage({'method': 'getEmail'}, function(response) {
    if (!response['email'])
      return;

    // Find all commits by the author.
    var commits = findCommitsByName(response['email']);

    // Fetch the list of elements to highlight.
    var elms = [];
    for (var i in commits) {
      var commit = commits[i];
      elms = elms.concat(elementsToHighlightFromDevName(commit));
    }

    // Perform the actual highlight.
    highlightElements(elms);
  });
}

highlightMeMain();
