function twitterListener(event) {
    var parent = event.target.parentElement;
    if (parent && parent.classList.contains("twitter-timeline-link")) {
        parent.setAttribute("href", parent.dataset.expandedUrl);
    }
}

var twitterStream = document.getElementById("stream-items-id");
if (twitterStream && location.hostname.match(/(^|\.)twitter\.com$/)) {
    twitterStream.addEventListener("click", twitterListener);
    twitterStream.addEventListener("auxclick", twitterListener);
}
