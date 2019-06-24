function twitterListener(event) {
    var parent = event.target.parentElement;
    if (parent && parent.classList.contains("twitter-timeline-link")) {
        parent.setAttribute("href", parent.dataset.expandedUrl);
    }
}

// This might work for the new Twitter UI (which is supposedly like the mobile site?)
function twitterListener2(event) {
    var parent = event.target.parentElement;
    if (parent && parent.nodeName === "a") {
        // If the title is URL-like, then it's the address we want to rewrite.
        try {
            var url = new URL(parent.getAttribute("title"));
            if (url) {
                parent.setAttribute("href", url.toString());
            }
        } catch (_) {}
    }
}

var twitterStream = document.getElementById("stream-items-id");
if (twitterStream && location.hostname.match(/(^|\.)twitter\.com$/)) {
    twitterStream.addEventListener("click", twitterListener);
    twitterStream.addEventListener("auxclick", twitterListener);
}
