function classicListener(event) {
    var maybeLink = event.target.nodeName === "A"
        ? event.target
        : event.target.parentElement;
    if (maybeLink && maybeLink.classList.contains("twitter-timeline-link")) {
        maybeLink.setAttribute("href", maybeLink.dataset.expandedUrl);
    } else if (maybeLink.relList && maybeLink.relList.contains("me")) {
        // This branch catches website links in a Twitter profile card.
        maybeLink.setAttribute("href", `https://${maybeLink.textContent.trim()}`);
        return;
    }
}

function mobileListener(event) {
    var maybeLink = event.target.nodeName === "A"
        ? event.target
        : event.target.parentElement;
    if (maybeLink && maybeLink.nodeName === "A") {

        // This branch catches website links in a Twitter profile card.
        if (maybeLink.parentElement.getAttribute("data-testid") === "UserProfileHeader_Items") {
            maybeLink.setAttribute("href", `http://${maybeLink.textContent.trim()}`);
            return;
        }

        // If the title is URL-like, then it's the address we want to rewrite.
        try {
            var url = new URL(maybeLink.getAttribute("title"));
            if (url) {
                maybeLink.setAttribute("href", url.toString());
            }
        } catch (_) {}
    }
}

if (location.hostname.match(/(^|\.)twitter\.com$/)) {
    var listener = document.getElementById("react-root")
        ? mobileListener
        : classicListener;

    // Most of the links we care about are in
    // document.getElementById("stream-items-id") for classic twitter, and
    // document.querySelector('[data-testid="primaryColumn"]') for mobile twitter
    // But the mobile site loads the DOM after page load, and we could always
    // load the page viewing a Tweet which prevents the feed from loading until
    // the tweet is dismissed.
    document.body.addEventListener("click", listener);
    document.body.addEventListener("auxclick", listener);
}
