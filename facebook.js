function removeTrackerUrl(event) {
    event.preventDefault();
    event.target.removeAttribute("data-lynx-uri");
    event.target.removeAttribute("data-lynx-mode");
}

function removeTrackingParam(event) {
    if (event.target.hasAttribute("href")) {
        var url = new URL(event.target.getAttribute("href"));
        url.searchParams.delete("fbclid")
        event.target.setAttribute("href", url.toString());
    }
}

var fbStream = document.getElementById("contentArea");
if (fbStream && location.hostname.match(/(^|\.)facebook\.com$/)) {
    var feed = fbStream.querySelector('[role="feed"]');
    feed.addEventListener("mousedown", removeTrackerUrl);
    feed.addEventListener("click", removeTrackingParam);
}
