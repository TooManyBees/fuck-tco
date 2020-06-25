function classicListener(event) {
    var maybeLink = event.target.nodeName === "A"
        ? event.target
        : event.target.parentElement;
    if (maybeLink && maybeLink.classList.contains("twitter-timeline-link")) {
        maybeLink.setAttribute("href", maybeLink.dataset.expandedUrl);
    }
}

function mobileListener(event) {
    var maybeLink = event.target.nodeName === "A"
        ? event.target
        : event.target.parentElement;
    if (maybeLink && maybeLink.nodeName === "A") {

        // This branch catches website links in a Twitter profile card.
        // Unlike links in tweets, if it gets shortened with a "…" we
        // will not be able to recover the full URL at all. Furthermore,
        // the protocol is not present, so we would have to use "http"
        // and hope that the server upgrades to https on request.
        // For these reasons, we no longer care about profile card links.
        if (maybeLink.parentElement.getAttribute("data-testid") === "UserProfileHeader_Items") {
            return;
        }

        try {
            var text = maybeLink.textContent.trim();
            text = text.replace(/…$/, '');
            var url = new URL(text);
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
