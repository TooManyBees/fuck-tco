# fuck t.co

I hate click-through trackers. This extension will circumvent click-through
trackers on Twitter and maybe Facebook.

I didn't test the Facebook script very robustly because I don't use Facebook.
I didn't test the extension at all on Chrome because I don't use Chrome.

# Twitter

Links on Twitter's web interface point to a shortened t.co URL, but their original
URLs are still in the DOM in the link's `title` attribute.

![An external link on Twitter with its destination URL visible in the hover title](/readme/twitter1.png)

And also in the `data-expanded-url` attribute.

![The DOM representation of the same Twitter link, with the destionation URL in the title and data-expanded-url attributes](/readme/twitter2.png)

This lets us replace the link's `href` attribute on click, before the browser navigates.

Unfortunately, when a URL has a Twitter Card representation, there is no destination
URL in the DOM at all, so we can't circumvent t.co here.

# Facebook

Facebook links to external pages all point to the page `https://l.facebook.com/l.php?`
with the desintation URL urlencoded in a query param. On `mouseover`, the link's
`href` attribute is replaced with the final URL, and the l.facebook.com/l.php
URL is placed in the `data-lynx-uri` attribute. Hovering over the link will
display the tracker URL in the status bar the first time, but afterwards it will
appear to link directly to the destination URL. On click, the `href` is swapped
out again for the one stored in `data-lynx-uri`.

We can attach a listener to `mousedown` which outright deletes the attributes
holding the tracker URL, and additionally we can remove any `fbclid` params
from the final URL.

N.B. I don't use Facebook enough to care about how well this works. 🤷‍♀️ Also,
teasing apart FB's event handlers is more work than I care to do, so there is
a probability very close to 1 that FB can still click track through beacons.
